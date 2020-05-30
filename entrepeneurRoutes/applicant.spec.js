/*const supertest = require("supertest");
const applicant = require("../api/server");
const db = require("../data/config-db");

describe("applicants", () => {
  const test = {
    name: "omar",
    description: "this is omar description num 4",
    background: "this is background num 4",
    city: "las vegas",
    state: "NV",
  };
  const test2 = {
    name: "omar22",
    description: "this is omar description num 4",
    background: "this is background num 4",
    city: "las vegas",
    state: "NV",
  };

  afterEach(async () => {
    await db("applicant_auth");
  });

  describe("POST /api/applicant/:id/projects", () => {
    it("should return status code 201", async () => {
      const res = await supertest(applicant)
        .post("/api/applicant/1/project")
        .send(test);
      expect(res.status).toBe(201);
    });
  });

  it("should return the type of the response", async () => {
    const res = await supertest(applicant)
      .post("/api/applicant/1/project")
      .send(test2);
    expect(typeof res.body).toBe("object");
  });

  describe("GET /api/applicant/:id/projects", () => {
    it("should return an array", async () => {
      const res = await supertest(applicant)
        .get("/api/applicant/1/projects")
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it("should return status code 200", async () => {
      const res = await supertest(applicant)
        .get("/api/applicant/1/projects")
        .send(test);
      expect(res.status).toBe(200);
    });
  });

  describe("PUT /api/applicant/:id/project/:project_id", () => {
    it("shoud return 404 id not found", async () => {
      const res = await supertest(applicant)
        .put("/api/applicant/:id/project/:project_id")
        .send({
          name: "omar smith",
          description: "this is omar description num 4",
          background: "this is background num 4",
          city: "las vegas",
          state: "NV",
        });
      expect(res.status).toBe(404);
    });

    it("should return invalid id", async () => {
      const res = await supertest(applicant)
        .put("/api/applicant/:id/project/:project_id")
        .send({
          name: "omar smith",
          description: "this is omar description num 4",
          background: "this is background num 4",
          city: "las vegas",
          state: "NV",
        });
      expect(res.body.errorMessage).toBe("Invalid ID");
    });
  });

  describe("DELETE /api/applicant/:id/project/:project_id", () => {
    it("should return a 404 status ", async () => {
      const res = await supertest(applicant).delete(
        "/api/applicant/:id/project/:project_id"
      );
      expect(res.status).toBe(404);
    });

    it("should return the count of items removed", async () => {
      const res = await supertest(applicant).delete(
        "/api/applicant/:id/project/:project_id"
      );
      expect(res.body.errorMessage).toBe("Invalid ID");
    });
  });
});*/
