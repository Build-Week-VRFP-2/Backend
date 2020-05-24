const db = require("../data/config-db");

function findById(id) {
  return db("types").where({ id }).first();
}

async function addType(type, applicant_auth_id) {
  const [id] = await db("types").insert(type, "id");
  const obj = { applicant_id: applicant_auth_id, type_id: id };
  return db("applicant_criteria").insert(obj, "id");
}

module.exports = {
  findById,
  addType,
};
