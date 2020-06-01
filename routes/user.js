var routes = require('express').Router();
const bcrypt = require('bcrypt');
const { user } = require('../models/index');
const {getToken, verifyToken} = require('../middleware/token');

routes.post('/user', (req, res) => {
    user.create({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    }).then(async () => {
        var accessToken = await getToken(req.body.email);
        res.status(201).json({accessToken});
    }).catch((e) => {
        res.send(e);
    });
});

routes.post('/user/login', async (req, res) => { 
    user.findAll({
         where:{
             email: "sagar101283cse@gmail.com"
         }
     })
    .then(async (result) => {
        var isMatch = await bcrypt.compare("123abc", result[0].password);
        if(isMatch){
            var accessToken = await getToken("sagar101283cse@gmail.com");
            res.status(200).json({accessToken: accessToken});
        }
        else
            res.status(400).send("wrong username or password");
    })
    .catch((e) => {
        res.status(500).send(e);
    });
});

routes.get('/users', verifyToken, (req, res) => {
    user.findAll().then((result) => {
        console.log(result.length);
        res.status(200).send(result);
    }).catch((e) => {
        res.status(404).json("Not Found");
    });
});
    

routes.get('/user/:id', verifyToken,(req, res) => {
    user.findAll({
        where: {
            id: req.params.id
        }
    }).then( (result) => {
        res.send(result);
    }).catch((e) => {
        res.send(e);
    });
})

routes.delete('/user/:id', verifyToken,(req, res) => {
    user.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        if(result > 0)
            res.send("User Deleted!");
        else
            res.send("User not found!");
    }).catch((e) => {
        res.send("Some error occured");
    });
});

module.exports = routes;