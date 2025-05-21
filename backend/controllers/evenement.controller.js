import Evenement from "../models/evenement.model.js";
import Match from "../models/match.model.js";
import Tournoi from "../models/tournoi.model.js";

export const  getAllEvenements = async (req,res)=>{
        try {
          const type = req.query.type;
          const evenements = await Evenement.findAll({
            where: type ? { type } : undefined, 
            include:[
              {model : Match },
              {model : Tournoi },
            ],            
          })
          return res.status(200).json(evenements)
        } catch (error) {
        }
      }