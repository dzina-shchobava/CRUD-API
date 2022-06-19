import { users } from '../data/users.js';
import { RawUser, User } from "../utils/interfaces";
import { v4 as uuidv4 } from 'uuid';
import { writeDataToFile } from '../utils/writeData.js';

const findUsers = () => {
  return new Promise<User[]>((resolve) => {
    resolve(users);
  })
}

const findUserById = (id: string) => {
  return new Promise<User | undefined>((resolve) => {
    const user = users.find((item: User) => item.userId === id );
    resolve(user);
  })
}

const createUser = (user: RawUser) => {
  return new Promise<User>((resolve) => {
    const newUser = { userId: uuidv4(), ...user};
    users.push(newUser);
    console.log(users);
    const newContent = `export const users = ${JSON.stringify(users)}`;
    writeDataToFile(newContent);
    resolve(newUser);
  })
}

const updateUser = (id: string, user: RawUser) => {
  return new Promise<User>((resolve) => {
    const updatedUserIndex = users.findIndex((item: User) => item.userId === id );
    users[updatedUserIndex] = { userId: id, ...user};
    const updatedContent = `export const users = ${JSON.stringify(users)}`;
    writeDataToFile(updatedContent);
    resolve(users[updatedUserIndex]);
  })
}

const removeUser = (id: string) => {
  return new Promise<void>((resolve) => {
    const updatedUserIndex = users.findIndex((item: User) => item.userId === id );
    users.splice(updatedUserIndex, 1)
    const updatedContent = `export const users = ${JSON.stringify(users)}`;
    writeDataToFile(updatedContent);
    resolve();
  })
}

export { findUsers, findUserById, createUser, updateUser, removeUser };
