import { IncomingMessage, ServerResponse } from "http";
import { findUserById, removeUser } from "../models/usersModel.js";

export const deleteUser = async (request: IncomingMessage, response: ServerResponse, id: string) => {
  try {
    const user = await findUserById(id);

    if (user) {
      await removeUser(id);

      response.writeHead(200,{ 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: "User was deleted" }));

    } else {
      response.writeHead(404,{ 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: `User with id=${id} not found` }));
    }


  } catch (e) {
    console.log(e);
  }
}
