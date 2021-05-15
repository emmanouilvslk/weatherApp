const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsDirectoryPath);
app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsDirectoryPath);

app.get("", (req, res) => {
    res.render("index", {
        title: "Home",
        name: "Manos",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        data: "Lorem ipsum",
        name: "Manos",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        data: "Lorem ipsum help",
        name: "Manos",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address",
        });
    }
    geocode(req.query.address, (error, { lat, lon, loc } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(lat, lon, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location: loc,
                forecastData: forecastData,
                address: req.query.address,
            });
        });
    });
});

app.get("/weather/data", (req, res) => {
    res.send({
        forecast: "Sunny",
        location: "Bergen",
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Manos",
        errorMessage: "Help article not found.",
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }

    console.log(req);
    res.send({
        products: [],
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Manos",
        errorMessage: "Page not found.",
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});
