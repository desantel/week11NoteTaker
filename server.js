//dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

//PORT and express
const app = express();
const PORT = process.env.PORT || 3000;

//parses data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

require('./routes/route')(app);

//listener
app.listen(PORT, function() {
    console.log(`Listening on PORT: ${PORT}`);
});
