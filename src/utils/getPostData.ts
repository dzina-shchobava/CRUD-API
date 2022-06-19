import { IncomingMessage } from "http";

const getPostData = (request: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      request.on('data', (chunk) => {
        body += chunk.toString();
      });

      request.on('end',() => {
        resolve(body);
      });

    } catch (e) {
      reject(e);
    }
  })
}

export { getPostData };
