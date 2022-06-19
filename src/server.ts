import http from 'http';
import { getUsers, getUser } from "./controllers/get.js";
import { postUser } from "./controllers/post.js";
import { putUser } from "./controllers/put.js";
import { deleteUser } from "./controllers/delete.js";

const PORT = process.env.PORT || 5000;

http.createServer(async (request, response) => {

  switch (request.method) {
    case "GET": {
      if (request.url === '/api/users') {
        await getUsers(request, response);
      } else if ((request.url as string).match(/\/api\/users\/(\w)/)) {
        const id = (request.url as string).split('/')[3];
        await getUser(request, response, id);
      }
    } break;

    case "POST":
      if (request.url === '/api/users') {
        postUser(request, response);
      }
      break;

    case "PUT":
      if ((request.url as string).match(/\/api\/users\/(\w)/)) {
        const id = (request.url as string).split('/')[3];
        await putUser(request, response, id);
      }
      break;

    case "DELETE":
      if ((request.url as string).match(/\/api\/users\/(\w)/)) {
        const id = (request.url as string).split('/')[3];
        await deleteUser(request, response, id);
      }
      break;

    default:
      response.writeHead(404,{ 'Content-Type': 'application/json' });
      response.end(JSON.stringify({message: 'Route not found'}))
  }

})
.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
});
