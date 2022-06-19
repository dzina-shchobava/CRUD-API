import { IncomingMessage, ServerResponse } from "http";
import { updateUser, findUserById } from "../models/usersModel.js";
import { getPostData } from "../utils/getPostData.js";
import { User } from "../utils/interfaces.js";

export const putUser = async (request: IncomingMessage, response: ServerResponse, id: string) => {
  try {
    const user = await findUserById(id);

    if (user) {
      const body = await getPostData(request);

      const { username, age, hobbies } = JSON.parse(body as string);

      const updatedUserData = {
        username: username || (user as User).username,
        age: age || (user as User).age,
        hobbies: [
          ...hobbies
        ] || (user as User).hobbies
      }

        const updatedUser = await updateUser(id, updatedUserData);
        response.writeHead(200,{ 'Content-Type': 'application/json' });
        response.end(JSON.stringify(updatedUser));

    } else {
      response.writeHead(404,{ 'Content-Type': 'application/json' });
      response.end(JSON.stringify(`User with id=${id} not found`));
    }


  } catch (e) {
    console.log(e);
  }
}
