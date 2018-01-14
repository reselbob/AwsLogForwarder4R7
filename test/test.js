'use strict';
const chai = require('chai');
chai.should();
const assert = require('chai').assert;
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const lambda = require('../index');

describe('Basic Tests: ', () => {
    it('Can run lambda', done => {
        const event = {
            "awslogs": {
                "data": "H4sIAAAAAAAAADWQ3WqDQBCFX0WWXkbcf3e9E2rTQgolSm/SEFadBEHddDUNIeTdO03bq2XnHM7Md65kgGlyB6guRyAZecyrfPdalGW+LMiC+PMIAcdWUcs5k5JbjuPeH5bBn46oJO48Jb0b6tYlpbs8Q9/7X0c5B3ADWjhlJqEsYTLZPKzyqiirrahT6vTeWKmcBGcdAyFZ3dBmr5mrDUZMp3pqQnecOz8+df0MYSLZhqzuu37Ddyt/KMY5XN6Cb5DDB7K97y6+YJx/7FfStXiCEIaqVEtthBRM4U8LrTQzwgrGkc6galLFFVOK4sOtpTbVeMbcYUOzGxCWoWopt0wLZRf/zWF8WeXrKlrD5wmtL20W2RRq7ZyN9wZozBiksWlbiCFtVK1oo1ujonckQrYs+ivlYyS37e0b7Gf1dZIBAAA="
            }
        };
        lambda.handler(event, context, function (err, data) {
            if (err) {
                done(err);
            } else {
                console.log(data);
                expect(data).to.an('string');
                done();
            }
        });
    });
});