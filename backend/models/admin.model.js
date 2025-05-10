import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import  Member  from './membre.model.js';
class Admin extends Member{}

Admin.init({
    admin_id:{
        type : DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model :Member,
            key : 'id'
        }
    }
},{
    sequelize,
    tableName:"admin"
})
export default Admin;