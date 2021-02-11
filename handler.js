'use strict';
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({
  apiVersion: '2015-03-31',
  endpoint: 'http://localhost:3002' // port should be lambdaPort of receiver lambda
});

const eventPayload = require('./event-payload');

module.exports.hello = async (event) => {
  const response = await new Promise((resolve, reject) => {
    lambda.invoke({
      FunctionName: 'receiver-lambda-dev-hello',
      Payload: JSON.stringify({
        ...eventPayload,
        path: '/sample',
        httpMethod: 'GET'
      })
    }, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });

  console.log('CHDLLK: ', response);

  return response;
};
