import { IncomingMessage, ServerResponse } from "http";
import { updateUser, findUserById } from "../models/usersModel.js";
import { getPostData } from "../utils/getPostData.js";
import { User } from "../utils/interfaces.js";
import { checkId } from "../utils/checkId.js";

export const putUser = async (request: IncomingMessage, response: ServerResponse, id: string) => {

    if (!checkId(id)) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: `UserId=${id} is invalid (not uuid)` }));
      return;
    }

    const user = await findUserById(id);
    if (user) {
      const body = await getPostData(request);

      const { username, age, hobbies } = JSON.parse(body as string);
      const newHobbies = hobbies ? hobbies : (user as User).hobbies;

      if (username && typeof username !== "string") {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "The 'username' field must be string" }));
        return;
      }

      if (age && typeof age !== "number") {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "The 'age' field must be number" }));
        return;
      }

      if (hobbies && !Array.isArray(hobbies)) {
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "The 'hobbies' field must be an array of strings or empty array" }));
        return;
      }

      const updatedUserData = {
        username: username || (user as User).username,
        age: age || (user as User).age,
        hobbies: newHobbies,
      }

        const updatedUser = await updateUser(id, updatedUserData);
        response.writeHead(200,{ 'Content-Type': 'application/json' });
        response.end(JSON.stringify(updatedUser));

    } else {
      response.writeHead(404,{ 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: `User with id=${id} not found`}));
    }

}
