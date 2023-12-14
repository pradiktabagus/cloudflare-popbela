# Set base image
# FROM node:14.19.0-buster-slim
# FROM node:18-buster-slim
FROM public.ecr.aws/docker/library/node:18-alpine

ARG APP_ENV
ARG BASE_URL
ARG API_BASE_URL
ARG PORT
ARG X_API_KEY
ARG GLANCE_API_USER_KEY
ARG KAIKAI_API_KEY
ARG API_UNIVERSAL
ARG UNIVERSAL_KEY
ARG CDN_URL
ARG NEXT_PUBLIC_FACEBOOK_CLIENT_ID
ARG NEXT_PUBLIC_DFP_NETWORK_ID
ARG NEXT_PUBLIC_DFP_NETWORK_ID_GLANCE
ARG NEXT_PUBLIC_FACEBOOK_APP_ID
ARG CDN_FILES_URL
ARG SENTRY_DSN
ARG RAMADAN_MICROSITE_URL
ARG COGNITO_USER_POOL_ID
ARG COGNITO_WEB_CLIENT_ID
ARG COGNITO_FLOW_TYPE
ARG COGNITO_DASHBOARD_URI
ARG COGNITO_EDIT_PROFILE_URI
ARG OAUTH_DOMAIN
ARG OAUTH_CALLBACK_LOGIN
ARG OAUTH_CALLBACK_LOGOUT

ENV PORT 3000

# Create app directory
RUN mkdir -p /app/

WORKDIR /app/

# Copying source files
# ADD . /app/
COPY . /app/

# Update Dependencies
# RUN apt-get update && apt-get -y dist-upgrade
# RUN apt-get update && apt-get install -y curl git && apt-get -y autoremove
# && apt-get clean && rm -rf /var/lib/apt/lists/* \

# Install CURL
# RUN apt-get install -y curl git && \
#    apt-get -y autoremove

RUN npm install && npm run build \
&& cp public/robots-${APP_ENV}.txt public/robots.txt

# Building app
# RUN npm run build

EXPOSE 3000

# Running the app
CMD ["npm", "run", "start"]
