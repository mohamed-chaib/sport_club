import { DataTypes, Model, where } from "sequelize";
import sequelize from "../config/db.js";
import Member from "./membre.model.js";
import Staff from "./staff.model.js";
import Manager from "./manager.model.js";
import Joueur from "./joueur.model.js";
import Coache from "./coache.model.js";
import redis from "../config/redis.js";

class Admin extends Member {
  static async ajouterStaff(req, res) {
    try {
      const { email } = req.body;
      const userExist = await Member.findOne({ where: { email } });
      if (userExist) {
        return res.json({ message: "User already exist" });
      }

      const { nom, prenom, password, type, date_rec, id_equipe } = req.body;
      const t = await sequelize.transaction();
      const member = await Member.create(
        {
          nom,
          prenom,
          email,
          role: "staff",
          password,
        },
        {
          transaction: t,
        }
      );
      const staff = await Staff.create(
        {
          staff_id: member.id,
          type,
          date_rec,
          id_equipe,
        },
        {
          transaction: t,
        }
      );
      await t.commit();
      return res.status(200).json({
        member: {
          id: member.id,
          nom: member.nom,
          prenom: member.prenom,
          email: member.email,
          role: member.role,
          details: {
            type: staff.type,
            date_rec: staff.date_rec,
            id_equipe: staff.id_equipe,
          },
        },
      });
    } catch (error) {
      console.log("error in :  ajouter staff function : " + error.message);
      return res.status(500).json({ message: " Error ", error: error.message });
    }
  }
  static async ajouterManager(req, res) {
    try {
      const { email } = req.body;
      const userExist = await Member.findOne({ where: { email } });
      if (userExist) {
        return res.json({ message: "User already exist" });
      }

      const { nom, prenom, password } = req.body;
      const t = await sequelize.transaction();
      const member = await Member.create(
        {
          nom,
          prenom,
          email,
          role: "manager",
          password,
        },
        {
          transaction: t,
        }
      );
      const manager = await Manager.create(
        {
          manager_id: member.id,
        },
        {
          transaction: t,
        }
      );
      await t.commit();
      return res.status(200).json({
        member: {
          id: member.id,
          nom: member.nom,
          prenom: member.prenom,
          email: member.email,
          role: member.role,
          details: {},
        },
      });
    } catch (error) {
      console.log("error in :  ajouter manager function : " + error.message);
      return res.status(500).json({ message: " Error ", error: error.message });
    }
  }
  static async ajouterJoueur(req, res) {
    try {
      const { email } = req.body;
      const userExist = await Member.findOne({ where: { email } });
      if (userExist) {
        return res.json({ message: "User already exist" });
      }

      const {
        nom,
        prenom,
        password,
        post,
        date_rec,
        numero,
        id_equipe,
        id_manager,
        id_staff,
      } = req.body;

      const t = await sequelize.transaction();
      const member = await Member.create(
        {
          nom,
          prenom,
          email,
          role: "joueur",
          password,
        },
        {
          transaction: t,
        }
      );
      const joueur = await Joueur.create(
        {
          joueur_id: member.id,
          post,
          date_rec,
          numero,
          id_equipe,
          id_manager,
          id_staff,
        },
        {
          transaction: t,
        }
      );
      console.log(
        nom,
        prenom,
        password,
        post,
        date_rec,
        numero,
        id_equipe,
        id_manager,
        id_staff
      );

      await t.commit();
      console.log(
        nom,
        prenom,
        password,
        post,
        date_rec,
        numero,
        id_equipe,
        id_manager,
        id_staff
      );

      return res.status(200).json({
        member: {
          id: member.id,
          nom: member.nom,
          prenom: member.prenom,
          email: member.email,
          role: member.role,
          details: {
            joueur_id: joueur.id,
            post: joueur.post,
            date_rec: joueur.date_rec,
            numero: joueur.numero,
            id_equipe: joueur.id_equipe,
            id_manager: joueur.id_manager,
            id_staff: joueur.id_staff,
          },
        },
      });
    } catch (error) {
      console.log("error in :  ajouter joueur function : " + error.message);
      return res.status(500).json({ message: " Error ", error: error.message });
    }
  }
  static async ajouterCoache(req, res) {
    try {
      const { email } = req.body;
      const userExist = await Member.findOne({ where: { email } });
      if (userExist) {
        return res.json({ message: "User already exist" });
      }

      const {
        nom,
        prenom,
        password,
        type_coach,
        date_rec,
        id_equipe,
        id_manager,
        licence,
      } = req.body;
      const t = await sequelize.transaction();
      const member = await Member.create(
        {
          nom,
          prenom,
          email,
          role: "coache",
          password,
        },
        {
          transaction: t,
        }
      );
      const coache = await Coache.create(
        {
          coache_id: member.id,
          licence,
          type_coach,
          date_rec,
          id_equipe,
          id_manager,
        },
        {
          transaction: t,
        }
      );
      await t.commit();
      return res.status(200).json({
        member: {
          id: member.id,
          nom: member.nom,
          prenom: member.prenom,
          email: member.email,
          role: member.role,
          details: {
            licence: coache.licence,
            type_coach: coache.type_coach,
            date_rec: coache.date_rec,
            id_equipe: coache.id_equipe,
            id_manager:coache.id_manager,

          },
        },
      });
    } catch (error) {
      console.log("error in :  ajouter staff function : " + error.message);
      return res.status(500).json({ message: " Error ", error: error.message });
    }
  }
  static async supprimerMember(req, res) {
    try {
      const id = req.params.id;
  
      
      const member = await Member.findByPk(id);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
  
      try {
        // delete the member refresh token 
        await redis.del(`refreshToken:${member.id}`);
      } catch (redisError) {
        console.warn("Redis deletion warning:", redisError.message);
      }
  
      // delete member from the database 
      await member.destroy(); 

      return res.status(200).json({ message: "Member deleted successfully" });
  
    } catch (error) {
      console.error("Error in supprimerMember function:", error.message);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  }
  
}

Admin.init(
  {
    admin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Member,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "admin",
    timestamps: false,
  }
);

export default Admin;
