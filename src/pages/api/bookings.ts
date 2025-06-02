import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

const uri = process.env.MONGODB_URI;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  let client;
  
  try {
    client = new MongoClient(uri);
    await client.connect();

    const db = client.db('sample_airbnb'); // Replace with your database name
    const collection = db.collection('bookings'); // Replace with your collection name

    // Validate required fields
    const { startDate, endDate, clientName, email, daytimePhone } = req.body;
    if (!startDate || !endDate || !clientName || !email || !daytimePhone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Insert the booking
    const result = await collection.insertOne({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(201).json({
      message: 'Booking created successfully',
      bookingId: result.insertedId,
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}