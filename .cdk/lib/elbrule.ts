import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";

export interface RedirectProps {
  fromHost: string;
  toHost: string;
  toPath: string;
}

export interface ElbRuleProps {
  listener: elbv2.IApplicationListener;
  hostedZone: route53.IHostedZone;
  distribution: cloudfront.IDistribution;
}

export class ElbRule extends Construct {
  private listener: elbv2.IApplicationListener;
  private hostedZone: route53.IHostedZone;
  private distribution: cloudfront.IDistribution;
  private priority: number;

  constructor(scope: Construct, id: string, props: ElbRuleProps) {
    super(scope, id);
    this.listener = props.listener;
    this.hostedZone = props.hostedZone;
    this.distribution = props.distribution;
    this.priority = 0;
  }

  public addRedirect(props: RedirectProps) {  
    this.priority++;

    new elbv2.ApplicationListenerRule(this, `Rule${this.priority}`, {
      listener: this.listener,
      priority: this.priority,
      action: elbv2.ListenerAction.redirect({
        host: props.toHost,
        path: props.toPath,
        permanent: true,
        port: '443',
        protocol: "HTTPS",
        query: '#{query}',
      }),
      conditions: [
        elbv2.ListenerCondition.hostHeaders([props.fromHost]),
      ],
    });

    new route53.ARecord(this, `${props.fromHost}-ARecord`, {
      recordName: props.fromHost,
      zone: this.hostedZone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(this.distribution)),
    });
  }
}
