const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecase");

const app = express(); // creates an instance of express
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public"); // Sets up the html files express will access
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs"); // Settings up express to read HBS files
app.set("views", viewsPath); // Setting up location for HBS files
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath)); // Static directory to serve



// Render each HBS page and handle 404 errors
app.get("", (req, res) => {
    res.render("index", {
        title: "Doggo Weather Corp!"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "Welcome to the about section!",
        message: "The weather is brought to you by the following 3 best weathermen"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Welcome to the help section!",
        message: "Here you will find the many useful help articles and a FAQ's section"
    });
});

// Display weather info in JSON format
app.get("/weather", (req, res) => {
    if (!req.query.address) return res.send({error: "Please enter a location to search!"});

    geocode(req.query.address, (err, {lat, long, name}) => {
        if (err) return res.send({error: err});

        forecast(lat, long, (err, forecastData) => {
            if (err) return res.send({error: err});
            res.send({
                location: name,
                weather: forecastData,
            });
        });
    });
});

app.get("*", (req, res) => {
    res.render("404-error", {
        title: "404 Error!"
    });
});

// Setup port to serve express server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
