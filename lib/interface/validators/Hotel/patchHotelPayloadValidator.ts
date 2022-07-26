import { Request } from 'express'

import {
  validateOptionalString,
  validateOptionalLocation,
  validateOptionalImagesArray
} from '../../../interface/validators/_helpers'

import { CONSTANTS } from '../../../common/constants'
import { CError } from '../../../common/tools'
import { IPatchHotelPayload } from '../../../common/types'

const { BAD_REQUEST } = CONSTANTS.HTTP_STATUS

async function patchHotelPayloadValidator(request: Request): Promise<IPatchHotelPayload> {
  if (!request.body) {
    throw new CError(BAD_REQUEST, 'Must provide a valid body with request.')
  }

  const payload: IPatchHotelPayload = {}

  const ALLOWED_PROPS: Array<keyof IPatchHotelPayload> = [
    'ownerId',
    'name',
    'description',
    'address',
    'location',
    'images',
    'email',
  ]

  for (const [key] of Object.entries(request.body)) {
    if (!ALLOWED_PROPS.includes(key as keyof IPatchHotelPayload)) {
      throw new CError(BAD_REQUEST, `Property '${key}' on 'hotel' is not updatable.`)
    }
  }

  const ownerId = request.body.ownerId
  await validateOptionalString('ownerId', ownerId)
  if (typeof ownerId !== 'undefined') payload.ownerId = ownerId

  const name = request.body.name
  await validateOptionalString('name', name)
  if (typeof name !== 'undefined') payload.name = name

  const description = request.body.description
  await validateOptionalString('description', description)
  if (typeof description !== 'undefined') payload.description = description

  const address = request.body.address
  await validateOptionalString('address', address)
  if (typeof address !== 'undefined') payload.address = address

  const location = request.body.location
  await validateOptionalLocation('location', location)
  if (typeof location !== 'undefined') payload.location = location

  const images = request.body.images
  await validateOptionalImagesArray('images', images)
  if (typeof images !== 'undefined') payload.images = images

  const email = request.body.email
  await validateOptionalString('email', email)
  if (typeof email !== 'undefined') payload.email = email

  return payload
}

export { patchHotelPayloadValidator }
