const https = require('https');
const core = require('@actions/core');

https.get('https://actions-test.free.beeceptor.com', (res) => { 
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const response = JSON.parse(data);
    console.log('Response:', response);

    if (response.result = 'true') {
      console.log('Result is true - success!');
      core.setOutput('result','true');
    } else {
      console.log('Result in false - something went wrong');
      core.setOutput('result', 'false');
      core.setFailed('API returned false');
    }
  });
}).on('error', (err) => {
  core.setFailed('API call failed: ' + err.message);
});
