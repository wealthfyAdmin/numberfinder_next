import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone } = req.query;

  if (!phone) {
    res.status(400).json({ error: 'Phone number is required' });
    return;
  }

  const apiUrl = `https://api.anycomplete.com/api20/lookup?token=77078d21-79ef-439b-8ae6-9efc9726475a&phone=${phone}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'User-Agent': 'YourAppName/1.0',
      },
    });

    if (!response.ok) {
      res.status(response.status).json({ error: 'Failed to fetch data' });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}
