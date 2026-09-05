import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowRight, Check, ChevronDown, CircleUserRound, Heart, Menu, Search, ShoppingBag, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import './styles.css'

const products = [
  { id: 1, name: 'Linen carryall', category: 'Carry', price: 88, tone: 'sand', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80', tag: 'Bestseller', desc: 'A generous, unstructured tote in washed European linen.' },
  { id: 2, name: 'Stoneware pitcher', category: 'Home', price: 64, tone: 'blue', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80', tag: 'New', desc: 'Hand-thrown form with a quiet, tactile glaze.' },
  { id: 3, name: 'Alpine wool throw', category: 'Home', price: 142, tone: 'green', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80', tag: 'Edit pick', desc: 'Soft, substantial wool for cool evenings and slow mornings.' },
  { id: 4, name: 'Daily field watch', category: 'Wear', price: 195, tone: 'black', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80', tag: '', desc: 'A precise, low-profile watch built for a lifetime.' },
  { id: 5, name: 'Cedar incense set', category: 'Ritual', price: 28, tone: 'orange', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80', tag: '', desc: 'A warm, resinous ritual for resetting the room.' },
  { id: 6, name: 'Mori glass carafe', category: 'Home', price: 52, tone: 'clear', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80', tag: '', desc: 'A clear silhouette for water, wine, or wild branches.' },
  { id: 7, name: 'Canvas day pack', category: 'Carry', price: 118, tone: 'clay', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80', tag: '', desc: 'Thoughtful pockets and sturdy cotton canvas for the daily route.' },
  { id: 8, name: 'Oak reading rest', category: 'Ritual', price: 46, tone: 'wood', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80', tag: '', desc: 'A small solid-oak stand for your current chapter.' },
]

function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const addToCart = (product) => {
    setCart((current) => [...current, product])
    setCartOpen(true)
  }
  const removeFromCart = (index) => setCart((current) => current.filter((_, i) => i !== index))
  return <>
    <Header count={cart.length} onCart={() => setCartOpen(true)} />
    <main><Routes>
      <Route path="/" element={<Home addToCart={addToCart} />} />
      <Route path="/shop" element={<Shop addToCart={addToCart} />} />
      <Route path="/shop/:category" element={<Shop addToCart={addToCart} />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/about" element={<About />} />
    </Routes></main>
    <Footer />
    {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />}
  </>
}

function Header({ count, onCart }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  return <header className="site-header">
    <div className="announcement"><Sparkles size={13} /> Free shipping on orders over $75 <span>·</span> Thoughtful goods, simply sent.</div>
    <div className="nav-wrap">
      <button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      <Link to="/" className="logo">NORTHSTAR<span>MARKET</span></Link>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <Link className={location.pathname === '/shop' ? 'active' : ''} to="/shop">Shop</Link>
        <Link className={location.pathname === '/journal' ? 'active' : ''} to="/journal">Journal</Link>
        <Link className={location.pathname === '/about' ? 'active' : ''} to="/about">Our story</Link>
      </nav>
      <div className="nav-actions">
        <button className="icon-button" aria-label="Search"><Search size={19} /></button>
        <button className="icon-button account" aria-label="Account"><CircleUserRound size={19} /></button>
        <button className="bag-button" onClick={onCart} aria-label="Open shopping bag"><ShoppingBag size={19} /><span>{count}</span></button>
      </div>
    </div>
  </header>
}

function Home({ addToCart }) {
  return <>
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow">The autumn edit · 2026</p><h1>Good things,<br /><em>well chosen.</em></h1><p className="hero-description">Objects with a point of view. Made to be used, loved, and kept close.</p><Link className="button button-dark" to="/shop">Explore the collection <ArrowRight size={16} /></Link></div>
      <div className="hero-image"><img src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=1600&q=85" alt="Sunlit table with considered home objects" /><div className="hero-note"><span>01 / 04</span><span>Quiet utility</span></div></div>
    </section>
    <section className="marquee"><div>USEFUL <span>·</span> BEAUTIFUL <span>·</span> BUILT TO LAST <span>·</span> USEFUL <span>·</span> BEAUTIFUL <span>·</span></div></section>
    <section className="section featured"><div className="section-heading"><div><p className="eyebrow">A considered selection</p><h2>Meet the edit</h2></div><Link to="/shop">View all <ArrowRight size={16} /></Link></div><div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}</div></section>
    <section className="split-feature"><div className="split-image"><img src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80" alt="Hands wearing a simple watch" /></div><div className="split-copy"><p className="eyebrow">The philosophy</p><h2>Make room for<br /><em>the good stuff.</em></h2><p>We look for the things that earn their place in your everyday. Honest materials, clear purpose, and a little bit of delight.</p><Link className="text-link" to="/about">Read our story <ArrowRight size={16} /></Link></div></section>
    <Newsletter />
  </>
}

function Shop({ addToCart }) {
  const { pathname } = useLocation()
  const category = pathname.split('/')[2]
  const [filter, setFilter] = useState(category ? category[0].toUpperCase() + category.slice(1) : 'All')
  const [sort, setSort] = useState('Featured')
  const categories = ['All', 'Carry', 'Home', 'Wear', 'Ritual']
  let visible = filter === 'All' ? products : products.filter((product) => product.category === filter)
  if (sort === 'Price: low to high') visible = [...visible].sort((a, b) => a.price - b.price)
  if (sort === 'Price: high to low') visible = [...visible].sort((a, b) => b.price - a.price)
  return <section className="section shop-page"><div className="shop-intro"><p className="eyebrow">The full collection</p><h1>Objects for <em>every day.</em></h1><p>Small-batch goods for considered living, from makers we admire.</p></div><div className="shop-toolbar"><div className="category-tabs">{categories.map((item) => <button className={filter === item ? 'selected' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><label className="sort"><SlidersHorizontal size={15} /><select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>Price: low to high</option><option>Price: high to low</option></select><ChevronDown size={14} /></label></div><div className="product-grid shop-grid">{visible.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}</div></section>
}

function ProductCard({ product, addToCart }) {
  const [saved, setSaved] = useState(false)
  const [added, setAdded] = useState(false)
  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }
  return <article className="product-card"><div className="product-image"><img src={product.image} alt={product.name} />{product.tag && <span className="product-tag">{product.tag}</span>}<button className={saved ? 'save saved' : 'save'} onClick={() => setSaved(!saved)} aria-label="Save item"><Heart size={17} fill={saved ? 'currentColor' : 'none'} /></button><button className={added ? 'quick-add added' : 'quick-add'} onClick={handleAdd}>{added ? <><Check size={14} /> Added to bag</> : <>Add to bag <ArrowRight size={14} /></>}</button></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.category}</p></div><strong>${product.price}</strong></div></article>
}

function Journal() { return <section className="section journal"><div className="shop-intro"><p className="eyebrow">From the journal</p><h1>Notes on <em>living well.</em></h1></div><div className="journal-grid"><article className="journal-lead"><img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80" alt="Notebook and coffee on a desk" /><p className="eyebrow">Field notes · 06.09.26</p><h2>The case for a slower morning</h2><p>On rituals, good light, and letting the first hour belong to you.</p></article><article className="journal-item"><img src="https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=900&q=80" alt="Ceramic cup on a table" /><p className="eyebrow">At home · 05.28.26</p><h3>A cup worth keeping</h3></article><article className="journal-item"><img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=80" alt="Sunlit studio workspace" /><p className="eyebrow">Making · 05.14.26</p><h3>In praise of the useful</h3></article></div></section> }
function About() { return <section className="about"><div className="about-hero"><p className="eyebrow">Since 2018</p><h1>Less, but<br /><em>better.</em></h1></div><div className="about-body"><div><p className="eyebrow">Why Northstar</p><h2>We believe the everyday deserves your attention.</h2></div><div><p>Northstar is a small independent shop built around a simple idea: the objects around us shape how we move through the day. We seek out honest materials, thoughtful makers, and pieces that get more beautiful with use.</p><p>There is no rush here. Just a growing collection of things we would be glad to live with ourselves.</p><Link className="text-link" to="/shop">Shop the collection <ArrowRight size={16} /></Link></div></div></section> }
function Newsletter() { return <section className="newsletter"><div><p className="eyebrow">A note from Northstar</p><h2>Good things, occasionally.</h2><p>New arrivals, field notes, and a little beauty for your inbox.</p></div><form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Your email address" aria-label="Your email address" required /><button className="button button-dark">Subscribe <ArrowRight size={15} /></button></form></section> }
function CartDrawer({ cart, onClose, onRemove }) { const [checkoutStarted, setCheckoutStarted] = useState(false); const total = cart.reduce((sum, item) => sum + item.price, 0); return <div className="drawer-backdrop" onClick={onClose}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-head"><h2>Your bag <span>{cart.length}</span></h2><button className="icon-button" onClick={onClose} aria-label="Close bag"><X size={20} /></button></div>{cart.length === 0 ? <div className="empty-bag"><ShoppingBag size={30} /><p>Your bag is waiting.</p><Link to="/shop" onClick={onClose}>Browse the collection <ArrowRight size={15} /></Link></div> : checkoutStarted ? <div className="checkout-message"><Check size={30} /><h3>Ready for checkout</h3><p>This demo checkout is ready to connect to your payment provider.</p><button className="button button-dark" onClick={() => setCheckoutStarted(false)}>Back to bag</button></div> : <><div className="cart-items">{cart.map((item, index) => <div className="cart-item" key={`${item.id}-${index}`}><img src={item.image} alt="" /><div><h3>{item.name}</h3><p>${item.price}</p><button onClick={() => onRemove(index)}>Remove</button></div></div>)}</div><div className="cart-total"><div><span>Subtotal</span><strong>${total}</strong></div><button className="button button-dark checkout" onClick={() => setCheckoutStarted(true)}>Checkout <ArrowRight size={15} /></button><small>Taxes and shipping calculated at checkout.</small></div></>}</aside></div> }
function Footer() { return <footer><div className="footer-top"><Link to="/" className="logo">NORTHSTAR<span>MARKET</span></Link><p>Considered goods for everyday living.</p><div className="footer-links"><Link to="/shop">Shop</Link><Link to="/journal">Journal</Link><Link to="/about">Our story</Link></div></div><div className="footer-bottom"><span>© 2026 Northstar Market</span><span>Made with intention.</span></div></footer> }

createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>)
