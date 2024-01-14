import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import {
  type Controller,
  type HttpRequest,
  type HttpResponse
} from '../../protocols'

export class LoginController implements Controller {
  //   constructor() {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return await new Promise((resolve) => {
      resolve(badRequest(new MissingParamError('email')))
    })
  }
}
