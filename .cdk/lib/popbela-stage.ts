import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { HttpRedirectStack, HttpRedirectStackProps } from "./http-redirect-stack";
import { WebStack, WebStackProps } from "./web-stack";
import { CloudfrontStack, CloudfrontStackProps } from "./cloudfront-stack";


export interface PopbelaStageProps extends StageProps, WebStackProps, HttpRedirectStackProps, CloudfrontStackProps  {}

export class PopbelaStage extends Stage {
  constructor(scope: Construct, id: string, props: PopbelaStageProps) {
    super(scope, id, props);

    new WebStack(this, 'WwwStack', props);
  //  new HttpRedirectStack(this, 'HttpRedirectStack', props);
    new CloudfrontStack(this, 'CloudfrontRedirection', props);
  }
}
