import { MongoDB } from '../../infra/mongo'

import { AppConfig } from '../../app/config'

import { ENV } from '../../common/env'
import { IHealthStatusMongo, IHealthStatus } from '../../common/types'

async function getHealth(): Promise<IHealthStatus> {
  let mongoStatus = 'up'
  let pingErr: unknown|null = null

  const startTime = process.hrtime()
  try {
    await MongoDB.getInstance().ping()
  } catch (err: unknown) {
    mongoStatus = 'down'
    pingErr = err
  }
  const endTime: [number, number] = process.hrtime(startTime)
  const timeInMs: number = (endTime[0] * 1000000000 + endTime[1]) / 1000000

  const mongoStatusObj: IHealthStatusMongo = {
    status: mongoStatus,
    latency: (mongoStatus === 'up') ? `${timeInMs}ms` : undefined,
  }

  if (pingErr !== null) {
    mongoStatusObj.err = pingErr
  }

  console.log(JSON.stringify(ENV))
  const appConfig = await AppConfig.getInstance().getConfig()
  console.log(JSON.stringify(appConfig))

  return {
    mongo: mongoStatusObj,
    app_version: `${ENV.GITHUB_COMMIT_REF}:${ENV.GITHUB_COMMIT_SHA}`,
    test: 42,
  }
}

export { getHealth }
