const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/connection");
const games = require("./database/Games");
const Games = require("./database/Games");

// Active database/sequelize
connection.
        authenticate()
        .then(() => {console.log("Database started")})
        .catch((err) => {console.log(err)})

// Active body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var DB = {
    games:[
        {
            id: 23,
            name: "League of legends",
            year: 2009,
            price: 0
        },
        {
            id: 15,
            name: "Counter-strike global offensive",
            year: 2013,
            price: 30
        },
        {
            id: 30,
            name: "Minecraft",
            year: 2012,
            price: 40
        },
    ]
}

app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.get("/game/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(x => x.id == id)
        
        if(game == undefined){
            res.sendStatus(404);
        }else{
            res.statusCode = 200;
            res.json(game)
        }
    }
})

app.post("/game", (req, res) => {
    var {name, year, developedBy, description, genre} = req.body;
    Games.create({
        name: name,
        year: year,
        developedBy: developedBy,
        description: description,
        genre: genre
    })
    if(name != undefined || developedBy != undefined || description != undefined || genre != undefined){
        if(typeof year != "number"){
            res.sendStatus(400);
        }else{
            DB.games.push({
                id: 100,
                name,
                year,
                price
            })
            res.sendStatus(200);
        }
    }else{
        res.sendStatus(400);
    }
});

app.delete("/game/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(x => x.id == id);
        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
    }
})

app.put("/game/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(x => x.id == id)
        
        if(game == undefined){
            res.sendStatus(404);
        }else{
            var {name, year, price} = req.body;
            
            if(name != undefined){
                game.name = name;
            }
            if(year != undefined){
                game.year = year;
            }
            if(price != undefined){
                game.price = price;

            res.sendStatus(200);
            }
        }
    }
})

app.listen(3000, () => {
    console.log("Server started!")
});