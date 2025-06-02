// pages/api/listings/index.ts
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

const uri = process.env.MONGODB_URI;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!uri) {
    return res.status(500).json({ message: 'Missing MongoDB URI' });
  }

  let client;

  try {
    client = new MongoClient(uri);
    await client.connect();

    const db = client.db('sample_airbnb');
    const collection = db.collection('listingsAndReviews');

    // Build filter from query params
    const filters: any = {};

    if (req.query.location) {
      filters["address.market"] = { $regex: req.query.location as string, $options: 'i' };
    }

    if (req.query.propertyType) {
      filters.property_type = req.query.propertyType;
    }

    if (req.query.bedrooms) {
      if (req.query.bedrooms === '4+') {
        filters.bedrooms = { $gte: 4 };
      } else {
        filters.bedrooms = parseInt(req.query.bedrooms as string, 10);
      }
    }

    const listings = await collection.find(filters).project({
      name: 1,
      summary: 1,
      price: 1,
      review_scores: 1
    }).limit(50).toArray();

    // Convert MongoDB ObjectIDs to strings
const serializedListings = listings.map(listing => ({
    ...listing,
    _id: listing._id.toString() // Convert ObjectID to string
  }));

    res.status(200).json(serializedListings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (client) await client.close();
  }
}
