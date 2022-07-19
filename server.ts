import 'dotenv/config'

import express from 'express'
import bodyParser from 'body-parser'

import Health from './v1/health'
import Ping from './v1/ping'

import NewBooking from './v1/booking'
import AllBookings from './v1/bookings'
import BookingById from './v1/booking/[booking_id]'

import BookingPrice from './v1/booking_price'

import NewRoomType from './v1/room_type'
import AllRoomTypes from './v1/room_types'
import RoomTypeById from './v1/room_type/[room_type_id]'

import OneTimePassword from './v1/one_time_password'
import Login from './v1/login'

import Hotel from './v1/hotel'
import Hotels from './v1/hotels'
import HotelById from './v1/hotel/[hotel_id]'

import Profile from './v1/profile'
import Profiles from './v1/profiles'
import ProfileById from './v1/profile/[profile_id]'

import Offers from './v1/offers/search'

import Orders from './v1/orders/createWithOffer'

import OrgId from './v1/orgid/[org_id]'

import RateModifiers from './v1/rate_modifiers'
import RateModifier from './v1/rate_modifier'
import RateModifiersById from './v1/rate_modifier/[rate_modifier_id]'

import UploadImage from './v1/upload_image'

import WTVerification from './v1/wt_verification'

const app = express()
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.get('/api/v1/health', Health)
app.get('/api/v1/ping', Ping)

app.post('/api/v1/bookings', NewBooking)
app.get('/api/v1/bookings', AllBookings)
app.get('/api/v1/bookings/:booking_id', BookingById)
app.patch('/api/v1/bookings/:booking_id', BookingById)
app.delete('/api/v1/bookings/:booking_id', BookingById)

app.post('/api/v1/booking_price', BookingPrice)

app.post('/api/v1/room_types', NewRoomType)
app.get('/api/v1/room_types', AllRoomTypes)
app.get('/api/v1/room_types/:room_type_id', RoomTypeById)
app.patch('/api/v1/room_types/:room_type_id', RoomTypeById)
app.delete('/api/v1/room_types/:room_type_id', RoomTypeById)

app.post('/api/v1/send_one_time_pass', OneTimePassword)
app.post('/api/v1/login', Login)

app.get('/api/v1/hotels', Hotels)
app.post('/api/v1/hotel', Hotel)
app.get('/api/v1/hotel/:hotel_id', HotelById)
app.patch('/api/v1/hotel/:hotel_id', HotelById)
app.delete('/api/v1/hotel/:hotel_id', HotelById)

app.get('/api/v1/profiles', Profiles)
app.post('/api/v1/profile', Profile)
app.get('/api/v1/profile/:profile_id', ProfileById)
app.patch('/api/v1/profile/:profile_id', ProfileById)
app.delete('/api/v1/profile/:profile_id', ProfileById)

app.post('/api/v1/offers', Offers)

app.post('/api/v1/orders', Orders)

app.get('/api/v1/org_id/:org_id', OrgId)

app.get('/api/v1/rate_modifiers', RateModifiers)
app.post('/api/v1/rate_modifier', RateModifier)
app.get('/api/v1/rate_modifier/:rate_modifier_id', RateModifiersById)
app.patch('/api/v1/rate_modifier/:rate_modifier_id', RateModifiersById)
app.delete('/api/v1/rate_modifier/:rate_modifier_id', RateModifiersById)

app.post('/api/v1/upload_image', UploadImage)

app.get('/api/v1/wt-verification', WTVerification)

void (async () => {
  app.listen(PORT, () => {
    console.log('Started at http://localhost:' + PORT)
  })
})()
