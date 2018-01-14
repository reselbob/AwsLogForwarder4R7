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

<img src="https://s3.amazonaws.com/awslogforwarder-4r7/create-lambda-01.png" />

2. Zip up the `AWSLogForwarder4R7` project code you installed locally using `npm install`.

<img src="https://s3.amazonaws.com/awslogforwarder-4r7/zip-up-source-code-01.png" />


Make sure the file and directory structure of the zip file looks like the following:

```$xslt
index.js
 -- node_modules
```

WHERE `node_modules` is the directory containing the dependency modules. **Do not** zip up the project directory. AWS Lambda wants to see `index.js` and `node_modules` in the root position..

3. Upload the Zip file to the AWS Lambda function

<img src="https://s3.amazonaws.com/awslogforwarder-4r7/upload-zip-file-01.png" />

   Upon upload, the file and directory structure will be apparent in the AWS Lambda code pane, as shown below.
<img src="https://s3.amazonaws.com/awslogforwarder-4r7/uploaded-zip-file-set-event-01.png" />
   *Please be advised that you might need to refresh the AWS Lambda web page to get the file system to display in its entirety.*


4. Set the environment variables, `token` and `region`

<img src="https://s3.amazonaws.com/awslogforwarder-4r7/set-env-vars-01.png" />

5. Create a Test event (optional)
```$json
{
  "awslogs": {
    "data": "gz Compressed Data Here"
  }
}
```

<img src="https://s3.amazonaws.com/awslogforwarder-4r7/set-test-event-01.png" />  
6. Run the Test (optional)
<img src="https://s3.amazonaws.com/awslogforwarder-4r7/test-lambda-01.png" />
<table>
<tr>
<td>
Please be advised that when I ran the test from within AWS Lambda, I did get a timeout error. But, the logentry was sent onto InsightOps. I have not had any issues in general issues running outside of a test scenario. Still, I am researching the cause fot the timeout.
</td>
</tr>
</table>

<img src="https://s3.amazonaws.com/awslogforwarder-4r7/test-data-in-r7-01.png" />

# Configuring a CloudWatch logstream for forwarding
1. Select the logstream you want to forward and then select in the Actions button dropdown, select, `Stream to AWS Lambda`

<img src="https://s3.amazonaws.com/awslogforwarder-4r7/stream-to-lambda-01.png" />

   The Stream to AWS Lambda process pages will commence
   
   
2. Select the AWS Lambda,`AwsLogForwarder4R7`

<img src="https://s3.amazonaws.com/awslogforwarder-4r7/select-lambda-01.png" />

4. Select the Log Format from the dropdown, then click, `Next`

<img src="https://s3.amazonaws.com/awslogforwarder-4r7/select-log-format.png" />

5. If all is as you like, click the button, `Start Streaming`

<img src="https://s3.amazonaws.com/awslogforwarder-4r7/start-log-streaming.png" />

# Use

To test, do something in AWS that will write to the logstream you declared to be forwarded to InsightOps. The log entry should appear in InsightOps log associated witht he token you provided in the environment variable, `token`.

In the demonstration, we'll use a AWS Lambda that emits trivial data to the logstream in which we are streaming data onto the AWS Lambda that implements `AwsLogForwarder4R7`.

1. Go the AWS Lambda the emits data to the logstream configured to stream data to `AwsLogForwarder4R7`.

2. Run a test within the AWS Lambda

<img src="https://s3.amazonaws.com/awslogforwarder-4r7/sample-log-test-02.png" />


3. Check the results in InsightOps.

<img src="https://s3.amazonaws.com/awslogforwarder-4r7/sample-log-test-result-01.png" />