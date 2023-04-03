require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const company = require("../models/company");
const authenticateToken = require("../middleware/authenticateToken");

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = (app) => {

/**
 * Getting all information of company user.
 * @param {Header} accessToken 
 * @returns {JSON} 
 */
app.use("/company/info", authenticateToken, async (req, res) => {
    const company_user = await company
      .findOne({
        where: {
          company_username: req.user
        },
        attributes: ['company_username']
      })
      res.send(company_user);
  });

  /**
 * Updating password of company user.
 * @param {Header} accessToken 
 * @param {string} password
 */
  app.use("/company/updatepwd", authenticateToken, async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10);
    const company_username = req.user;
    company
      .update({ password: password }, { where: { company_username: company_username } })
      .then(res.sendStatus(200))
      .catch((err) => console.log(err));
  });

    /**
 * Creating new account for company users.
 * @param {string} username The username we will supply you that identifies your account.
 * @param {string} password This password will used to verify your account.
 */
  app.use("/company/signup", async (req, res) => {
    const company_username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);
    var company_user = await company.findOne({
      where: {
        company_username: company_username
      }
    });

    if (company_user === null) {
      company_user = { company_username: company_username, password: password };
      await company.create(company_user);
      res.sendStatus(200);
    } else {
      res.status(400).send('Username already exists');
    }
  });
}

  