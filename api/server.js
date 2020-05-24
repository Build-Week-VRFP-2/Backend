const express = require("express");
const helmet = require("helmet");

const authInvestor = require("../authRoutes/auth-investor");
const authEntrepeneur = require("../authRoutes/auth-entrepeneur");

const entrepeneurRoutes = require("../entrepeneurRoutes/entrepeneur-routes");
// const applicantTypeRoute = require("../entrepeneurRoutes/applicant-type-route");

// const investorRestricted = require('../middlewares/investor-restricted');
const restricted = require("../middlewares/entrepeneur-restricted");

// we just need to bring entrepeneurs Routes/ investors Routes and add the restricted middleware.
// create .env file to store jsonwebtoken secret.

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/auth/investor", authInvestor);
server.use("/api/auth/applicant", authEntrepeneur);

// server.use("/api/applicant", applicantTypeRoute);

server.use("/api/applicant", entrepeneurRoutes);

module.exports = server;
