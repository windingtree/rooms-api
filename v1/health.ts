import { Request, Response } from 'express'

import { genericApiMethodHandler } from '../_lib/interface'

import { getHealth } from '../_lib/app/health'

import { IHealthStatus } from '../_lib/common/types'

async function GET(): Promise<IHealthStatus> {
  return await getHealth()
}

export default async (request: Request, response: Response): Promise<void> => {
  await genericApiMethodHandler(request, response, { GET })
}
