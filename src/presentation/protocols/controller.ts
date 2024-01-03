import { type HttpRequest, type HttpRespose } from './http'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpRespose>
}
