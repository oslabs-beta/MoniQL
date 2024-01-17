const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();


app.use(express.static(path.resolve(__dirname, '../client')))

app.listen(PORT, () => console.log('HEY LISTEN! (on 3000)'));

