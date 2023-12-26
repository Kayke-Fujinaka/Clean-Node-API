import { MissingParamError } from '../errors/missing-param-error'
import { type HttpRequest, type HttpRespose } from '../protocols/http'

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpRespose {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
  }
}
