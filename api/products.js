const products = [
  { id: 1, name: 'Linen carryall', category: 'Carry', price: 88, currency: 'USD' },
  { id: 2, name: 'Stoneware pitcher', category: 'Home', price: 64, currency: 'USD' },
  { id: 9, name: 'Everyday skincare set', category: 'Beauty', price: 39, currency: 'USD' },
  { id: 11, name: 'Portable reading light', category: 'Electronics', price: 34, currency: 'USD' },
  { id: 12, name: 'Stackable lunch set', category: 'Kitchen', price: 42, currency: 'USD' },
]

export default function handler(request, response) {
  if (request.method !== 'GET') return response.status(405).json({ error: 'Method not allowed' })
  const query = String(request.query?.q || '').toLowerCase()
  const category = String(request.query?.category || 'All')
  const result = products.filter((product) => {
    const matchesQuery = !query || `${product.name} ${product.category}`.toLowerCase().includes(query)
    const matchesCategory = category === 'All' || product.category === category
    return matchesQuery && matchesCategory
  })
  return response.status(200).json({ products: result, count: result.length })
}
