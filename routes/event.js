require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const company = require("../models/company");
const event = require("../models/event");
const type = require("../models/type");
const event_date = require("../models/event_date");
const authenticateToken = require("../middleware/authenticateToken");

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = (app) => {

/**
 * Setting available time for exist events
 * @param {integer} id Event id
 * @param {string} date Weekday
 * @param {string} time available time
 */
  app.use("/event/create/time", authenticateToken, async(req, res) => {
    var array = req.body;
    
    if (!array) {
      res.status(400).send('Date information missing');
    }
    const company_username = req.user;
    const company_user = await company.findOne({
      where: {
        company_username: company_username
      }
    });

    for (var i = 0; i < array.length; i++) {
      const event_id = array[i].id;
      const event_object = await event.findOne({
        where: {
          id: event_id
        }
      })

      if (event_object.company_id !== company_user.id) {
        res.status(403).send('You have no authentication to set available time for this event')
      }
      const day = array[i].date;
      const time = array[i].time;
      await event_date.create({
        event_id: event_id,
        day: day,
        time: time
      })
    }

    res.sendStatus(200);
  }) 

  app.use("/event/time", async(req, res) => {
    var input_day = req.body.day;
    
    if (!input_day) {
      res.status(400).send('Date information missing');
    }
    const arr = await event_date.findAll({
      attributes: ['time'],
      where: {
        day: input_day
      }
    })
    res.send(arr);
  })

    /**
 * Creating a new event with detailed information
 * @param {string} title The title of new event.
 * @param {string} image The url of uploaded image of new event.
 * @param {integer} num_player The regular number of people per event.
 * @param {integer} limit_player 	The maximum people per event.
 * @param {integer} regular_price The price for event when number of player less than regular number of people per event.
 * @param {integer} additional_price The price for one person when number of player more than regular number of player.
 * @param {string} description The description for new event.
 * @param {string} event_type 	The type of new event.
 * @returns {JSON}
 */
app.use("/event/create", authenticateToken, async (req, res) => {

  if (!req.body.title) {
    return res.status(400).send('Title missing');
  }

  if (!req.body.image) {
    return res.status(400).send('Image missing');
  }

  if (!req.body.num_player) {
    return res.status(400).send('num_player missing');
  }

  if (!req.body.limit_player) {
    return res.status(400).send('limit_player missing');
  }

  if (!req.body.regular_price) {
    return res.status(400).send('regular_price missing');
  }

  if (!req.body.additional_price) {
    return res.status(400).send('additional_price missing');
  }

  if (!req.body.event_type) {
    return res.status(400).send('event_type missing');
  }

  if (!req.body.description) {
    return res.status(400).send('description missing');
  }

    const company_username = req.user;
    const company_user = await company.findOne({
      where: {
        company_username: company_username
      }
    });

    var type_object = await type.findOne({
      where: {
        type: req.body.event_type
      }
    });

    if (type_object === null) {
        type_obejct = await type.create({
        type: req.body.event_type
      })
    }

      const event_object = await event.create({ 
        company_id: company_user.id,
        title: req.body.title, 
        image: req.body.image,
        num_player: req.body.num_player,
        limit_player: req.body.limit_player,
        regular_price: req.body.regular_price,
        additional_price: req.body.additional_price,
        type_id: type_object.id,
        description: req.body.description
        })
      
      res.sendStatus(200);
  })

    /**
 * Getting all events' information needed by homepage.
 * @param {integer} page 	Which page users are navigating
 * @returns {JSON}
 */
app.use("/event/all/page", async (req, res) => {
  const page = req.body.page;
  const offset = (page - 1) * 20;
    res.send(await event.findAll({
      order: [
        ['id', 'desc']
      ],
      limit: 20,
      offset: offset,
      attributes: ['id', 'title', 'image', 'num_player', 'regular_price', 'additional_price', 'limit_player', 'description']
    })) 
})

  /**
 * Getting events' information needed by homepage according to pages.
 * @param {integer} page 	Which page users are navigating
 * @returns {JSON}
 */
app.use("/event/all", async (req, res) => {
    res.send(await event.findAll({
      attributes: ['id', 'title', 'image', 'num_player', 'regular_price', 'additional_price', 'limit_player', 'description']
    })) 
})

  /**
 * Getting detailed information of specific event.
 * @param {integer} id 	The id of specific event stored in database
 * @returns {JSON}
 */
app.use("/event/info", async (req, res) => {
  if (!req.body.id) {
    return res.status(400).send('Event id missing')
  }
    const event_id = req.body.id;
    const event_object = await event.findOne({
        where: {
            id: event_id
        }
    })
    res.send(event_object);
})

/**
 * Getting all events' information needed by homepage of specific company
 * @param {Header} accessToken 
 * @returns {JSON} 
 */
app.use("/event/company/all", authenticateToken, async(req, res) => {
    const company_username = req.user;
    const company_user = await company.findOne({
        where: {
            company_username: company_username
        }
    });

    const events = await event.findAll({
      where: {
        company_id: company_user.id
      }
    })
    res.send(events);
});

/**
 * Getting all events' information following same event type
 * @param {string} event_type The type of events needed.
 * @returns {JSON} 
 */
app.use("/event/type/all", async(req, res) => {
  if (!req.body.event_type) {
    res.status(400).send('event_type missing');
  }
  const type_object = await type.findOne({
    where: {
      type: req.body.event_type
    }
  });

  if (!type_object) {
    return res.status(400).send('No such type');
  }

  const events = await event.findAll({
    where: {
      type_id: type_object.id
    }
  })

  res.send(events);
})
}