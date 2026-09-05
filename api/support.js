export default function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' })
  const { message, email = '' } = request.body || {}
  if (!message || String(message).trim().length < 5) return response.status(400).json({ error: 'Please describe your issue.' })
  return response.status(201).json({ ticketId: `HELP-${Date.now().toString().slice(-6)}`, status: 'open', email, message: 'Support request received in demo mode.' })
}
