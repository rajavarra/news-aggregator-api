const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('NEWS API');
})
app.listen(PORT, () => {
    console.log(`server listen on port: ${PORT}`);
});