import express from 'express';
import fs from 'fs';
const app = express();
import cors from 'cors'

app.use(cors())

app.use(express.json()) // its a middleware 

const dbData = fs.readFileSync('./data.json', 'utf-8');
const data = JSON.parse(dbData);
const output = {
    data: "",
    status: "",
    message: "",
};
const port = 5500;

app.get('/api/v1/weather', (req, res) => {
    const city = req.query.location;
    const userAskedData = data.find((element) => element.name.toLowerCase() === city.toLowerCase())
    if (userAskedData) {
        output.data = userAskedData;
        output.status = "200 Ok";
        output.message = "Success"
    }
    else {
        output.data = "NULL";
        output.status = "404 Error";
        output.message = "Fail"
    }
    res.json(output);
    res.end();
});

app.get('*', (req, res) => {
    res.send("Wrong url");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})