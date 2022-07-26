import { ObjectId } from 'mongodb'
import * as moment from 'moment'

import { getObjectId, getObjectIdString } from '../../common/tools'

class BaseMongoDataMapper {
  fromObjectId(objectId: ObjectId|null): string {
    return getObjectIdString(objectId)
  }

  toObjectId(id: string): ObjectId|null {
    return getObjectId(id)
  }

  fromDate(date: Date|null): string {
    if (!moment.utc(date).isValid()) return ''

    return moment.utc(date).format()
  }

  toDate(date: string): Date|null {
    if (!moment.utc(date).isValid()) return null

    return moment.utc(date).toDate()
  }
}

export { BaseMongoDataMapper }
