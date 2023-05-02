export default class CustomError {
  static createCustomError({ name = "Error", cuase, message}) {
    const newError = new Error( message,{cuase})
    newError.name = name
    throw newError
  }
}
