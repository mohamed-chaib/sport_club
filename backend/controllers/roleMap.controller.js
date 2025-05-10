// member.model.js
import Admin from "../models/admin.model.js"
import Manager from "../models/manager.model.js"
import Coache from "../models/coache.model.js"
import Staff from "../models/staff.model.js"
import Joueur from "../models/joueur.model.js"

const roleModelMap ={
  admin : Admin,
  manager : Manager,
  coache : Coache,
  staff : Staff,
  joueur : Joueur,

}
export default roleModelMap;
