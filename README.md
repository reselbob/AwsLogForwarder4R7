# AwsLogForwarder4R7
A package for enabling log forwarding from AWS CloudWatch to Rapid7 InsightOps

# Installation

These installation instructions assume you know the basics of installing node packages and the overall structure of a node project. You can brush up on the details here: https://docs.npmjs.com/getting-started/installing-node

## Preparing the project for upload to AWS Lambda

Download this repository to your local machine
Run:

`npm install --only=production`

## Uploading the code to AWS Lamba

1. Create the Lambda function named, `AwsLogForwarder4R7`

2. Zip up the project code

3. Upload the Zip file to the AWS Lambda function

4. Set the enviornment variables, `token` and `region`

5. Create a Test event (optional)

6. Run the Test (optional)

# Configuring a CloudWatch logstream for forwarding
1. Select the logstream you want to forward

2. In the Actions button dropdown, select, `Stream to AWS Lambda`

   The Stream to AWS Lambda process pages will commence
   
3. Select the AWS Lambda,`AwsLogForwarder4R7`

4. Select the Log format from the dropdown, then click, `Next`

5. If all is as you like, click the button, `Start Streaming`


# Use

To test, do something in AWS that will write to the logstream you declared to be forwarded to InsightOps. The log entry should appear in InsightOps log associated witht he token you provided in the environment variable, `token`.