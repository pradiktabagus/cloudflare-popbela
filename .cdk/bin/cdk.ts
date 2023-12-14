#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy, Tags } from 'aws-cdk-lib';
import 'source-map-support/register';
import { PipelineProps, PipelineStack } from '../lib/pipeline-stack';
import { WebStack } from '../lib/web-stack';
import { HttpRedirectStack } from '../lib/http-redirect-stack';

const betaZoneName = 'sotogubeng.com';
const betaIDNDashboardZoneName = 'sateklopo.com'
const betaUniversalAPI = 'nasicuhima.com'
const betaWebHostname = `www.${betaZoneName}`;
const betaStageProps: PipelineProps = {
  appName: "sotogubeng.com",
  appEnv: "staging",
  stage: "beta",
  hostedZoneId: "Z0038615LKFBRBB1OMPT",
  zoneName: betaZoneName,
  zoneNameIDNDashboard: betaIDNDashboardZoneName,
  accountName: "sotogubeng",
  webCpu: 1024,
  webMemory: 2048,
  webMinCapacity: 1,
  webMaxCapacity: 1,
  webDesiredCount: 1,
  webHostname: betaWebHostname,
  webOrigin: `zeus-${betaWebHostname}`,
  sitemapBucket: `file-assets-www-sotogubeng-com`,
  deletionProtection: false,
  terminationProtection: false,
  http2: false,
  sentryDSN: 'https://aafa634a46f4466cb0c74566a9e9bb09@o1319599.ingest.sentry.io/4504168146010112',
  redirects: [
    { fromHost: `fashion.${betaZoneName}`, toHost: betaWebHostname, toPath: '/fashion/#{path}' },
    { fromHost: `beauty.${betaZoneName}`, toHost: betaWebHostname, toPath: '/beauty/#{path}' },
    { fromHost: `career.${betaZoneName}`, toHost: betaWebHostname, toPath: '/career/#{path}' },
    { fromHost: `lifestyle.${betaZoneName}`, toHost: betaWebHostname, toPath: '/lifestyle/#{path}' },
    { fromHost: `relationship.${betaZoneName}`, toHost: betaWebHostname, toPath: '/relationship/#{path}' },
    { fromHost: `${betaZoneName}`, toHost: betaWebHostname, toPath: '/#{path}' },
  ],
  env: {
    account: "487053431871",
    region: "ap-southeast-1",
  },
  removalPolicy: RemovalPolicy.DESTROY,
  COGNITO_WEB_CLIENT_ID: '4s768u5vn8vb6k3fq57cohinep',
  COGNITO_DASHBOARD_URI: `https://dashboard.${betaIDNDashboardZoneName}`,
  COGNITO_EDIT_PROFILE_URI: `https://dashboard.${betaIDNDashboardZoneName}/my-profile/edit`,
  OAUTH_DOMAIN: `account.${betaIDNDashboardZoneName}`,
  OAUTH_CALLBACK_LOGIN: `https://www.${betaZoneName}/callback/login`,
  OAUTH_CALLBACK_LOGOUT: `https://www.${betaZoneName}/callback/logout`,
  redirectionAltDomain:[`fashion.${betaZoneName}`, `beauty.${betaZoneName}`, `career.${betaZoneName}`, `lifestyle.${betaZoneName}`, `relationship.${betaZoneName}`, betaZoneName ],
  albArn: "arn:aws:elasticloadbalancing:ap-southeast-1:487053431871:loadbalancer/app/popbe-WwwWw-1VCCM6QK139O2/0fe1d1c7036237d5",
  universalAPI: `https://publisher.${betaUniversalAPI}`
}

const prodZoneName = 'popbela.com';
const prodIDNDashboardZoneName = 'idn.media'
const prodUniversalAPI = 'idncontent.com'
const prodWebHostname = `www.${prodZoneName}`;
const prodStageProps: PipelineProps = {
  appName: prodZoneName,
  appEnv: "production",
  stage: "production",
  hostedZoneId: "Z04512592XKZQNHPIKVRT",
  zoneName: prodZoneName,
  zoneNameIDNDashboard: prodIDNDashboardZoneName,
  accountName: "popbela",
  webCpu: 1024,
  webMemory: 2048,
  webMinCapacity: 1,
  webMaxCapacity: 5,
  webDesiredCount: 3,
  webHostname: prodWebHostname,
  webOrigin: `zeus-${prodWebHostname}`,
  sitemapBucket: `file-assets-www-popbela-com`,
  deletionProtection: false,
  terminationProtection: false,
  http2: false,   
  sentryDSN: 'https://aafa634a46f4466cb0c74566a9e9bb09@o1319599.ingest.sentry.io/4504168146010112',
  redirects: [
    { fromHost: `fashion.${prodZoneName}`, toHost: prodWebHostname, toPath: '/fashion/#{path}' },
    { fromHost: `beauty.${prodZoneName}`, toHost: prodWebHostname, toPath: '/beauty/#{path}' },
    { fromHost: `career.${prodZoneName}`, toHost: prodWebHostname, toPath: '/career/#{path}' },
    { fromHost: `lifestyle.${prodZoneName}`, toHost: prodWebHostname, toPath: '/lifestyle/#{path}' },
    { fromHost: `relationship.${prodZoneName}`, toHost: prodWebHostname, toPath: '/relationship/#{path}' },
    { fromHost: `${prodZoneName}`, toHost: prodWebHostname, toPath: '/#{path}' },
  ],
  env: {
    account: "240542634635",
    region: "ap-southeast-1",
  },
  removalPolicy: RemovalPolicy.RETAIN,
  COGNITO_WEB_CLIENT_ID: '6ojqooi1fog0buurvgi4iqhphj',
  COGNITO_DASHBOARD_URI: `https://dashboard.${prodIDNDashboardZoneName}`,
  COGNITO_EDIT_PROFILE_URI: `https://dashboard.${prodIDNDashboardZoneName}/my-profile/edit`,
  OAUTH_DOMAIN: `account.${prodIDNDashboardZoneName}`,
  OAUTH_CALLBACK_LOGIN: `https://www.${prodZoneName}/callback/login`,
  OAUTH_CALLBACK_LOGOUT: `https://www.${prodZoneName}/callback/logout`,
  redirectionAltDomain:[`fashion.${prodZoneName}`, `beauty.${prodZoneName}`, `career.${prodZoneName}`, `lifestyle.${prodZoneName}`, `relationship.${prodZoneName}`, prodZoneName ],
  albArn: "arn:aws:elasticloadbalancing:ap-southeast-1:240542634635:loadbalancer/app/popbe-WwwWw-VILXVMQ2INWX/96769a411304c119",
  universalAPI: `https://publisher.${prodUniversalAPI}`
}

const app = new cdk.App({
  context: {
    ghRef: process.env.GITHUB_REF, // github branch name
  },
});

const ghRef = app.node.tryGetContext("ghRef");

 if (ghRef === 'refs/heads/master') {
   new PipelineStack(app, `${betaStageProps.accountName}-Www`, betaStageProps);
 }

// TODO ganti test menjadi releases
if (ghRef.includes('refs/tags/release')) {
  new PipelineStack(app, `${prodStageProps.accountName}-Www`, prodStageProps);
}