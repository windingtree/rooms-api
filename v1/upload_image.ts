import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../lib/interface'
import { postUploadImagePayloadValidator } from '../lib/interface/validators'

import { authenticateClientAppRequest } from '../lib/app/auth/client_app'
import { uploadImageToS3 } from '../lib/app/upload_image'

import { IProfile, IUploadImage, IPostUploadImagePayload } from '../lib/common/types'

async function POST(request: Request): Promise<IUploadImage> {
  const requester: IProfile = await authenticateClientAppRequest(request)

  await authorizeRequest(requester.role, { method: 'POST', route: 'upload_image' })

  const payload: IPostUploadImagePayload = await postUploadImagePayloadValidator(request)

  return await uploadImageToS3(requester, payload)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
