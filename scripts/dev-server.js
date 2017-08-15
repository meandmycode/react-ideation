/* global process */
/* eslint-disable no-console */
import express from 'express';
import { validate } from 'jsonschema';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import jsonServer from 'json-server';

import configure from '../webpack.config';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 9001;

const appConfig = {
    api: '/api',
};

const IdeaSchema = {
    type: 'object',
    properties: {
        title: {
            type: 'string',
            maxLength: 18,
        },
        body: {
            type: 'string',
            maxLength: 140,
        },
    },
};

const config = configure({ appConfig });

const app = express();
const compiler = webpack(config);

app.use('/api', jsonServer.bodyParser);

app.use('/api/ideas', (req, res, next) => {

    if (req.method === 'POST' || req.method === 'PUT') {

        const { errors } = validate(req.body, IdeaSchema);

        if (errors.length) return res.sendStatus(400);

    }

    next();

});

app.use('/api', (req, res, next) => {

    if (req.method === 'POST') {
        req.body.createdAt = new Date();
    }

    next();

});

app.use('/api', (req, res, next) => {

    if (req.method === 'POST' || req.method === 'PUT') {
        req.body.modifiedAt = new Date();
    }

    next();

});

app.use('/api', jsonServer.router('debug-db.json'));

app.use(webpackDevMiddleware(compiler, {
    stats: {
        colors: true,
    },
}));

app.use((req, res) => {

    req.url = '/index.html';

    app(req, res);

});

app.listen(port, host, err => {

    if (err) {
        return console.log(err);
    }

    console.log(`🚀  Web application is now running at http://${host}:${port}`);
    console.log('');

});
