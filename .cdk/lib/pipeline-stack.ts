import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { PopbelaStage, PopbelaStageProps } from "./popbela-stage";
import { CloudfrontStackProps } from './cloudfront-stack'
export interface PipelineStackProps extends StackProps, PipelineProps {}

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);
    new Pipeline(this, "Pipeline", props);
  }
}

export interface PipelineProps extends PopbelaStageProps, CloudfrontStackProps {
  stage: string;
  accountName: string;
}

class Pipeline extends Construct {
  constructor(scope: Construct, id: string, props: PipelineProps){
    super(scope, id);
    new PopbelaStage(this, `popbela-${props.stage}`, props);
  }
}
