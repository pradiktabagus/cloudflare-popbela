import { aws_cloudfront as cloudfront, aws_cloudfront_origins as origins, aws_ec2 as ec2, aws_ssm as ssm, Duration } from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { CacheHeaderBehavior } from "aws-cdk-lib/aws-cloudfront";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from "constructs";
import { ElbRule, RedirectProps } from "./elbrule";

export interface HttpRedirectProps {
  hostedZoneId: string;
  zoneName: string;
  deletionProtection: boolean;
  http2: boolean;
  redirects: RedirectProps[];
  appName: string;
  webHostname: string;
}

export class HttpRedirect extends Construct {
  public readonly alb: elbv2.ApplicationLoadBalancer;

  constructor(scope: Construct, id: string, props: HttpRedirectProps) {
    super(scope, id);

    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId: props.hostedZoneId,
      zoneName: props.zoneName,
    });

    const certificateUsEastArn = ssm.StringParameter.fromStringParameterName(this, 'certificateUsEastArn', '/idn/popbela/certificateUsEastArn').stringValue;
    const certificateUsEast = acm.Certificate.fromCertificateArn(this, "certificateUsEast", certificateUsEastArn);

    const vpcId = ssm.StringParameter.valueFromLookup(this, '/idn/popbela/vpcId');
    const vpc = ec2.Vpc.fromLookup(this, "Vpc", {vpcId})

    this.alb = new elbv2.ApplicationLoadBalancer(this, 'Alb', { 
      deletionProtection: props.deletionProtection,
      internetFacing: true,
      http2Enabled: props.http2,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC
      },
      vpc
    });

    const certificateArn = ssm.StringParameter.fromStringParameterName(this, 'CertificateArn', '/idn/popbela/certificateArn').stringValue;

    const listener = this.alb.addListener('Listener', { 
      port: 443,
      protocol: elbv2.ApplicationProtocol.HTTPS,
      certificates: [ elbv2.ListenerCertificate.fromArn(certificateArn)],
      defaultAction: elbv2.ListenerAction.fixedResponse(200, {
        contentType: 'text/plain',
        messageBody: 'ok',
      }),
    });

    const cachePolicy = new cloudfront.CachePolicy(this, 'redirectCachePolicy', {
      defaultTtl: Duration.days(2),
      minTtl: Duration.minutes(15),
      maxTtl: Duration.days(10),
      cookieBehavior: cloudfront.CacheCookieBehavior.none(),
      headerBehavior: cloudfront.CacheHeaderBehavior.allowList('Host'),
      queryStringBehavior: cloudfront.CacheQueryStringBehavior.none(),
      enableAcceptEncodingGzip: true,
      enableAcceptEncodingBrotli: true,
    });

    const origin = new origins.LoadBalancerV2Origin(this.alb, {});
    const distribution = new cloudfront.Distribution(this, 'Dist', {
      domainNames: props.redirects.map<string>(redirect => redirect.fromHost),
      certificate: certificateUsEast,
      defaultBehavior: {
        origin: origin,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy,
        originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER,
      },
    });

    const elbRule = new ElbRule(this, 'Rule', {
      listener,
      hostedZone,
      distribution,
    });

    props.redirects.forEach(redirect => {
      elbRule.addRedirect(redirect);
    });
    
  }
}
