import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import Member from "./membre.model.js";
import Evenement from "./evenement.model.js";
import Match from "./match.model.js";
import Tournoi from "./tournoi.model.js";

class Manager extends Member {
  static async organiserMatch(req, res) {
    const t = await sequelize.transaction();

    try {
      const id_manager = req.member?.id;
      const { type, date, adversaire, score, id_stade, aDomocile } = req.body;
      const evenement = await Evenement.create(
        {
          type,
          date,
          adversaire,
          score,
          id_stade,
          id_manager,
        },
        {
          transaction: t,
        }
      );

      const match = await Match.create(
        {
          match_id: evenement.id,
          aDomocile,
        },
        {
          transaction: t,
        }
      );
      await t.commit();
      res.status(200).json({
        evenement: {
          id: evenement.id,
          type: evenement.type,
          date: evenement.date,
          adversaire: evenement.adversaire,
          score: evenement.score,
          id_stade: evenement.id_stade,
          id_manager: evenement.id_manager,
        },
        details: {
          match_id: evenement.id,
          aDomicile: match.aDomicile,
        },
      });
    } catch (error) {
      await t.rollback();
      console.error("Error in organiserMatch:", error);
      return res
        .status(500)
        .json({
          message: "Erreur lors de l'organisation du match.",
          error: error.message,
        });
    }
  }

  static async organiserTournoi(req, res) {
    const t = await sequelize.transaction();

    try {
      const id_manager = req.member?.id;
      const { type, date, adversaire, score, id_stade, tour,nom } = req.body;
      const evenement = await Evenement.create(
        {
          type,
          date,
          adversaire,
          score,
          id_stade,
          id_manager,
        },
        {
          transaction: t,
        }
      );

      const tournoi = await Tournoi.create(
        {
          tournoi_id: evenement.id,
          tour,
          nom
        },
        {
          transaction: t,
        }
      );
      await t.commit();
      res.status(200).json({
        evenement: {
          id: evenement.id,
          type: evenement.type,
          date: evenement.date,
          adversaire: evenement.adversaire,
          score: evenement.score,
          id_stade: evenement.id_stade,
          id_manager: evenement.id_manager,
        },
        details: {
          tournoi_id: evenement.id,
          tour: tournoi.tour,
          nom:tournoi.nom,
        },
      });
    } catch (error) {
      await t.rollback();
      console.error("Error in organiserMatch:", error);
      return res
        .status(500)
        .json({
          message: "Erreur lors de l'organisation du match.",
          error: error.message,
        });
    }
  }
}
Manager.init(
  {
    manager_id: {
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
    tableName: "manager",
    timestamps: false,
  }
);

export default Manager;
