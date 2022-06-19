export interface RawUser {
  username: string,
  age: number,
  hobbies: string[]
}

export interface User extends RawUser {
  userId: string,
}
