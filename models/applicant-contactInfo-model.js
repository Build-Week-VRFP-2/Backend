const db = require("../data/config-db");

function findById(id) {
  return db("applicant_contact_info").where({ id }).first();
}

function findContById(id) {
  return db("applicant_contact_info as a").where("a.applicant_id", id);
}

function findBy(filter) {
  return db("applicant_contact_info").where(filter);
}

async function addContact(applicant_id, contact) {
  const obj = { ...contact, applicant_id };
  const [id] = await db("applicant_contact_info").insert(obj, "id");

  return findById(id);
}

async function updateContact(id, changes) {
  const [contact] = await findContById(id);
  return db("applicant_contact_info as a")
    .where("a.id", contact.id)
    .update(changes);
}

async function removeContact(id) {
  const [contact] = await findContById(id);

  return db("applicant_contact_info as a").where("a.id", contact.id).del();
}

module.exports = {
  addContact,
  findContById,
  findById,
  findBy,
  updateContact,
  removeContact,
};
