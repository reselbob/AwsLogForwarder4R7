const  zlib = require('zlib');
var Logger = require('r7insight_node');
/*****************************************************
This code expects that all the packages in node_modules, that are the result
of the installing r7insight_node, are present in this Lambda's file
system.

You will need to zip up the the project after running the install and
then upload the zip file to this Lambda. The details are in the ReadMe.

You'll need to set an environment variable, token, that describes your
access token that is associated with the InsightOps log to
which the AWS CloudWatch log will be forwarded. Also, you need
to set the environment variable, region, that describes of the
Rapid 7 Insight Ops log, usually us or en.
*****************************************************/
var logger = new Logger({ token: process.env.token , region: process.env.region})
exports.handler = (event, context, callback) => {
    //make sure the data expected from AWS CloudWatch is present
    if(event.awslogs && event.awslogs.data){
        //The log forwarding is going to pass the data in gzip compression,
        //thus, we need to unzip it.
        zlib.gunzip(Buffer.from(event.awslogs.data, 'base64'), function(err, uncompressedLogMessage) {
            if(err) {
                console.error(err);
                logger.err(JSON.stringify(err));
                callback(JSON.stringify(err));
            }
            else {
                const str = uncompressedLogMessage.toString('utf-8');
                //keep a local copy of the log entry in AWS
                console.log(str);
                //send the log entry onto InsightsOps
                logger.info(str);
                callback(null,str);
            }
        });
    } else
    {
        const err = new Error('Property,event.awslogs.data, is not present.');
        console.error(err);
        logger.err(JSON.stringify(err))
        callback(err);
    }
};
