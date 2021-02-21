const PointsOfInterest = require('./app/controllers/poi');

module.exports = [{ method: 'GET', path: '/', config: PointsOfInterest.index }];




const Donations = require('./app/controllers/poi');

module.exports = [
    { method: 'GET', path: '/', config: Donations.index },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public',
            },
        },
    },
];
