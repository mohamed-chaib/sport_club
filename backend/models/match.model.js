import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import Evenement from "./evenement.model.js";
class Match extends Evenement{}
Match.init({
    match_id:{
        type : DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model :Evenement,
            key : 'id'
        }
    },    
    aDomocile:{
        type : DataTypes.BOOLEAN,
        allowNull:false

    }
},{
    sequelize,
    tableName : 'match',
    timestamps:false

})


export default Match;