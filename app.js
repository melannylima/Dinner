const express = require('express')
const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// INDEX
app.get('/wfd', (req, res) => {
  console.log('index');
  res.render('index.ejs')
})

app.listen(3000, () => {
  console.log(`listening on port 3000`);
})
