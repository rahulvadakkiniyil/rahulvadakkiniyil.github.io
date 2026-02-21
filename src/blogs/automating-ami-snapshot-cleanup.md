---
title: "Automating AMI and Snapshot Cleanup with AWS Lambda"
date: "2024-08-27"
tags: [AWS, Lambda, Automation, Cost Optimization]
excerpt: "A step-by-step guide to automating the cleanup of unused AMIs and snapshots using AWS Lambda to reduce costs."
---

# Automating AMI and Snapshot Cleanup with AWS Lambda

Over time, AWS accounts accumulate unused AMIs and their associated EBS snapshots. This leads to unnecessary storage costs. Let's automate the cleanup process using AWS Lambda.

## The Problem

Every time you create an AMI, AWS also creates EBS snapshots. When AMIs are deregistered or no longer needed, the snapshots often remain, incurring ongoing storage charges.

## Solution Architecture

We'll create a Lambda function that:

1. Identifies AMIs older than a specified threshold
2. Checks if they're in use by any running instances
3. Deregisters unused AMIs
4. Deletes associated snapshots

## Lambda Function

```python
import boto3
from datetime import datetime, timedelta

def lambda_handler(event, context):
    ec2 = boto3.client('ec2')
    
    # Get all AMIs owned by this account
    images = ec2.describe_images(Owners=['self'])['Images']
    
    # Get running instance AMI IDs
    reservations = ec2.describe_instances(
        Filters=[{'Name': 'instance-state-name', 'Values': ['running']}]
    )['Reservations']
    
    used_amis = set()
    for r in reservations:
        for i in r['Instances']:
            used_amis.add(i['ImageId'])
    
    # Find AMIs older than 30 days and not in use
    threshold = datetime.now() - timedelta(days=30)
    
    for image in images:
        created = datetime.strptime(image['CreationDate'][:19], '%Y-%m-%dT%H:%M:%S')
        if created < threshold and image['ImageId'] not in used_amis:
            print(f"Deregistering {image['ImageId']}")
            ec2.deregister_image(ImageId=image['ImageId'])
            
            # Delete associated snapshots
            for bdm in image.get('BlockDeviceMappings', []):
                if 'Ebs' in bdm:
                    snap_id = bdm['Ebs']['SnapshotId']
                    print(f"Deleting snapshot {snap_id}")
                    ec2.delete_snapshot(SnapshotId=snap_id)
    
    return {'statusCode': 200, 'body': 'Cleanup completed'}
```

## Setting Up CloudWatch Events

Schedule the Lambda to run weekly using CloudWatch Events (EventBridge):

```bash
aws events put-rule --name "WeeklyAMICleanup" --schedule-expression "rate(7 days)"
```

## Cost Savings

By regularly cleaning up unused AMIs and snapshots, you can significantly reduce your monthly AWS storage costs.
