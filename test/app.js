const express = require('express');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(
    cookieSession({ maxAge: 2592000000, keys: ['alskfhlsahrtjklal345uwrw'] })
);

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send({ hello: 'world' });
});

app.get('/set-cookie', (req, res) => {
    res.cookie(
        'test-cookie-1',
        'session=eyJwYXNzcG9ydCI6eyJ1c2VyIjoiMTIzNCJ9fQ==; 12 May 2018 12:35:31 GMT'
    );
    res.cookie(
        'test-cookie-2',
        'session.sig=HBY87i6rkzCPNIZ46ZWW1bz3bno; 12 May 2018 12:35:31 GMT'
    );
    res.send({ status: 'ok' });
});

app.get('/get-cookie', (req, res) => {
    res.send(req.cookies);
});

module.exports = app;
