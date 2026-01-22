import { homedir } from 'os';
import { dirname, join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), './weather-cli/weather-data.json');

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
}

const isExist = async ( path ) => {
    try {
        await promises.stat(path);
        return true;
    } catch ( err ) {
        return false;
    }
};

const saveKeyValue = async ( key, value ) => {
    let data = {};
    if ( await isExist(filePath) ) {
        const targetFile = await promises.readFile(filePath);
        data = JSON.parse(targetFile);
    } else if ( !await isExist(dirname(filePath)) ) {
        await promises.mkdir(dirname(filePath));
    }

    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async ( key ) => {
    if ( await isExist(filePath) ) {
        const targetFile = await promises.readFile(filePath);
        const data = JSON.parse(targetFile);

        return data[key];
    }
    return undefined;
}

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };

