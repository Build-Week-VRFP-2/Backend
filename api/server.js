const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authInvestor = require("../authRoutes/auth-investor");
const authEntrepeneur = require("../authRoutes/auth-entrepeneur");
const investorRoutes = require("../investorRoutes/investor-route");
const entrepeneurRoutes = require("../entrepeneurRoutes/entrepeneur-routes");
// const applicantTypeRoute = require("../entrepeneurRoutes/applicant-type-route");
const applicantContactRoute = require("../entrepeneurRoutes/applicant-contactInfo-route");

// const investorRestricted = require('../middlewares/investor-restricted');
const restrictedEnt = require("../middlewares/entrepeneur-restricted");
const restrictedInv = require("../middlewares/investor-restricted")
// we just need to bring entrepeneurs Routes/ investors Routes and add the restricted middleware.
// create .env file to store jsonwebtoken secret.

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth/investor", authInvestor);
server.use("/api/auth/applicant", authEntrepeneur);

// server.use("/api/applicant", applicantTypeRoute);

// /api/applicant/:id/contact
server.use("/api/applicant", restrictedEnt, applicantContactRoute);

server.use("/api/investor", restrictedInv, investorRoutes);

//api/applicant/:id/project
server.use("/api/applicant", restrictedEnt, entrepeneurRoutes);

module.exports = server;
