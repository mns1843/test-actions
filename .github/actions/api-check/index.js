const https = require('https');
const fs = require('fs');

https.get('https://actions-test.free.beeceptor.com', (res) => { 
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const response = JSON.parse(data);
    console.log('Response:', JSON.stringify(response));

    if (response.result = 'true') {
      console.log('Result is true - success!');
      fs.appendFileSync(process.env.GITHUB_OUTPUT, 'result=true\n');
    } else {
      console.log('Result is false - something went wrong');
      fs.appendFileSync(process.env.GITHUB_OUTPUT, 'result=false\n');
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('API call failed: ' + err.message);
  process.exit(1);
});
