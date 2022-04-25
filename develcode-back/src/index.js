const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userService = require('./services/user.service');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/addUsers', async (req, res) => {
    await userService.createUser(req.body, (response) => {
        res.status(response.status).send(response);
    });
});

app.get('/getUsers', async (req, res) => {
    await userService.getUsers((response) => {
        res.status(response.status).send(response);
    });
});

app.put('/:userId', async (req, res) => {
    await userService.updateUser(req.params.userId, req.body, (response) => {
        res.status(response.status).send(response);
    });
});

app.listen(3000, () => {
    console.log('RUNING ON PORT http://localhost:3000');
})