import { Request } from 'express'

import { decodeClientAppToken, authenticateClientAppUser } from '../../../app/auth/client_app'

import { getBearerToken } from '../../../common/tools'
import { IProfileAuthData, IProfile } from '../../../common/types'

async function authenticateClientAppRequest(request: Request): Promise<IProfile> {
  const bearerToken: string = await getBearerToken(request)
  const decodedToken: IProfileAuthData = await decodeClientAppToken(bearerToken)
  const { email, oneTimePassword, sessionToken } = { ...decodedToken }

  const profile: IProfile = await authenticateClientAppUser({ email, oneTimePassword, sessionToken })

  return profile
}

export { authenticateClientAppRequest }
