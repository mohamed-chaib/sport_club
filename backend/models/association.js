// associations.js
import Equipe from './equipe.model.js';
import Club from './club.model.js';
import Evenement from './evenement.model.js';
import Stade from './stade.model.js';
import Visiteur from './visiteur.model.js';
import Manager from './manager.model.js';
import Joueur from './joueur.model.js';
import Coache from './coache.model.js';
import Staff from './staff.model.js';
import Entrinement from './entrinement.model.js';
import Member from './membre.model.js';
import Admin from './admin.model.js';
import Match from './match.model.js';
import Tournoi from './tournoi.model.js';

// Set up all associations here
const setupAssociations = () => {
    // equipe * 1 club
  Equipe.belongsTo(Club, { foreignKey: 'id_club' });
  Club.hasMany(Equipe, { foreignKey: 'id_club' });

  // equipe 1 * staff
  Equipe.hasMany(Staff, { foreignKey: 'id_equipe' });
  Staff.belongsTo(Equipe, { foreignKey: 'id_equipe' });

  // equipe 1 * joueur
  Equipe.hasMany(Joueur, { foreignKey: 'id_equipe' });
  Joueur.belongsTo(Equipe, { foreignKey: 'id_equipe' });

  // equipe 1 * coach
  Equipe.hasMany(Coache, { foreignKey: 'id_equipe' });
  Coache.belongsTo(Equipe, { foreignKey: 'id_equipe' });

  // joueur * 1 manager  
  Manager.hasMany(Joueur, { foreignKey: 'id_manager' });
  Joueur.belongsTo(Manager, { foreignKey: 'id_manager' });

  // evenement * 1 stade
  Evenement.belongsTo(Stade, { foreignKey: 'id_stade' });
  Stade.hasMany(Evenement, { foreignKey: 'id_stade' });
  // evenement * * Visiteur
  Evenement.belongsToMany(Visiteur, { through: 'visiteur_cons_evenement' });
  Visiteur.belongsToMany(Evenement, { through: 'visiteur_cons_evenement' });
  // evenement * 1 manager
  Evenement.belongsTo(Manager, { foreignKey: 'id_manager' });
  Manager.hasMany(Evenement, { foreignKey: 'id_manager' });
  // coach * * Visiteur
  Coache.belongsToMany(Visiteur, { through: 'visiteur_cons_coach' });
  Visiteur.belongsToMany(Coache, { through: 'visiteur_cons_coach' });
  
  // joueur * * Visiteur
  Joueur.belongsToMany(Visiteur, { through: 'visiteur_cons_joueur' });
  Visiteur.belongsToMany(Joueur, { through: 'visiteur_cons_joueur' });


  // Entrinement * 1 Coache
  Entrinement.belongsTo(Coache, { foreignKey: 'id_coach' });
  Coache.hasMany(Entrinement, { foreignKey: 'id_coach' });

  // staff 1 * joueur
  Staff.hasMany(Joueur, { foreignKey: 'id_staff' });
  Joueur.belongsTo(Staff, { foreignKey: 'id_staff' });

    // caoch * 1 manager
    Coache.belongsTo(Manager, { foreignKey: 'id_manager' });
    Manager.hasMany(Coache, { foreignKey: 'id_manager' });

  // member heritage
    Member.hasOne(Admin, { foreignKey: 'admin_id' });
    Admin.belongsTo(Member, { foreignKey: 'admin_id' });

    Member.hasOne(Manager, { foreignKey: 'manager_id' });
    Manager.belongsTo(Member, { foreignKey: 'manager_id' });

    Member.hasOne(Coache, { foreignKey: 'coache_id' });
    Coache.belongsTo(Member, { foreignKey: 'coache_id' });

    Member.hasOne(Staff, { foreignKey: 'staff_id' });
    Staff.belongsTo(Member, { foreignKey: 'staff_id' });

    Member.hasOne(Joueur, { foreignKey: 'joueur_id' });
    Joueur.belongsTo(Member, { foreignKey: 'joueur_id' });

    
    // evenement heritage
    Evenement.hasOne(Match, { foreignKey: 'match_id' });
    Match.belongsTo(Evenement, { foreignKey: 'match_id' });

    Evenement.hasOne(Tournoi, { foreignKey: 'tournoi_id' });
    Tournoi.belongsTo(Evenement, { foreignKey: 'tournoi_id' });


};

export default setupAssociations;
