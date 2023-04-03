require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const company = require("../models/company");

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


module.exports = (app) => {

  /**
 * Supporting the feature to allow company user to login.
 * @param {string} username The username we will supply you that identifies your account.
 * @param {string} password This password will used to verify your account
 * @returns {accessToken}
 */
    app.use('/company/login', authenticateUser, (req, res) => {
      if (req.body.username === null) {
        res.status(400).send('Username missing');
      }

      if (req.body.password === null) {
        res.status(400).send('Password missing');
      }

      const company_username = req.body.username;
      const company_userObj = { name: company_username };
      const accessToken = generateAccessToken(company_userObj);
      res.json({ accessToken: accessToken });
    });

    async function authenticateUser(req, res, next) {
      try {
        const company_user = await company.findOne({
          where: {
            company_username: req.body.username
          }
        });

        if (company_user === null) {
          res.status(400).send('User is not existed');
        } else if (await bcrypt.compare(req.body.password, company_user.password)) {
            next();
          } else {
            res.status(401).send('Password is uncorrect');
          }
        }
       catch {
        res.sendStatus(500);
      }
    }
  
    function generateAccessToken(user) {
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    }
  };
