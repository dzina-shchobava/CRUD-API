import fs from 'fs';
import path from "path";

const writeDataToFile = (content: string) => {

  const projectDir = path.resolve(path.dirname(''));
  const filename = path.join(projectDir, 'src', 'data', 'users.ts');

  const writeStream = fs.createWriteStream(filename);
  writeStream.write(content);
  writeStream.on('error', (error) => {
    console.log(error);
  })
  writeStream.end();
}

export { writeDataToFile };
