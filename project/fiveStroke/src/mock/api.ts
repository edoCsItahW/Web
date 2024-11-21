import fs from 'fs';
import path from 'path';


const rootDir = "C:/Users/Lenovo/Desktop/charRoot"


function choice<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }


export default [
    {
        url: '/api/img',
        method: 'GET',
        response: () => {
            const subDir = choice(fs.readdirSync(rootDir));
            const imgPath = path.join(rootDir, subDir, choice(fs.readdirSync(path.join(rootDir, subDir))));
            return {
                code: 200,
                msg: 'ok',
                headers: {
                    'Content-Type': 'image/png',
                    'Content-Disposition': 'inline; filename="image.png"',
                    'Set-Cookie': `Custom-Message=${subDir};`
                },
                data: new Blob([fs.readFileSync(imgPath)], { type: 'image/png' })
            }
        }
    }
]
