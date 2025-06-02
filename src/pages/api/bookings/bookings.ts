import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

const uri: string | undefined = process.env.MONGODB_URI;

const HTTP_200: number = 200
const HTTP_201: number = 200
const HTTP_422: number = 422
const HTTP_500: number = 500

/**
 * @brief The following endpoint takes data from the client's request
 * and adds it to the MongoDB collection.
 * @param req 
 * @param res 
 * @returns 
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { startDate, endDate, clientName, email, daytimePhone } = req.body;
    
    if (!startDate || !endDate || !clientName || !email || !daytimePhone) {
        return res.status(HTTP_422).json({ message: 'Missing required fields' });
    }

    if (uri == undefined) {
        return res.status(HTTP_500).json({ message: 'API does not have connection to MongoDB'});
    }

    let client;

    try {
        
        client = new MongoClient(uri);
        await client.connect();

        const db = client.db('sample_airbnb');
        const collection = db.collection('bookings');


        // Insert the booking
        const result = await collection.insertOne({...req.body});

        return res.status(HTTP_201).json({
        message: 'Booking created successfully',
        bookingId: result.insertedId,
        });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(HTTP_500).json({ message: 'Internal server error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}