# CRUD-API

### Description

Simple CRUD API using in-memory database underneath.

### Technical description

In project use only:
- nodemon, 
- dotenv, 
- typescript, 
- ts-node, 
- eslint and its plugins, 
- prettier, 
- uuid, @types/uuid,
- @types/node

### How to install the project
1. Open Git Bash.
2. Change the current working directory to the location where you want the cloned directory.
3. Type command
> `git clone git@github.com:dina-shchobova/CRUD-API.git`

**or**
> `git clone https://github.com/dina-shchobova/CRUD-API.git`

### How to run the project

There are two modes of running application (development and production).  

**Production.** The build process starts and then runs the bundle file.  
To run this mod use the command
> `npm run start:prod` 

**Development.** The application is run using nodemon.  
To run this mod use the commands:

- In one terminal run the command:  
> `npm run start:dev`
- And then in another terminal run the command:
> `npm run compile`

### Usage

The PUT request replaces only the specified fields of the object, the rest remain unchanged
