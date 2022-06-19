import { IncomingMessage, ServerResponse } from "http";
import { createUser } from "../models/usersModel.js";
import { getPostData } from "../utils/getPostData.js";

export const postUser = async (request: IncomingMessage, response: ServerResponse) => {

    const body = await getPostData(request);

    const { username, age, hobbies } = JSON.parse(body as string);

    if (!hobbies || !username || !age) {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Request does not contain required fields" }));
      return;
    }

    if (typeof username !== "string") {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "The 'username' field must be string" }));
      return;
    }

    if (typeof age !== "number") {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "The 'age' field must be number" }));
      return;
    }

    if (!Array.isArray(hobbies)) {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "The 'hobbies' field must be an array of strings or empty array" }));
      return;
    }

    const user = {
      username,
      age,
      hobbies: [
        ...hobbies
      ]
    };

    const newUsers = await createUser(user);
    response.writeHead(201, { "Content-Type": "application/json" });
    response.end(JSON.stringify(newUsers));

};
