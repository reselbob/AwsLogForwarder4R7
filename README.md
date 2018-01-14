# AwsLogForwarder4R7
A package for enabling log forwarding from AWS CloudWatch to Rapid7 InsightOps.

The `AWSLogForwarder4R7` project is code that you use to create an AWS Lambda function. Once the AWS Lambda is created, you will configure an AWS CloudWatch logstream of interest to stream (forward) data being written on to the logstream on the Lambda. The Lambda, in turn, will send the log entry onto InsightOps.

The assumption in force is that those using the code have an account on Rapid 7 with access to InsightOps.

# Installation

These installation instructions assume you know the basics of installing node packages and the overall structure of a node project. You can brush up on the details here: https://docs.npmjs.com/getting-started/installing-node

## Preparing the project for upload to AWS Lambda

Download this repository to your local machine
Run:

`npm install --only=production`

## Uploading the code to AWS Lambda

This project uses the Node package, `r7insight_node` found at: https://www.npmjs.com/package/r7insight_node .
`r7insight_node` is a package that allows logging directly to Rapid7's InsightOps. The code for `AWSLogForwarder4R7` passes log data onto Rapid7 InsightOps using the `r7insight_node` package.

Thus, in order to get `AWSLogForwarder4R7` to work in AWS Lambda, all the packages upon which `r7insight_node` depends must be uploaded to the AWS Lambda as a zip file. This process is typical. The details of the AWS Lambda package and upload process for Node are described here: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-create-deployment-pkg.html .

The following steps describe details for packaging and uploading `AWSLogForwarder4R7`.
1. Create the Lambda function named, `AwsLogForwarder4R7`

2. Zip up the `AWSLogForwarder4R7` project code you installed locally using `npm install`. Make sure the file and directory structure of the zip file looks like the following:

```$xslt
index.js
 -- node_modules
```

WHERE `node_modules` is the directory containing the dependency modules. **Do not** zip up the project directory. AWS Lambda wants to see `index.js` and `node_modules` in the root position..

3. Upload the Zip file to the AWS Lambda function

4. Set the enviornment variables, `token` and `region`

5. Create a Test event (optional)
```$json
{
  "awslogs": {
    "data": "gz Compressed Data Here"
  }
}
```
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
