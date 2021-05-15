const request = require("postman-request");

const forecast = (lat, lon, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=744ff3d172dd2bf905a070b9e0432367&query=" +
        lat +
        "," +
        lon +
        "&units=f";

    const options = {
        url,
        json: true,
    };

    request(options, (error, { body }) => {
        if (error) {
            callback("Network problems", undefined);
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0]);
        }
    });
};

module.exports = forecast;
