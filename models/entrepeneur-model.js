const db = require("../data/config-db");

async function add(applicant) {
  const [id] = await db("applicant_auth").insert(applicant, "id");
  return db("applicant_auth as a").where({ id }).select("a.id", "a.username");
}

function findById(id) {
  return db("applicant_auth").where({ id }).first();
}

function findBy(filter) {
  return db("applicant_auth").where(filter).first();
}

// ---------------------------------------------------------------
async function addProject(project, applicant_auth_id) {
  const obj = { ...project, applicant_auth_id };
  const [id] = await db("applicants").insert(obj, "id");
  return findProjectById(id);
}

function findProjects(applicant_id) {
  return db("applicants as a").where("a.applicant_auth_id", applicant_id);
}

function findProjectById(id) {
  return db("applicants").where({ id }).first();
}

function findApplicantProject(applicant_id, project_id) {
  return db("applicants as a")
    .where("a.applicant_auth_id", applicant_id)
    .where("a.id", project_id);
}

async function updateApplicantProject(applicant_id, project_id, changes) {
  const [project] = await findApplicantProject(applicant_id, project_id);
  return db("applicants as a").where("a.id", project.id).update(changes);
}

async function removeApplicantProject(applicant_id, project_id) {
  const [project] = await findApplicantProject(applicant_id, project_id);
  return db("applicants as a").where("a.id", project.id).del();
}

module.exports = {
  add,
  findBy,
  findById,
  ///
  addProject,
  findProjectById,
  findProjects,
  findApplicantProject,
  updateApplicantProject,
  removeApplicantProject,
};
