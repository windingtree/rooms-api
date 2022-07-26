import { Request, Response } from 'express'

import { genericApiMethodHandler } from '../../lib/interface'
import { postCreateOrderPayloadValidator } from '../../lib/interface/validators'

import { authenticateOrgIdRequest } from '../../lib/app/auth/orgid'
import { createOrder } from '../../lib/app/orgid'

import { IOrgDetails, IPostCreateOrderPayload, ICreateOrderResult } from '../../lib/common/types'

async function POST(request: Request): Promise<ICreateOrderResult> {
  const requester: IOrgDetails = await authenticateOrgIdRequest(request)

  const payload: IPostCreateOrderPayload = await postCreateOrderPayloadValidator(request)

  return await createOrder(requester, payload)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
