import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = ( err ) => {
    console.log(`${chalk.bgRed(' ERROR ')} ${err}`);
};

const printSuccess = ( message ) => {
    console.log(`${chalk.bgGreen(' SUCCESS ')} ${message}`);
};

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        Without parameters - show weather
        -s [CITY] - setup city
        -t [TOKEN] - setup token
        -h - show help
        `
    );
};

const printWeather = ( sourceResponse ) => {
    if ( !sourceResponse ) {
        printError('Weather forecast was not found');
        return;
    }
    const { location, current } = sourceResponse;
    const { name, localtime } = location;
    const {
        wind_kph,
        wind_degree,
        wind_dir,
        pressure_mb,
        humidity,
        cloud,
        heatindex_c,
        feelslike_c,
        gust_kph
    } = current;

    const forecastMessage =
        dedent`
            ${chalk.bgBlueBright(`Weather forecast for ${name} at ${localtime}:`)}
            temperature: ${heatindex_c} C (feels like ${feelslike_c} C),
            wind: ${wind_kph} km/h,
            wind direction: ${wind_degree} ${wind_dir},
            wind gusts: ${gust_kph} km/h,
            atmosphere pressure: ${pressure_mb} mbar,
            humidity: ${humidity} %,
            cloud: ${cloud} %,
        `;
    console.log(forecastMessage);
};

export { printError, printSuccess, printHelp, printWeather };
