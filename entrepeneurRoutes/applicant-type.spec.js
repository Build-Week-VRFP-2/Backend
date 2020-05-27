const supertest = require("supertest");
const applicant = require("../api/server");
const db = require("../data/config-db");

describe("applicants", () => {
  const test = {
    email: "omar22@gmail.com",
    phone_number: 4258536740,
    address: "las vegas",
  };
  const test2 = {
    email: "omar@gmail.com",
    phone_number: 4258536740,
    address: "nv",
  };

  afterEach(async () => {
    await db("applicant_auth");
  });

  describe("POST /api/applicant/:id/contact", () => {
    it("should return status code 201", async () => {
      const res = await supertest(applicant)
        .post("/api/applicant/1/contact")
        .send(test);
      expect(res.status).toBe(201);
    });
  });

  it("should return the type of the response", async () => {
    const res = await supertest(applicant)
      .post("/api/applicant/1/contact")
      .send(test2);
    expect(typeof res.body).toBe("object");
  });

  describe("GET /api/applicant/:id/contact", () => {
    it("should return an array", async () => {
      const res = await supertest(applicant)
        .get("/api/applicant/1/contact")
        .then((response) => {
          expect(typeof response.body).toBe("object");
        });
    });

    it("should return status code 200", async () => {
      const res = await supertest(applicant)
        .get("/api/applicant/1/contact")
        .send(test);
      expect(res.status).toBe(200);
    });
  });

  describe("PUT /api/applicant/:id/contact", () => {
    it("shoud return 404 id not found", async () => {
      const res = await supertest(applicant)
        .put("/api/applicant/1/contact")
        .send({
          email: "omar1@gmail.com",
          phone_number: 4258536740,
          address: "los angeles",
        });
      expect(res.status).toBe(200);
    });

    it("should return invalid id", async () => {
      const res = await supertest(applicant)
        .put("/api/applicant/1/contact")
        .send({
          email: "omar222@gmail.com",
          phone_number: 4258536740,
          address: "new york",
        });
      expect(res.body.message).toBe("successfully updated");
    });
  });

  describe("DELETE /api/applicant/:id/project/:project_id", () => {
    it("should return a 404 status ", async () => {
      const res = await supertest(applicant).delete("/api/applicant/1/contact");
      expect(res.status).toBe(200);
    });

    it("should return the count of items removed", async () => {
      const res = await supertest(applicant).delete("/api/applicant/1/contact");
      expect(res.body.message).toBe("successfully deleted");
    });
  });
});
