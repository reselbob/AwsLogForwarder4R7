const  zlib = require('zlib');
var Logger = require('r7insight_node');
var logger = new Logger({ token: process.env.token , region: process.env.region})
exports.handler = (event, context, callback) => {
    // TODO implement
    //let data = 'unknown';
    if(event.awslogs.data){
        //console.log(event.awslogs.data);
        zlib.gunzip(Buffer.from(event.awslogs.data, 'base64'), function(err, uncompressedLogMessage) {
            if(err) {
                console.error(err);
                logger.err(JSON.stringify(err));
                callback(JSON.stringify(err));
            }
            else {
                const str = uncompressedLogMessage.toString('utf-8');
                console.log(str);
                logger.info(str);
                callback(null,uncompressedLogMessage.toString('utf-8') );
            }
        });
    } else
    {
        const err = new Error('Not present, event.awslogs.data');
        console.error(err);
        logger.err(JSON.stringify(err))
        callback(err);
    }
};

function logit(msg){

 

}