import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
class Evenement extends Model{
    static commonAttributes ={
        type:{
            type : DataTypes.STRING,
            allowNull: false
        },
        date:{
            type : DataTypes.DATE,
            allowNull : false
        },
        adversaire:{
            type : DataTypes.STRING,
            allowNull : false
        }

    }
}
Evenement.init({
    ...Evenement.commonAttributes
},
{
    sequelize,
    tableName:"evenement"
})


export default Evenement;