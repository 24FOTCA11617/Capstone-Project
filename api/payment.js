function send(response, status, payload) {
  return response.status(status).json(payload)
}

export default function handler(request, response) {
  if (request.method !== 'POST') return send(response, 405, { error: 'Method not allowed' })
  const { amount, currency = 'INR', method } = request.body || {}
  if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) return send(response, 400, { error: 'A positive amount is required.' })
  if (!['upi', 'card', 'cod'].includes(method)) return send(response, 400, { error: 'Unsupported payment method.' })
  return send(response, 200, {
    payment: {
      id: `PAY-${Date.now().toString().slice(-8)}`,
      amount: Number(amount),
      currency,
      method,
      status: method === 'cod' ? 'cash_on_delivery' : 'requires_gateway',
    },
    demo: true,
    message: 'Add Razorpay order creation and webhook verification before accepting real payments.',
  })
}
