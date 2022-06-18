import http from 'http';
import { readFile } from 'fs/promises';

const usersInfo = (await readFile(new URL('./data/users.json', import.meta.url)));

const PORT = process.env.PORT || 5000;

http.createServer((req, res) => {
   res.writeHead(200,{ 'Content-Type': 'application/json' });
   res.end((usersInfo));
})
.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
});
