import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

const uri: string | undefined = process.env.MONGODB_URI;

const HTTP_200 = 200;
const HTTP_500 = 500;
const HTTP_405 = 405;

/**
 * @brief The following endpoint inserts a new booking into MongoDB.
 * @param req 
 * @param res 
 * @returns 
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(HTTP_405).json({ message: 'Method not allowed' });
  }

  if (!uri) {
    return res.status(HTTP_500).json({ message: 'API does not have connection to MongoDB' });
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
      return res.status(HTTP_500).json({ message: 'Missing required fields' });
    }

    client = new MongoClient(uri);
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

    return res.status(HTTP_200).json({ message: 'Booking saved', bookingId: result.insertedId });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(HTTP_500).json({ message: 'Internal server error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
