var config = {
    development: {
        database: {
            url: 'localhost',
            username: 'kangjinyong',
            pwd: 'playground',
            port: '27017',
            db: 'Playground'
        },
        server: {
            host: '127.0.0.1',
            port: '8080'
        }
    },
    production: {
        database: {
            url: 'localhost',
            username: 'kangjinyong',
            pwd: 'playground',
            port: '27017',
            db: 'Playground'
        },
        server: {
            host: '127.0.0.1',
            port: '8080'
        }
    }
};

module.exports = config;