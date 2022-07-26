interface IEnvVariables {
  GITHUB_COMMIT_REF: string
  GITHUB_COMMIT_SHA: string

  ENV_ENCRYPTION_DETAILS: string

  REACT_APP_JWT_SECRET: string

  MONGODB_URL: string
  ROOMS_DB_NAME: string
}

export { IEnvVariables }
