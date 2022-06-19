import { IncomingMessage, ServerResponse } from "http";
import { createUser } from "../models/usersModel.js";
import { getPostData } from "../utils/getPostData.js";

export const postUser = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const body = await getPostData(request);

    const { username, age, hobbies } = JSON.parse(body as string);

    const user = {
      username,
      age,
      hobbies: [
        ...hobbies
      ]
    }

    if (username && age ) {
      const newUsers = await createUser(user);
      response.writeHead(201,{ 'Content-Type': 'application/json' });
      response.end(JSON.stringify(newUsers));
    } else {
      response.writeHead(400,{ 'Content-Type': 'application/json' });
      response.end({ message: 'Request does not contain required fields' });
    }
  } catch (e) {
    console.log(e);
  }
}
