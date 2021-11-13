# Mailejoe Infrastructure

Provides the cloudformation templates for setting up Mailejoe from scratch including
creating a new VPC for it to run in.

## Features

- Alerts pushed to Discord with a fallback email option
- New 3AZ VPC setup for the ECS cluster to run in
- Best practice security setup including flowlogs, logging, cloudwatch alerts, and more.

## Architecture

#### Alarms

![Alarms Architecture](assets/images/alarms.png)

## Deployment

Deployment is scripted via CircleCI to build/upload code as well as validate and execute the
required cloudformation scripts.

### Environment Variables

MAILEJOE_SUPPORT_EMAIL - Email the an alert in the case that alarms going to Discord begin
to fail.
AWS_ACCESS_KEY_ID - AWS access key id for deployment role
AWS_SECRET_ACCESS_KEY - AWS access secret for deployment role
