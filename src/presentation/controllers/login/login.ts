import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '../../helpers/http/http-helper'
import {
  type Authentication,
  type Controller,
  type HttpRequest,
  type HttpResponse,
  type Validation
} from './login-protocols'

export class LoginController implements Controller {
  private readonly authentication: Authentication
  private readonly validation: Validation

  constructor(authentication: Authentication, validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body

      const acessToken = await this.authentication.auth({ email, password })
      if (!acessToken) {
        return unauthorized()
      }

      return ok({ acessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
