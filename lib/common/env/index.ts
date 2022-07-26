import { IEnvVariables } from '../../common/types'

import { GITHUB_COMMIT_REF, GITHUB_COMMIT_SHA } from './github'
import { ENV_ENCRYPTION_DETAILS } from './crypto'
import { REACT_APP_JWT_SECRET } from './react_app'
import { MONGODB_URL, ROOMS_DB_NAME } from './mongo'

import { checkRequiredEnvProps } from './checkRequiredEnvProps'

const ENV: IEnvVariables = {
  GITHUB_COMMIT_REF,
  GITHUB_COMMIT_SHA,

  ENV_ENCRYPTION_DETAILS,

  REACT_APP_JWT_SECRET,

  MONGODB_URL,
  ROOMS_DB_NAME,
}

export { ENV, checkRequiredEnvProps }
