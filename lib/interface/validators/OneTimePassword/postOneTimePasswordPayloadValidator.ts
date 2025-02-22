import { Request } from 'express'

import { validateRequiredString } from '../../../interface/validators/_helpers'

import { CONSTANTS } from '../../../common/constants'
import { CError } from '../../../common/tools'
import { IOneTimePasswordPayload } from '../../../common/types'

const { BAD_REQUEST } = CONSTANTS.HTTP_STATUS

async function postOneTimePasswordPayloadValidator(request: Request): Promise<IOneTimePasswordPayload> {
  if (!request.body) {
    throw new CError(BAD_REQUEST, 'Must provide a valid body with request.')
  }

  const payload: IOneTimePasswordPayload = {
    email: '',
    sessionToken: '',
  }

  const ALLOWED_PROPS: Array<keyof IOneTimePasswordPayload> = [
    'email',
    'sessionToken',
  ]

  for (const [key] of Object.entries(request.body)) {
    if (!ALLOWED_PROPS.includes(key as keyof IOneTimePasswordPayload)) {
      throw new CError(BAD_REQUEST, `Property '${key}' in POST 'login' request is unexpected.`)
    }
  }

  const email = request.body.email
  await validateRequiredString('email', email)
  payload.email = email

  const sessionToken = request.body.sessionToken
  await validateRequiredString('sessionToken', sessionToken)
  payload.sessionToken = sessionToken

  return payload
}

export { postOneTimePasswordPayloadValidator }
