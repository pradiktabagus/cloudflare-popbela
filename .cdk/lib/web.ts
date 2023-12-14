import { Construct } from 'constructs';
import * as path from "path";

import { 
  aws_iam as iam,
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
  aws_ec2 as ec2,
  aws_route53_targets as targets,
  aws_ssm as ssm,
  Duration,
  RemovalPolicy 
} from "aws-cdk-lib";

import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { AwsLogDriver, ContainerImage } from 'aws-cdk-lib/aws-ecs';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import * as route53 from 'aws-cdk-lib/aws-route53';

export interface WebProps {
  hostedZoneId: string;
  zoneName: string;
  zoneNameIDNDashboard: string;
  appName: string;
  webCpu: number;
  webMemory: number;
  webMinCapacity: number;
  webMaxCapacity: number;
  webDesiredCount: number;
  webHostname: string;
  webOrigin: string;
  sitemapBucket: string;
  appEnv: string;
  sentryDSN: string;
  removalPolicy: RemovalPolicy;
  COGNITO_WEB_CLIENT_ID: string;
  COGNITO_DASHBOARD_URI: string;
  COGNITO_EDIT_PROFILE_URI: string;
  OAUTH_DOMAIN: string;
  OAUTH_CALLBACK_LOGIN: string;
  OAUTH_CALLBACK_LOGOUT: string;
  universalAPI: string;
}

