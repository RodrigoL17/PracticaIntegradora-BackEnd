export default class CustomError {
  static createCustomError({ name = "Error", cause, message }) {
    const newError = new Error(message,  {cause} );
    newError.name = name;
    throw newError;
  }
}

// export default class CustomError extends Error {
//   constructor(name, message, cause) {
//     super(message);
//     this.name = name;
//     this.cause = cause;
//   }
// }