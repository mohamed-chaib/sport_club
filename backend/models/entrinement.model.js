import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
class Entrinement extends Model{}

Entrinement.init({
    lieu:{
        type : DataTypes.STRING,
        allowNull: false
    },
    type:{
        type : DataTypes.STRING,
        allowNull : false
    },
    time:{
        type : DataTypes.DATE,
        allowNull : false
    }
},{
    sequelize,
    tableName:"entrinement",
    timestamps:false

})
export default Entrinement;