import { Construct } from 'constructs';
import { 
  aws_iam as iam,
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
  aws_route53_targets as targets,
  aws_route53 as route53,
  aws_certificatemanager as acm,
  aws_ssm as ssm,
  aws_elasticloadbalancingv2 as alb,
} from "aws-cdk-lib";

export interface CloudfrontRedirectionProps {
  hostedZoneId: string;
  zoneName: string;
  webOrigin: string;
  accountName: string;
 // cacheDefaultId: string;
  albArn: string;
  redirectionAltDomain: string[];
}

export class CloudfrontRedirection extends Construct {
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: CloudfrontRedirectionProps) {
    super(scope, id);

    // Route 53
    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId: props.hostedZoneId,
      zoneName: props.zoneName,
    });

    // Certificate
    const certificateUsEastArn = ssm.StringParameter.fromStringParameterName(this, 'certificateUsEastArn', '/idn/popbela/certificateUsEastArn').stringValue;
    const certificateUsEast = acm.Certificate.fromCertificateArn(this, "certificateUsEast", certificateUsEastArn);

    // cf Functions
    const fileCodeOptions: cloudfront.FileCodeOptions = {
      filePath: './lib/utils/redirection/index.js',
    };

    const cfFunction = new cloudfront.Function(this, 'Function', {
      code: cloudfront.FunctionCode.fromFile(fileCodeOptions)
    });

    //const webOrigin = new origins.HttpOrigin(props.webOrigin);
    const albFrontend = alb.ApplicationLoadBalancer.fromLookup(this, 'AlbFrontend', {
       loadBalancerArn: props.albArn,
    //   // securityGroupId: props.albSgId
    });
    const webOrigin = new origins.LoadBalancerV2Origin(albFrontend);

    this.distribution = new cloudfront.Distribution(this, 'CloudFrontDistribution', {
      comment: "For Redirection Popbela",
      defaultBehavior: {
        functionAssociations: [{
          function: cfFunction,
          eventType: cloudfront.FunctionEventType.VIEWER_REQUEST
        }],
        origin: webOrigin,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        //cachePolicy: cloudfront.CachePolicy.fromCachePolicyId(this, 'MinTTL600sHeadersAllQueryStringsAll', props.cacheDefaultId ),
        originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER,
        responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.CORS_ALLOW_ALL_ORIGINS_WITH_PREFLIGHT        
      },
      domainNames: props.redirectionAltDomain,
      certificate: certificateUsEast, 
    },
    );

    props.redirectionAltDomain.forEach(redirect => {
      new route53.ARecord(this, `AliasRecord-${redirect}`, {
        recordName: redirect,
        zone: hostedZone,
        target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(this.distribution)),
        deleteExisting: true
      });
    });

  }
}