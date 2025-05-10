import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import  Member  from './membre.model.js';

class Visiteur extends Model{}

Visiteur.init({},{
    sequelize,
    tableName : 'visiteur'
})
export default Visiteur;