require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const type = require("../models/type");

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = (app) => {
    /**
 * Returning all types in database
 * @returns {JSON}
 */
    app.use("/type/all", async (req, res) => {
        const types = await type.findAll({
            attributes: ['type']
        });
        res.send(types);
    })
}
