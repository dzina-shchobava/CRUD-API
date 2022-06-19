import { users } from '../data/users.js';
import { RawUser, User } from "../utils/interfaces";
import { v4 as uuidv4 } from 'uuid';

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

const createUser = (user: RawUser) => {
  return new Promise((resolve) => {
    const newUser = { userId: uuidv4(), ...user};
    users.push(newUser);
    resolve(newUser);
  })
}

const updateUser = (id: string, user: RawUser) => {
  return new Promise((resolve) => {
    const updatedUserIndex = users.findIndex((item: User) => item.userId === id );
    users[updatedUserIndex] = { userId: id, ...user};
    resolve(users[updatedUserIndex]);
  })
}

const removeUser = (id: string) => {
  return new Promise<void>((resolve) => {
    const updatedUserIndex = users.findIndex((item: User) => item.userId === id );
    users.splice(updatedUserIndex, 1)
    resolve();
  })
}

export { findUsers, findUserById, createUser, updateUser, removeUser };
