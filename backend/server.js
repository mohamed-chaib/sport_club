import express from "express";
import sequelize from "./config/db.js"
import bcrypt from "bcryptjs";
import DossierMedical from "./models/dossierMedical.model.js";

import Manager from  "./models/manager.model.js"
import Admin from "./models/admin.model.js";
import Joueur from  "./models/joueur.model.js"
import Staff from  "./models/staff.model.js"
import Coache from  "./models/coache.model.js"
import Visiteur from "./models/visiteur.model.js";
import Club from "./models/club.model.js";
import Entrinement from "./models/entrinement.model.js";
import Equipe from "./models/equipe.model.js";
import Match from "./models/match.model.js";
import Stade from "./models/stade.model.js";
import Tournoi from "./models/tournoi.model.js";
import setupAssociations from  './models/association.js'
import memberRoute from './routes/member.route.js'
import Member from "./models/membre.model.js";
import cookieParser from "cookie-parser";
import adminRoute from './routes/admin.route.js'
import managerRoute from './routes/manager.route.js'
import coacheRoute from './routes/coache.route.js'
import joueurRoute from './routes/joueur.route.js'
import evenementRoute from './routes/evenement.route.js'
import entrinementRoute from './routes/entrinement.route.js'
import staffRoute from './routes/staff.route.js'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()




const app = express() 
app.use(express.json())
app.use(cookieParser())
app.use(cors('*',{
  origin: 'http://localhost:3000', // allow all
  credentials:true
}));

// set up associations 
 setupAssociations()

 // Routes 
app.use('/api/member',memberRoute)
app.use('/api/admin',adminRoute)
app.use('/api/manager',managerRoute)
app.use('/api/coache',coacheRoute)
app.use('/api/joueur',joueurRoute)
app.use('/api/evenement',evenementRoute)
app.use('/api/entrinement',entrinementRoute)
app.use('/api/staff',staffRoute)

async function startServer() {
    try {
      await sequelize.authenticate();
      console.log('✅ Connected to the database');
  
      await sequelize.sync(); 
      console.log('📦 Tables created (if not exist)');
      await Member.create({
        nom:'mohammed',
        prenom:"mohammed",
        email:"amar@gmail.com",
        password:"123456",
        role:"admin"
      })
      

      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    } catch (error) {
      console.error('❌ Failed to connect or sync DB:', error);
    }
  }

  startServer();
