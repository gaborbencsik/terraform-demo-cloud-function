const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

exports.main = async (req, res) => {

  const url = `${req.protocol}://${req.hostname}/${req.originalUrl}`;
  const dateTime = new Date().toISOString();
  const queryString = `INSERT \`terraform-demo-project-258413.terraform_demo_example_dataset.visits\` (url, timestamp) VALUES('${url}', '${dateTime}')`;
  console.log(query)

  await bigquery.query(queryString, {} , (err, rows) => {
    if (!err) {
      console.error(err)
    }
  });

  res.send('Hello Terraform!');
};