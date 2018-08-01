var config = {
    development: {
        database: {
            url: 'localhost',
            username: 'kangjinyong',
            pwd: 'playground',
            port: '27017',
            db: 'Playground'
        },
        google: {
            apiKey: 'AIzaSyCr7Ce69pSDnNIfS3IPjICBcU8nwEWOCGw',
            clientId: '937174194034-diuttf5no4kktme3f6q9aviru381a39m.apps.googleusercontent.com',
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
        google: {
            apiKey: 'AIzaSyCr7Ce69pSDnNIfS3IPjICBcU8nwEWOCGw',
            clientId: '937174194034-diuttf5no4kktme3f6q9aviru381a39m.apps.googleusercontent.com',
        }
    }
};

module.exports = config;