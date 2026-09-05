function send(response, status, payload) {
  return response.status(status).json(payload)
}

export default function handler(request, response) {
  if (request.method === 'POST') {
    const { items, address, paymentMethod } = request.body || {}
    if (!Array.isArray(items) || items.length === 0) return send(response, 400, { error: 'At least one item is required.' })
    if (!address?.name || !address?.phone || !address?.line || !address?.city || !/^\d{6}$/.test(String(address.pincode))) return send(response, 400, { error: 'A complete valid delivery address is required.' })
    if (!['upi', 'card', 'cod'].includes(paymentMethod)) return send(response, 400, { error: 'Unsupported payment method.' })
    const order = { id: `NS-${Date.now().toString().slice(-6)}`, status: 'Order confirmed', trackingStage: 0, createdAt: new Date().toISOString(), paymentStatus: paymentMethod === 'cod' ? 'cash_on_delivery' : 'pending_verification', items, address, paymentMethod }
    return send(response, 201, { order, demo: true, message: 'Order accepted in demo mode.' })
  }
  if (request.method === 'GET') return send(response, 200, { orders: [], message: 'Connect Supabase to persist orders.' })
  return send(response, 405, { error: 'Method not allowed' })
}
