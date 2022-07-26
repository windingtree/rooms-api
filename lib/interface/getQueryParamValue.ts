import { Request } from 'express'

import { CONSTANTS } from '../common/constants'
import { CError } from '../common/tools'

const { BAD_REQUEST }  = CONSTANTS.HTTP_STATUS

function getQueryParamValue(request: Request, queryParamName: string): string {
  if (typeof request.params === 'undefined') {
    throw new CError(BAD_REQUEST, `Request query params are not defined.`)
  }

  const queryParamValue = request.params[queryParamName]

  if (
    (typeof queryParamValue !== 'string') ||
    (queryParamValue.length === 0)
  ) {
    throw new CError(BAD_REQUEST, `Query param '${queryParamName}' is not set.`)
  }

  return queryParamValue
}

export { getQueryParamValue }
