export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const REALVISOR_API = 'https://api-production-88cf.up.railway.app/api/v1/public/api-leads/submit';
  const REALVISOR_KEY = process.env.REALVISOR_API_KEY;

  if (!REALVISOR_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch(REALVISOR_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': REALVISOR_KEY
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json(data);
    } else {
      return res.status(response.status).json(data);
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
