import { ObjectId } from 'mongodb'

import { isFunction } from '../../common/tools'

function getObjectIdString(objectId: ObjectId|string|undefined|null): string {
  if (typeof objectId === 'string') {
    return objectId
  } else if (
    typeof objectId === 'undefined' ||
    objectId === undefined ||
    objectId === null ||
    !isFunction(objectId.toHexString)
  ) {
    return ''
  }

  return objectId.toHexString()
}

export { getObjectIdString }
