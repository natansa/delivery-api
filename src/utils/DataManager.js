import { promises as fs } from 'fs';

async function readJSONFile(filePath) {
    const data = await fs.readFile(filePath);
    return JSON.parse(data);
};

async function writeJSONFile(filePath, data) {
    const stringData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, stringData);
};

export default {
    readJSONFile,
    writeJSONFile
}