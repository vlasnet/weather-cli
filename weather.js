#!/usr/bin/env node

import yargs from 'yargs-parser';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

const saveToken = async ( token ) => {
    if ( !token.length ) {
        printError('Please provide a valid token');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token is saved successfully!');
    } catch ( err ) {
        printError(`An error with message: ${err.message}`);
    }
}
const saveCity = async ( city ) => {
    if ( !city.length ) {
        printError('Please provide a valid city');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City is saved successfully!');
    } catch ( err ) {
        printError(`An error with message: ${err.message}`);
    }
}

const getForecast = async () => {
    try {
        const weather = await getWeather();
        printWeather(weather);
    } catch ( err ) {
        if ( err?.response?.status === 404 || err?.response?.status === 400 ) {
            printError('City not found')
        } else if ( err?.response?.status === 401 ) {
            printError('Invalid token')
        } else {
            printError(err.message);
        }
    }
};

const initCLI = async () => {
    const args = yargs(process.argv.slice(2));

    if ( args.h ) {
        return printHelp();
    }
    if ( args.s ) {
        saveCity(args.s)
    }
    if ( args.t ) {
        await saveToken(args.t);
    }

    await getForecast();
}

initCLI();
