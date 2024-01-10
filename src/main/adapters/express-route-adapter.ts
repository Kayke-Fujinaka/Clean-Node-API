import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response
} from 'express'

import {
  type Controller,
  type HttpRequest
} from '../../presentation/protocols'

export const adaptRoute = (controller: Controller): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    controller
      .handle(httpRequest)
      .then((httpResponse) => {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      })
      .catch(console.error)
  }
}
