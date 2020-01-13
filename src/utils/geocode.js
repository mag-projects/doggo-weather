const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWlndWVsMzA0MiIsImEiOiJjazQzcTZ1bmMwYWd1M2txeW1pYXFxa3k4In0.pcOQNge1hrvmiBrSh57HPg`;
    request({url, json: true}, (err, {body}) => {
        if (err) callback(`Mapbox services could not be reached, please check your internet connection!`, undefined);
        else if (body.features.length === 0) callback(`Location could not be found, please try again!`, undefined);
        else callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                name: body.features[0].place_name
            });
    });
};

module.exports = geocode;
