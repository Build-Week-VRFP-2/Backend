/*const supertest = require("supertest");
const applicant = require("../api/server");
// const server = require("../api/server");
const db = require("../data/config-db");
const Entrepeneur = require("../models/entrepeneur-model");

describe("applicants", () => {
  const test = {
    username: "testing1",
    password: "testing1",
  };

  afterEach(async () => {
    await db("applicant_auth");
  });
  describe("POST /api/auth/register", () => {
    it("should return an object with new applicant", async () => {
      await db("applicant_auth").truncate();
      const newUser = await Entrepeneur.add(test);
      const obj = await db("applicant_auth");

      expect(obj).toHaveLength(1);
    });

    it("should return status 400 when missing a required field", async () => {
      const response = await supertest(applicant)
        .post("/api/auth/applicant/register")
        .send({
          usename: "testing1",
          // password: "testig1"
        });
      expect(response.status).toBe(400);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should return an object", async () => {
      await db("applicant_auth");
      const user = await Entrepeneur.findBy({ username: "testing1" });
      const obj = await db("applicant_auth");
      expect(Array.isArray(obj)).toBe(true);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should return status code 400 when it fails", () => {
      return supertest(applicant)
        .post("/api/auth/applicant/login")
        .then((response) => {
          expect(response.status).toBe(400);
        });
    });
  });
});*/
