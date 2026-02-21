---
title: "AWS: S3 Static Website Hosting"
date: "2024-08-26"
tags: [AWS, S3, DevOps, CI/CD]
excerpt: "Learn how to host a static website on AWS S3 using CodeCommit, CodePipeline, and Lambda for automated deployments."
---

# AWS: S3 Static Website Hosting Using CodeCommit, CodePipeline & Lambda

Hosting a static website on AWS S3 is one of the most cost-effective and scalable ways to serve web content. In this guide, we'll walk through setting up an automated pipeline that deploys your static site whenever you push changes.

## Architecture Overview

The architecture uses the following AWS services:

- **S3** - Hosts the static website files
- **CodeCommit** - Git repository for source code
- **CodePipeline** - Orchestrates the CI/CD workflow
- **Lambda** - Custom deployment logic

## Step 1: Create an S3 Bucket

First, create an S3 bucket with static website hosting enabled:

```bash
aws s3 mb s3://your-website-bucket
aws s3 website s3://your-website-bucket --index-document index.html --error-document error.html
```

## Step 2: Configure Bucket Policy

Add a bucket policy to allow public read access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-website-bucket/*"
    }
  ]
}
```

## Step 3: Set Up CodeCommit Repository

Create a CodeCommit repository and push your static website files.

## Step 4: Create the Pipeline

Set up CodePipeline to automatically detect changes in your CodeCommit repository and deploy to S3.

## Step 5: Add Lambda for Custom Logic

Use a Lambda function for any custom deployment logic, such as cache invalidation or notifications.

## Conclusion

With this setup, every push to your repository automatically deploys your updated website to S3. This serverless approach is both cost-effective and highly available.
