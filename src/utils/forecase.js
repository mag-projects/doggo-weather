const request = require("request");

const forecast = (coord1, coord2, callback) => {
    const url = `https://api.darksky.net/forecast/23473d3740d27d17ea4aa449b07f2944/${coord1},${coord2}`;
    request({url, json: true}, (err, {body}) => {
        if (err) callback(`Darksky services could not be reached at the moment, please check your internet connection!`, undefined);
        else if (body.error) callback(`Weatcher service is not available for this location!`, undefined);
        else callback(undefined, `${body.currently.summary} with a current temperature of ${body.currently.temperature} and a ${body.currently.precipProbability}% chance of rain`);
    });
};

module.exports = forecast;
