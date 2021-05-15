const request = require("postman-request");

const geocode = (adress, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(adress) +
        ".json?access_token=pk.eyJ1IjoibWFub3M4OTkxIiwiYSI6ImNrbjdrbHc2dzBoNGoybnA0dHozcGJoZmgifQ.uRyzmwBbj1WK-grX0r4P7Q&query=&units=f";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services.", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined);
        } else {
            const lat = body.features[0].center[1];
            const lon = body.features[0].center[0];
            const loc = body.features[0].place_name;
            callback(undefined, { lon: lon, lat: lat, loc: loc });
        }
    });
};

module.exports = geocode;
