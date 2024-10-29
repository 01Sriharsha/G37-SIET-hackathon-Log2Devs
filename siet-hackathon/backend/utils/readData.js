import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'mandi.json');
function generateData(){
fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) throw err;
    const resultdata=JSON.parse(data)
});
}
export default generateData
