// need to be an absolute path of your machine
// console.log(__dirname);
// console.log(__filename);

/*
Path provides us a ton of great utilities for working with paths. This is done in a cross OS compatible way. 
*/
const path = require("path");

// with partials, it's gonna be really easy to create a header and reuse it w/o needing to copy markup between all the pages in your site
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
/*
what the express library exposes is just a single function
so express is actually a function as opposed to something like an object
and we call this function to create a new Express application: express()
*/
const express = require("express");

const app = express();

/*
Serve up the directory
1. app.use() customizes your server
2. express.static() takes the path to the directory we wanna serve up
*/
const publicDirPath = path.join(__dirname, "../public");
// if you dont want to use default path, config the path
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

/*
set() allows you to set a value for a given Express setting
when we're working with Express, it expects all of your views, i.e. handler bar templates, to live in a specific folder
*/
// Setup the views and handlebars engine location
app.set("views", viewsPath);
app.set("view engine", "hbs");

hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

/* 
configure what the server should do when someone tries to get the resource at a specific URL (route)
*/

// index.html has a special meaning when related to web severs, we can just go to the root of the site. This root route is actually not gonna run
// app.get("", (req, res) => {
//   // send sth back to the requester
//   res.send("<h1>Weather</h1>");
// });

app.get("", (req, res) => {
  // render() allows us to render one of our views
  res.render("index", {
    title: "Weather App",
    name: "Volk",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Volk",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Unknown",
    title: "Support ",
    name: "Volk",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }
  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ error: err });
    }
    forecast(latitude, longitude, (err, data) => {
      if (err) {
        return res.send({ error: err });
      }
      if (data) {
        return res.send({
          forecast: data.weather_descriptions,
          location,
          address: req.query.address,
        });
      }
    });
  });
});

app.get("/products", (req, res) => {
  // HTTP requests have a single request that goes to the server and a single response that comes back
  if (!req.query.search) {
    // remember to use 'return' to avoid sending response twice
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log();
  res.send();
});

// match anything that hasn't been matched so far
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 ",
    name: "Volk",
    msg: "Help articles not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 ",
    name: "Volk",
    msg: "404 Not Found",
  });
});

// To start the server up (single time)
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
