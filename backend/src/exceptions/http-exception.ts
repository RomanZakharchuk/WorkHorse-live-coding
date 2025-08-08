export class HttpException extends Error {
    status: number;
    message: string;
 
    constructor(status: number, message: string) {
       super(message);
       this.status = status;
       this.message = message;
 
       // Make message enumerable
       Object.defineProperty(this, 'message', {
          value: message,
          enumerable: true
       });
    }
 }
 