const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

exports.main = async (req, res) => {

  console.log('Execution started...')

  const url = `${req.protocol}://${req.hostname}/${req.originalUrl}`;
  const dateTime = new Date().toISOString();
  const queryString = `INSERT \`terraform-demo-project-258413.terraform_demo_example_dataset.visits\` (url, timestamp) VALUES('${url}', '${dateTime}')`;
  console.log(queryString)

  const response = await bigquery.query(queryString, {} , (err, rows) => {
    console.log(rows)
    if (!err) {
      console.error(err)
    }
  });

  const jobResponse = await bigquery.createQueryJob({
    destination: bigquery.dataset('terraform_demo_example_dataset').table('visits'),
    query: queryString
  }, function(err, job) {
    console.log(job)
  });

  res.send('Hello Terraform!');
};