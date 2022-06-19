import { IncomingMessage, ServerResponse } from "http";
import { findUserById, findUsers } from "../models/usersModel.js";
import { checkId } from "../utils/checkId.js";

export const getUsers = async (request: IncomingMessage, response: ServerResponse) => {

  const users = await findUsers();
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(users));

};

export const getUser = async (request: IncomingMessage, response: ServerResponse, id: string) => {

  if (!checkId(id)) {
    response.writeHead(400, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: `UserId=${id} is invalid (not uuid)` }));
    return;
  }

  const user = await findUserById(id);
  if (user) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(user));
  } else {

    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: `User with id=${id} not found` }));
  }

};
