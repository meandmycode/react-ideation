/* global process */
import { writeFileSync } from 'fs';
import minimist from 'minimist';
import webpack from 'webpack';

import configure from '../webpack.config';

const args = minimist(process.argv.slice(2));

const outputPath = args['out-dir'];

const appConfig = {
    api: process.env.API_BASE_URL,
};

const config = configure({ production: true, outputPath, appConfig });

const statsOptions = {
    colors: true,
};

webpack(config, (err, stats) => {

    const hasErrors = err != null || (stats && stats.hasErrors());

    if (err) {

        console.error(err.stack || err);

        if (err.details) console.error(err.details);

    }

    if (stats) process.stdout.write(stats.toString(statsOptions));

    if (hasErrors) {

        console.log('\n');
        console.log('✖️  Web application build failed!');
        console.log('\n');

        return process.exit(1);

    }

    console.log('\n');
    console.log('🌟  Web application build successful!');
    console.log('\n');

    writeFileSync('stats.json', JSON.stringify(stats.toJson()), null, 2);

});
