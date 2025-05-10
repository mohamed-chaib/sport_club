import express from "express";
import sequelize from "./config/db.js"
import Admin from "./models/admin.model.js";
import Joueur from  "./models/joueur.model.js"
import Staff from  "./models/staff.model.js"
import Manager from  "./models/manager.model.js"
import Coache from  "./models/coache.model.js"
import Visiteur from "./models/visiteur.model.js";
import Club from "./models/club.model.js";
import Entrinement from "./models/entrinement.model.js";
import Equipe from "./models/equipe.model.js";
import Match from "./models/match.model.js";
import Stade from "./models/stade.model.js";
import Tournoi from "./models/tournoi.model.js";
import setupAssociations from  './models/association.js'
import memberRoute from "./routes/member.route.js";
import Member from "./models/membre.model.js";


const app = express()

app.use(express.json())

// set up associations 
 setupAssociations()

 // Routes 
 // app.use('/api/admin',adminRoute)
  app.use('/api/member',memberRoute)
  app.get('/',(req,res)=>{
    console.log("test")
    return res.json({msg : "test"})
  })
    try {
        await sequelize.sync()
        console.log("The connection has been created succesffuly")
       
    } catch (error) {
        console.log("The connection  Unsuccesffuly : " + error.message)
    }

    app.listen(3000,()=>{
        console.log("know you are run ")
    })
    