export class Web extends Construct {
  public readonly service: ecs_patterns.ApplicationLoadBalancedFargateService;
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: WebProps) {
    super(scope, id);

    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId: props.hostedZoneId,
      zoneName: props.zoneName,
    });

    const certificateArn = ssm.StringParameter.fromStringParameterName(this, 'CertificateArn', '/idn/popbela/certificateArn').stringValue;
    const certificate = acm.Certificate.fromCertificateArn(scope, "Cert", certificateArn);
    
    const vpcId = ssm.StringParameter.valueFromLookup(this, '/idn/popbela/vpcId');
    const vpc = ec2.Vpc.fromLookup(this, "Vpc", {vpcId})

    const ecsClusterName = ssm.StringParameter.fromStringParameterName(this, 'EcsClusterName', '/idn/popbela/ecsClusterName').stringValue;

    const ecsCluster = ecs.Cluster.fromClusterAttributes(this, 'EcsCluster', {
      vpc,
      clusterName: ecsClusterName,
      securityGroups: [],
    });

    const environment = {
      APP_ENV: props.appEnv,
      BASE_URL: `https://${props.webHostname}`,
      PORT: '3000',     
      API_BASE_URL: `https://api.${props.zoneName}`,
      API_UNIVERSAL: props.universalAPI,
      X_API_KEY: 'f4adcc48-51c8-4fef-9e57-01edfc0d58f9',
      GLANCE_API_USER_KEY: 'A94DFD3AA5AB1869741379FE92672',      
      KAIKAI_API_KEY: 'KiJZlDuUI2ys3ihAUZXaS6Imi90c70Cc',
      UNIVERSAL_KEY: 'ArR0jkbjezNWiIbe3D8d',
      CDN_URL: `cdn.popbela.com, image.fortuneidn.com, image.${props.zoneName}, cdn.${props.zoneNameIDNDashboard}`,
      NEXT_PUBLIC_FACEBOOK_CLIENT_ID: '365341847389795',
      NEXT_PUBLIC_DFP_NETWORK_ID: '253109699',
      NEXT_PUBLIC_DFP_NETWORK_ID_GLANCE: '22029514685',
      NEXT_PUBLIC_FACEBOOK_APP_ID: '147110658997423',
      CDN_FILES_URL: `https://cdn.${props.zoneName}/files`,
      SENTRY_DSN: props.sentryDSN,
      RAMADAN_MICROSITE_URL: `https://ramadan.${props.zoneName}`,
      // idnaccount
      COGNITO_USER_POOL_ID: 'ap-southeast-1_XXXXXXXXX',
      COGNITO_WEB_CLIENT_ID: props.COGNITO_WEB_CLIENT_ID,
      COGNITO_FLOW_TYPE: 'USER_PASSWORD_AUTH',
      COGNITO_DASHBOARD_URI: props.COGNITO_DASHBOARD_URI,
      COGNITO_EDIT_PROFILE_URI: props.COGNITO_EDIT_PROFILE_URI,
      OAUTH_DOMAIN: props.OAUTH_DOMAIN,
      OAUTH_CALLBACK_LOGIN: props.OAUTH_CALLBACK_LOGIN,
      OAUTH_CALLBACK_LOGOUT: props.OAUTH_CALLBACK_LOGOUT
    }

    const image = new DockerImageAsset(this, "Image", {
      directory: path.join(__dirname, "../.."),
      buildArgs: environment,
    });
    
    const containerName = 'www';

    this.service = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "WwwEcs", {
        cluster: ecsCluster,
        cpu: props.webCpu,
        memoryLimitMiB: props.webMemory,
        assignPublicIp: false,
        circuitBreaker: { rollback: true },
        desiredCount: props.webDesiredCount,
        enableExecuteCommand: true,
        publicLoadBalancer: true,
        domainName: props.webOrigin,
        domainZone: hostedZone,
        certificate,
        protocol: elbv2.ApplicationProtocol.HTTPS,
        sslPolicy: elbv2.SslPolicy.RECOMMENDED,
        redirectHTTP: true,
        taskImageOptions: {
          containerName,
          image: ContainerImage.fromDockerImageAsset(image),
          containerPort: 3000,
          environment,
          logDriver: new AwsLogDriver({
            streamPrefix: containerName,
            logGroup: new LogGroup(this, "LogGroup", {
              retention: RetentionDays.ONE_MONTH,
              removalPolicy: props.removalPolicy,
            }),
          }),
        },
      }
    );

    // Autoscaling Configuration    
    this.service.targetGroup.configureHealthCheck({
      port: '3000',
      path:'/ping',
      healthyHttpCodes: "200,404",
      interval: Duration.seconds(10),
      healthyThresholdCount: 3,
      unhealthyThresholdCount: 3, 
    });

    const scaling = this.service.service.autoScaleTaskCount({ 
      minCapacity: props.webMinCapacity,
      maxCapacity: props.webMaxCapacity,
    });

    const cpuMetric = this.service.service.metricCpuUtilization();
    scaling.scaleOnMetric('ScaleToCPU', {
      metric: cpuMetric,
      scalingSteps: [
        { upper: 10, change: -1 },
        { lower: 50, change: +1 },
        { lower: 70, change: +3 },
      ],
      adjustmentType: autoscaling.AdjustmentType.CHANGE_IN_CAPACITY,
    });

    // CloudFront
    const certificateUsEastArn = ssm.StringParameter.fromStringParameterName(this, 'certificateUsEastArn', '/idn/popbela/certificateUsEastArn').stringValue;
    const certificateUsEast = acm.Certificate.fromCertificateArn(this, "certificateUsEast", certificateUsEastArn);

    const cachePolicy = new cloudfront.CachePolicy(this, 'wwwCachePolicy', {
      defaultTtl: Duration.hours(1),
      minTtl: Duration.minutes(10),
      maxTtl: Duration.days(1),
      cookieBehavior: cloudfront.CacheCookieBehavior.none(),
      headerBehavior: cloudfront.CacheHeaderBehavior.allowList(
        'Host',
        'CloudFront-Is-IOS-Viewer',
        'CloudFront-Is-Tablet-Viewer',
        'CloudFront-Is-Mobile-Viewer',
        'CloudFront-Is-Android-Viewer',
        'CloudFront-Is-Desktop-Viewer'
      ),
      queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
      enableAcceptEncodingGzip: true,
      enableAcceptEncodingBrotli: true,
    });

    const fileAssetBucket = new s3.Bucket(this, 'fileAssetBucket', {
      bucketName: props.sitemapBucket,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: props.removalPolicy,
      accessControl: s3.BucketAccessControl.PRIVATE,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
      this, 'CloudFrontOriginAccessIdentity');
  
      fileAssetBucket.addToResourcePolicy(new iam.PolicyStatement({
          actions: ['s3:GetObject'],
          resources: [fileAssetBucket.arnForObjects('*')],
          principals: [new iam.CanonicalUserPrincipal(
              cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
      }));

    // const bucketCron = s3.Bucket.fromBucketName(
    //   this,
    //   'sitemap-bucket',
    //   props.sitemapBucket,
    // );

    const webOrigin = new origins.HttpOrigin(props.webOrigin);
    // const sitemapOrigin = new origins.S3Origin(bucketCron ,{originPath: "/sitemap" });

    this.distribution = new cloudfront.Distribution(this, 'CloudFrontDistribution', {
      defaultBehavior: {
        origin: webOrigin,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy,
        originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER,
        responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.CORS_ALLOW_ALL_ORIGINS_WITH_PREFLIGHT_AND_SECURITY_HEADERS,        
      },
      additionalBehaviors: {
        "/sitemap*xml":{
          origin: new origins.S3Origin(fileAssetBucket, {
            originAccessIdentity: cloudfrontOAI
          }),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        },
        "/*/sitemap*xml":{
          origin: new origins.S3Origin(fileAssetBucket, {
            originAccessIdentity: cloudfrontOAI
          }),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        },
        "/ads.txt":{
          origin: new origins.S3Origin(fileAssetBucket, {
            originAccessIdentity: cloudfrontOAI
          }),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        },
        "/api/pub" : {
          origin:webOrigin,
          allowedMethods:cloudfront.AllowedMethods.ALLOW_ALL,
          cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER
        },
        "/api/pub-amp" : {
          origin:webOrigin,
          allowedMethods:cloudfront.AllowedMethods.ALLOW_ALL,
          cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER
        },

    
    },
      domainNames: [props.webHostname],
      certificate: certificateUsEast,
    },
    );

    new route53.ARecord(this, 'AliasRecord', {
      recordName: props.webHostname,
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(this.distribution)),
    });
  }
}
