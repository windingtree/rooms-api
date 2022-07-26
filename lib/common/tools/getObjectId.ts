import { ObjectId } from 'mongodb'

import { CONSTANTS } from '../../common/constants'
import { CError } from '../../common/tools'

const { INTERNAL_SERVER_ERROR } = CONSTANTS.HTTP_STATUS

function getObjectId(id: string|undefined|null): ObjectId|null {
  if (typeof id === 'undefined' || id === null || id === '') {
    return null
  }

  let objectId: ObjectId
  try {
    objectId = new ObjectId(id)
  } catch (err: unknown) {
    throw new CError(INTERNAL_SERVER_ERROR, 'Tried to convert an illegal value to ObjectId.', err)
  }

  return objectId
}

export { getObjectId }
