import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response
} from 'express'

import {
  type Controller,
  type HttpRequest
} from '../../../presentation/protocols'

export const adaptRoute = (controller: Controller): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    controller
      .handle(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.statusCode === 200) {
          res.status(httpResponse.statusCode).json(httpResponse.body)
        } else {
          res
            .status(httpResponse.statusCode)
            .json({ error: httpResponse.body.message })
        }
      })
      .catch(console.error)
  }
}
