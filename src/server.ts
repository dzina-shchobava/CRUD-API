import http from "http";
import { getUsers, getUser } from "./controllers/get.js";
import { postUser } from "./controllers/post.js";
import { putUser } from "./controllers/put.js";
import { deleteUser } from "./controllers/delete.js";
import 'dotenv/config';

const PORT = process.env.PORT;

http.createServer(async (request, response) => {

  if (request.url === "/api/users") {
    switch (request.method) {

      case "GET": await getUsers(request, response); break;

      case "POST": await postUser(request, response); break;
    }
  } else if ((request.url as string).match(/\/api\/users\/(\w)/)) {

    switch (request.method) {

      case "GET": {
        const id = (request.url as string).split("/")[3];
        await getUser(request, response, id);
        break;
      }

      case "PUT": {
        const id = (request.url as string).split("/")[3];
        await putUser(request, response, id);
        break;
      }

      case "DELETE": {
        const id = (request.url as string).split("/")[3];
        await deleteUser(request, response, id);
        break;
      }
    }
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Route not found" }));
  }

})
  .listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
