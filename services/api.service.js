import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
import axios from "axios";

const getWeather = async () => {
    const key = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);

    if ( !key ) {
        throw new Error('Token not found. Please provide a valid token by use of the call option -t [API_KEY]');
    }

    if ( !city ) {
        throw new Error('City not found. Please provide a valid city by use of the call option -s [CITY]');
    }

    const { data } = await axios.get('http://api.weatherapi.com/v1/current.json', {
        params: {
            q: city,
            key: key,
            aqi: 'no'
        }
    });

    return data;
}

export { getWeather };
