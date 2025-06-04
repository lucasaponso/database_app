import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as constants from '@/constants';

/**
 * @brief The following endpoint inserts a new booking into MongoDB.
 * @param req 
 * @param res 
 * @returns 
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(constants.HTTP_405).json({ message: 'Method not allowed' });
  }

  if (!constants.mongodbConnectionStr) {
    return res.status(constants.HTTP_500).json({ message: 'API does not have connection to MongoDB' });
  }

  let client;

  try {
    const {
      startDate,
      endDate,
      clientName,
      email,
      daytimePhone,
      mobile,
      postalAddress,
      homeAddress,
      listingId,
    } = req.body;

    if (!startDate || !endDate || !clientName || !email || !daytimePhone || !listingId) {
      return res.status(constants.HTTP_500).json({ message: 'Missing required fields' });
    }

    client = new MongoClient(constants.mongodbConnectionStr);
    await client.connect();

    const db = client.db('sample_airbnb');
    const collection = db.collection('bookings');

    const newBooking = {
      listingId,
      startDate,
      endDate,
      clientName,
      email,
      daytimePhone,
      mobile,
      postalAddress,
      homeAddress,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newBooking);

    return res.status(constants.HTTP_201).json({ message: 'Booking saved', bookingId: result.insertedId });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(constants.HTTP_500).json({ message: 'Internal server error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
