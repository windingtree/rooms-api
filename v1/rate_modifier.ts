import { Request, Response } from 'express'

import { genericApiMethodHandler, authorizeRequest } from '../lib/interface'
import { postRateModifierPayloadValidator } from '../lib/interface/validators'

import { authenticateClientAppRequest } from '../lib/app/auth/client_app'
import { createRateModifier } from '../lib/app/rate_modifier'

import { IProfile, IRateModifier, IPostRateModifierPayload } from '../lib/common/types'

async function POST(request: Request): Promise<IRateModifier> {
    const requester: IProfile = await authenticateClientAppRequest(request)

    await authorizeRequest(requester.role, { method: 'POST', route: 'room_type' })

    const payload: IPostRateModifierPayload = await postRateModifierPayloadValidator(request)

    return await createRateModifier(requester, payload)
}

export default async (request: Request, response: Response): Promise<void> => {
    await genericApiMethodHandler(request, response, { POST })
}
