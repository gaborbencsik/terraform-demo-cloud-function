const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

const insertToBigQuery = (req, res) => {
  console.log('Execution started...')

  const url = `${req.protocol}://${req.hostname}${req.originalUrl}`;
  const dateTime = new Date().toISOString();
  const query = `INSERT \`terraform-demo-project-258413.terraform_demo_example_dataset.visits\` (url, timestamp) VALUES('${url}', '${dateTime}')`;
  console.log(query)

  const options = {
    query: query,
    location: 'europe-west2',
    projectId: 'terraform-demo-project-258413',
    defaultDataset: {
      "datasetId": 'terraform_demo_example_dataset',
      "projectId": 'terraform-demo-project-258413'
    }
  };

  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  const [rows] = await job.getQueryResults();

  console.log('Rows:');
  rows.forEach(row => console.log(row));
}

exports.main = async (req, res) => {

  // insertToBigQuery(req, res)

  res.send('Hello Terraform!');
  
};