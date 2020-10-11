import { NowRequest } from '@vercel/node'
import { MongoClient } from 'mongodb'

import { DB } from './db'
import { IDecodedAuthToken, IUserAuthDetails } from '../types/auth'
import { decodeToken } from './decode_token'

async function authorizeUser(email: string, oneTimePassword: string): Promise<boolean> {
  let userIsAuthorized: boolean

  const dbClient = await DB.getInstance().getDbClient()
  if (dbClient === null) {
    throw 'Could not connect to the database.'
  }

  try {
    const database = (dbClient as MongoClient).db('rooms-staging')
    const collection = database.collection('owners')

    const query = { email }

    const options = {
      sort: { rating: -1 },
      projection: { _id: 0, email: 1, oneTimePassword: 1 },
    }

    const ownerRecord = await collection.findOne(query, options)

    if (ownerRecord && ownerRecord.oneTimePassword === oneTimePassword) {
      userIsAuthorized = true
    } else {
      userIsAuthorized = false
    }
  } catch (err) {
    throw 'Could not authenticate user.'
  }

  return userIsAuthorized
}

async function getUserAuthDetails(request: NowRequest): Promise<IUserAuthDetails> {
  let decodedToken: IDecodedAuthToken
  try {
    decodedToken = decodeToken(request)
  } catch (err) {
    throw err
  }

  const email: string = (decodedToken as IDecodedAuthToken).email
  const oneTimePassword: string = (decodedToken as IDecodedAuthToken).oneTimePassword

  let userIsAuthorized: boolean
  try {
    userIsAuthorized = await authorizeUser(email, oneTimePassword)
  } catch (err) {
    throw err
  }

  if (userIsAuthorized !== true) {
    throw 'Email or one time password are not valid.'
  }

  return {
    userIsAuthorized, email, oneTimePassword
  }
}

export {
  getUserAuthDetails,
  authorizeUser,
}
