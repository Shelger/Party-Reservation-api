require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 4000;

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

require("./routes/authserver")(app);
require("./routes/company")(app);
require("./routes/event")(app);
require("./routes/type")(app);


app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}!`);
});
