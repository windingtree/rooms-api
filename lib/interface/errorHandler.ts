import { Response } from 'express'

import { CONSTANTS } from '../common/constants'
import { CError } from '../common/tools'

const { HTTP_STATUS, HTTP_STATUS_CODE } = CONSTANTS
const { INTERNAL_SERVER_ERROR } = HTTP_STATUS

function stdErr(err: unknown): void {
  console.log('-------')
  console.error(err)
  console.log('-------')
}

function errorHandler(response: Response, error: unknown): void {
  let errorCode: number
  let errorMessage: string
  let originalError: unknown|null = null

  if (error instanceof CError) {
    errorCode = HTTP_STATUS_CODE[error.statusCode]
    errorMessage = error.msg
    originalError = error.originalError
  } else {
    errorCode = HTTP_STATUS_CODE[INTERNAL_SERVER_ERROR]
    errorMessage = 'Unhandled error occurred.'
  }

  stdErr(error)
  if (originalError !== null) {
    stdErr(originalError)
  }

  response.status(errorCode).json({ err: errorMessage })
}

export { errorHandler }
