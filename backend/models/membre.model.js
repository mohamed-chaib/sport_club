// member.model.js
import sequelize from "../config/db.js";
import bcrypt from "bcryptjs";
import { Model, DataTypes } from "sequelize";





// Base model class (won't create a table)

class Member extends Model {
  static login = async function (req, res) {
    try {
      const { email, password } = req.body;
      const member = await Member.findOne({ where : {email}})
      if (member &&(await bcrypt.compare(password,member.password))) {
         // there is a problem with importing the rolemodelmap
        const roleModel = roleModelMap[member.role];
        const roleData = await roleModel.findOne({where:{admin_id :member.id}})
        return res.status(200).json({
          message: 'Log In Succesful',
          member:{
          id:member.id,
          nom:member.nom,
          prenom:member.prenom,
          email:member.email,
          role:member.role,
          roleModel
        }
      });
      }
      else{
        return res.status(400).json({message:'Log In Unsuccesful'})
      }
      
      // const user
    } catch (error) {
      return res.status(500).json({message:"Server Error", error:error.message})
      console.log('error in : Member Model ->  login function : ' +error.message)
    }
  };
  
 
}
Member.init(
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    ,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "member",
    hooks: {
      beforeCreate: async function (member, options) {
        if (member.password) {
          const salt = await bcrypt.genSalt(10);
          member.password = await bcrypt.hash(member.password, salt);
        }
      },
    },
  }
);

export default Member;
