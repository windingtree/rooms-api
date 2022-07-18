import 'dotenv/config'

import express from 'express'
import bodyParser from 'body-parser'

import Health from './v1/health'
import Ping from './v1/ping'

import NewBooking from './v1/booking'
import AllBookings from './v1/bookings'
import BookingById from './v1/booking/[booking_id]'

import NewRoomType from './v1/room_type'
import AllRoomTypes from './v1/room_types'
import RoomTypeById from './v1/room_type/[room_type_id]'

import OneTimePassword from './v1/one_time_password'
import Login from './v1/login'

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

app.post('/api/v1/room_types', NewRoomType)
app.get('/api/v1/room_types', AllRoomTypes)
app.get('/api/v1/room_types/:room_type_id', RoomTypeById)
app.patch('/api/v1/room_types/:room_type_id', RoomTypeById)
app.delete('/api/v1/room_types/:room_type_id', RoomTypeById)

app.post('/api/v1/send_one_time_pass', OneTimePassword)
app.post('/api/v1/login', Login)

void (async () => {
  app.listen(PORT, () => {
    console.log('Started at http://localhost:' + PORT)
  })
})()
