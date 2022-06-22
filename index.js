const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/connection");
const Games = require("./database/Games");

// Active database/sequelize
connection.
        authenticate()
        .then(() => {console.log("Database started")})
        .catch((err) => {console.log(err)})

// Active body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.get("/games", (req, res) => {
    res.statusCode = 200;
    Games.findAll({raw: true}).then((games) => {
        res.send(games);
    })
});

app.get("/game/:id", async (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = await Games.findOne({where:{id:id}});
        if(game != null){
            Games.findOne({
                where:{
                    id: id
                }
            }).then((game) => {
                res.statusCode = 200;
                res.send(game);
            }) 
        }else{
            res.sendStatus(404);
        }    
}}
);

app.post("/game", (req, res) => {
    var {name, year, developedBy, description, genre} = req.body;
    if(name != undefined || developedBy != undefined || description != undefined || genre != undefined){
        if(typeof year != "number"){
            res.sendStatus(400);
        }else{
            Games.create({
                name: name,
                year: year,
                developedBy: developedBy,
                description: description,
                genre: genre
            })
            res.sendStatus(200);
        }
    }else{
        res.sendStatus(400);
    }
});

app.delete("/game/:id", async (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = (req.params.id);
        var game = await Games.findOne({where:{id:id}})
        if(game == null){
            res.sendStatus(404);
        }else{
            Games.destroy({
                where:{
                    id: id
                }
            }).then(() => {
                res.statusCode = 200;
                res.send("Game deleted")
            })
    }    
}
});

app.put("/game/:id", async (req, res) => {
    if(isNaN(req.params.id)){
        console.log("Is not a number")
    }else{
        var id = req.params.id;
        var game = await Games.findOne({where:{id:id}});
        if(game == null){
            res.sendStatus(404);
        }else{
            var {name, description} = req.body;
            
            if(name != null){
                Games.update({name: name},{
                    where:{id:id}
                }).then(() => {
                    res.send("The new name is " + name)
                });
            if(description != null){
                Games.update({description: description},{
                    where:{id:id}
                }).then(() => {
                    res.send("The new description is " + description);
                });
            }
        }
    }
}});

// Server starter
app.listen(3000, () => {
    console.log("Server started!")
})