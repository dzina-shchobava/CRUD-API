import { users } from '../data/users.js';
import { User } from "../utils/interfaces";

const findUsers = () => {
  return new Promise((resolve) => {
    resolve(users);
  })
}

const findUserById = (id: string) => {
  return new Promise((resolve) => {
    const user = users.find((item: User) => item.userId === id );
    resolve(user);
  })
}

export { findUsers, findUserById };
