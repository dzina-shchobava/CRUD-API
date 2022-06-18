import { IncomingMessage, ServerResponse } from 'http';
import { findUserById, findUsers } from '../models/usersModel.js';

export const getUsers = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const users = await findUsers();
    response.writeHead(200,{ 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users));
  } catch (e) {
    console.log(e);
  }
}

export const getUser = async (request: IncomingMessage, response: ServerResponse, id: string) => {
  try {
    const user = await findUserById(id);
    console.log(user);

    if (user) {
      response.writeHead(200,{ 'Content-Type': 'application/json' });
      response.end(JSON.stringify(user));
    } else {
      response.writeHead(404,{ 'Content-Type': 'application/json' });
      response.end(JSON.stringify(`User with id=${id} not found`));
    }


  } catch (e) {
    console.log(e);
  }
}
