import { Request, Response } from 'express'

import { genericApiMethodHandler } from '../../_lib/interface'

import { authenticateOrgIdRequest } from '../../_lib/app/auth/orgid'
import { offerSearch } from '../../_lib/app/orgid'

import { IOfferSearchResults, IOrgDetails } from '../../_lib/common/types'

async function POST(request: Request): Promise<IOfferSearchResults> {
  const requester: IOrgDetails = await authenticateOrgIdRequest(request)

  return await offerSearch(request, requester)
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { POST })
}
