const GITHUB_COMMIT_REF: string = process.env.GITHUB_COMMIT_REF || '{branch_name}'
const GITHUB_COMMIT_SHA: string = process.env.GITHUB_COMMIT_SHA || '{commit_hash}'

export { GITHUB_COMMIT_REF, GITHUB_COMMIT_SHA }
