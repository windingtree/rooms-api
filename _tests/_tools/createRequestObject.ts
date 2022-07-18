import { Request } from 'express'
import { IncomingMessage } from 'http'
import * as net from 'net'

import { IRequestBody } from '../../_tests/_types'

function createRequestObject(body: IRequestBody): Request {
  const socket = new net.Socket()
  const incomingMessage = new IncomingMessage(socket)

  const request = Object.assign({}, incomingMessage, {
    query: {},
    cookies: {},
    body,
  })

  return request as Request
}

export { createRequestObject }
