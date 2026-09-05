const steps = ['Order confirmed', 'Packed', 'Shipped', 'Out for delivery', 'Delivered']

export default function handler(request, response) {
  if (request.method !== 'GET') return response.status(405).json({ error: 'Method not allowed' })
  const orderId = String(request.query?.orderId || '')
  if (!/^NS-\d+$/.test(orderId)) return response.status(400).json({ error: 'A valid orderId is required.' })
  return response.status(200).json({ orderId, status: steps[0], trackingStage: 0, steps, demo: true, message: 'Connect Shiprocket or Delhivery for live courier events.' })
}
