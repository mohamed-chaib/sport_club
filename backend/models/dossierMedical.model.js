import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";


class DossierMedical extends Model{
    
}

DossierMedical.init({
    poids:{
        type : DataTypes.DECIMAL,
        allowNull: false
    },
    taile:{
        type : DataTypes.DECIMAL,
        allowNull: false
    },
    nationalite:{
        type : DataTypes.STRING,
        allowNull: false
    },
    Etat:{
        type : DataTypes.STRING,
        allowNull : false
    },
},{
    sequelize,
    tableName:"dossierMedical",
    timestamps:false
})

export default DossierMedical;