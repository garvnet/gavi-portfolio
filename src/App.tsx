import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Reorder, useMotionValue, useTransform } from 'framer-motion'
import './App.css'
import Web3Hero from './Web3Hero'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'market', label: 'Market' },
  { id: 'alerts', label: 'Alerts' },
  { id: 'settings', label: 'Settings' },
]

const DUMMY_ASSETS = [
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', quantity: 0.5, price: 48000 },
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', quantity: 2, price: 3200 },
]

// Dummy crypto data
const generateCryptoData = () => [
  { symbol: 'BTC', name: 'Bitcoin', price: 45000 + Math.random() * 5000, change: (Math.random() - 0.5) * 10, volume: 25000000000 },
  { symbol: 'ETH', name: 'Ethereum', price: 3000 + Math.random() * 500, change: (Math.random() - 0.5) * 8, volume: 15000000000 },
  { symbol: 'ADA', name: 'Cardano', price: 1.5 + Math.random() * 0.5, change: (Math.random() - 0.5) * 12, volume: 2000000000 },
  { symbol: 'SOL', name: 'Solana', price: 100 + Math.random() * 20, change: (Math.random() - 0.5) * 15, volume: 5000000000 },
  { symbol: 'DOT', name: 'Polkadot', price: 20 + Math.random() * 5, change: (Math.random() - 0.5) * 9, volume: 3000000000 },
]

// Generate portfolio performance data
const generatePortfolioData = () => {
  const data = []
  let value = 10000
  for (let i = 0; i < 30; i++) {
    value += (Math.random() - 0.5) * 1000
    data.push({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: Math.max(value, 5000),
    })
  }
  return data
}

// Particle effect component
const ParticleEffect = ({ x, y }: { x: number; y: number }) => (
  <motion.div
    initial={{ scale: 0, opacity: 1 }}
    animate={{ scale: 1, opacity: 0 }}
    transition={{ duration: 0.6 }}
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 8,
      height: 8,
      background: '#7f5af0',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 1000,
    }}
  />
)

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [cryptoData, setCryptoData] = useState(generateCryptoData())
  const [portfolioData, setPortfolioData] = useState(generatePortfolioData())
  const [assets, setAssets] = useState(DUMMY_ASSETS)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingAsset, setEditingAsset] = useState<any>(null)
  const [addForm, setAddForm] = useState({ symbol: '', quantity: '', price: '' })
  const [editForm, setEditForm] = useState({ symbol: '', quantity: '', price: '' })
  const [tileAction, setTileAction] = useState({ id: '', type: '' })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [isDragging, setIsDragging] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(generateCryptoData())
      setPortfolioData(generatePortfolioData())
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Animation variants with spring physics
  const tileVariants = {
    initial: { 
      scale: 1, 
      y: 0, 
      rotateX: 0,
      boxShadow: '0 8px 32px 0 rgba(44,182,125,0.08)',
      transition: { type: "spring" as const, stiffness: 300, damping: 30 }
    },
    hover: { 
      y: -12, 
      scale: 1.06, 
      rotateX: 5,
      boxShadow: '0 20px 60px 0 rgba(127,90,240,0.25)',
      transition: { type: "spring" as const, stiffness: 400, damping: 25 }
    },
    tap: { 
      scale: 0.94, 
      y: 4,
      rotateX: -2,
      transition: { type: "spring" as const, stiffness: 500, damping: 20 }
    },
    add: { 
      backgroundColor: '#2cb67d',
      scale: 1.1,
      rotateY: 360,
      transition: { duration: 0.5, type: "spring" as const }
    },
    remove: { 
      backgroundColor: '#ff6b6b', 
      opacity: 0, 
      scale: 0.7,
      rotateY: -360,
      transition: { duration: 0.4, type: "spring" as const }
    },
    drag: {
      scale: 1.1,
      rotateZ: 5,
      boxShadow: '0 25px 80px 0 rgba(127,90,240,0.4)',
      transition: { type: "spring" as const, stiffness: 300, damping: 20 }
    }
  }

  const createParticleEffect = (x: number, y: number) => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 100,
      y: y + (Math.random() - 0.5) * 100,
    }))
    setParticles(prev => [...prev, ...newParticles])
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)))
    }, 600)
  }

  const handleLogin = (e: any) => {
    e.preventDefault()
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveTab('dashboard')
  }

  const handleAddAsset = (e: any) => {
    e.preventDefault()
    const newAsset = {
      id: Date.now().toString(),
      symbol: addForm.symbol.toUpperCase(),
      name: addForm.symbol.toUpperCase(),
      quantity: parseFloat(addForm.quantity),
      price: parseFloat(addForm.price),
    }
    setAssets((prev) => [...prev, newAsset])
    setTileAction({ id: newAsset.id, type: 'add' })
    setShowAddModal(false)
    setAddForm({ symbol: '', quantity: '', price: '' })
    setTimeout(() => setTileAction({ id: '', type: '' }), 600)
  }

  const handleEditAsset = (e: any) => {
    e.preventDefault()
    if (editingAsset) {
      setAssets(prev => prev.map(asset => 
        asset.id === editingAsset.id 
          ? { ...asset, symbol: editForm.symbol.toUpperCase(), quantity: parseFloat(editForm.quantity), price: parseFloat(editForm.price) }
          : asset
      ))
      setShowEditModal(false)
      setEditingAsset(null)
      setEditForm({ symbol: '', quantity: '', price: '' })
    }
  }

  const handleRemoveAsset = (id: string) => {
    setTileAction({ id, type: 'remove' })
    setTimeout(() => {
      setAssets((prev) => prev.filter((a) => a.id !== id))
      setTileAction({ id: '', type: '' })
    }, 400)
  }

  const openEditModal = (asset: any) => {
    setEditingAsset(asset)
    setEditForm({ symbol: asset.symbol, quantity: asset.quantity.toString(), price: asset.price.toString() })
    setShowEditModal(true)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-section" style={{ padding: '10px', border: '1px solid #7f5af0' }}>
          <p style={{ margin: 0, fontWeight: 600 }}>{`${label}`}</p>
          <p style={{ margin: 0, color: '#7f5af0' }}>
            {`Value: $${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      )
    }
    return null
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add visual feedback
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${!isDarkMode ? '#7f5af0' : '#666'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    toast.textContent = `${!isDarkMode ? 'Dark' : 'Light'} mode ${!isDarkMode ? 'enabled' : 'disabled'}`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${!notificationsEnabled ? '#2cb67d' : '#666'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    toast.textContent = `Notifications ${!notificationsEnabled ? 'enabled' : 'disabled'}`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  const toggleAutoRefresh = () => {
    setAutoRefreshEnabled(!autoRefreshEnabled);
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${!autoRefreshEnabled ? '#7f5af0' : '#666'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    toast.textContent = `Auto-refresh ${!autoRefreshEnabled ? 'enabled' : 'disabled'}`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  // Login Page
  if (!isLoggedIn) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #181c2f 0%, #232946 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-section"
          style={{ 
            padding: '3rem', 
            maxWidth: 400, 
            width: '100%',
            textAlign: 'center'
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <Web3Hero />
          </div>
          <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            WEB3 PORTFOLIO
          </h1>
          <p style={{ color: '#7f5af0', marginBottom: '2rem', fontWeight: 600 }}>
            Login to access your portfolio
          </p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              required
              style={{ width: '100%' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required
              style={{ width: '100%' }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                background: 'linear-gradient(90deg, #7f5af0 0%, #2cb67d 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Login
            </motion.button>
          </form>
          
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
            Demo: Use any email and password
          </p>
        </motion.div>
      </div>
    )
  }

  // Main App
  return (
    <div id="root" style={{ display: 'flex', minHeight: '100vh', width: '100%', padding: '2rem' }}>
      {/* Particle Effects */}
      <AnimatePresence>
        {particles.map(particle => (
          <ParticleEffect key={particle.id} x={particle.x} y={particle.y} />
        ))}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <nav
        className="glass-section"
        style={{
          minWidth: 200,
          maxWidth: 250,
          marginRight: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 16,
          position: 'sticky',
          top: '2rem',
          height: 'fit-content',
          padding: '1.5rem',
        }}
      >
        <div style={{ marginBottom: 32, width: '100%', textAlign: 'center' }}>
          <span className="gradient-text" style={{ fontWeight: 900, fontSize: 22 }}>
            WEB3 PORTFOLIO
          </span>
        </div>
        {NAV_ITEMS.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.05, x: 8 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: activeTab === item.id 
                ? 'linear-gradient(90deg, #7f5af0 0%, #2cb67d 100%)' 
                : 'transparent',
              color: activeTab === item.id ? '#fff' : '#e0e6ed',
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 6,
              padding: '0.7em 1em',
              border: 'none',
              textAlign: 'left',
              width: '100%',
              cursor: 'pointer',
              borderRadius: 10,
              transition: 'all 0.2s',
            }}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </motion.button>
        ))}
        
        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.05, x: 8 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(90deg, #ff6b6b 0%, #ff8e8e 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            marginTop: 'auto',
            padding: '0.7em 1em',
            border: 'none',
            textAlign: 'left',
            width: '100%',
            cursor: 'pointer',
            borderRadius: 10,
            transition: 'all 0.2s',
          }}
          onClick={handleLogout}
        >
          Logout
        </motion.button>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, minWidth: 0, width: '100%' }}>
        {/* Hero Section with 3D Coin (Dashboard only) */}
        {activeTab === 'dashboard' && (
          <section className="glass-section" style={{ marginTop: '0', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Web3Hero />
              <h1 className="gradient-text" style={{ fontSize: '3rem', margin: '1.5rem 0 0.5rem' }}>
                WEB3 PORTFOLIO
              </h1>
              <p style={{ fontWeight: 600, fontSize: '1.2rem', color: '#7f5af0', marginBottom: '1.5rem' }}>
                Modern, real-time, Web3 portfolio tracking for the decentralized future.
              </p>
            </div>
          </section>
        )}

        {/* Tab Content */}
        <section className="glass-section shadow-3d" style={{ padding: '2rem' }}>
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Dashboard
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* Portfolio Performance Chart */}
                <div className="glass-section" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>Portfolio Performance</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={portfolioData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(127,90,240,0.2)" />
                      <XAxis dataKey="date" stroke="#7f5af0" fontSize={12} />
                      <YAxis stroke="#7f5af0" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#7f5af0"
                        strokeWidth={3}
                        dot={{ fill: '#7f5af0', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#2cb67d', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Top Performers */}
                <div className="glass-section" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>Top Performers</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={cryptoData.slice(0, 5)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(127,90,240,0.2)" />
                      <XAxis dataKey="symbol" stroke="#7f5af0" fontSize={12} />
                      <YAxis stroke="#7f5af0" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="price" fill="#7f5af0" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Live Crypto Prices */}
              <div className="glass-section" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>Live Crypto Prices</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {cryptoData.map((crypto) => (
                    <motion.div
                      key={crypto.symbol}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass-section"
                      style={{
                        padding: '1rem',
                        textAlign: 'center',
                        border: '1px solid rgba(127,90,240,0.2)',
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                        {crypto.symbol}
                      </div>
                      <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                        ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div
                        style={{
                          color: crypto.change >= 0 ? '#2cb67d' : '#ff6b6b',
                          fontWeight: 600,
                        }}
                      >
                        {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'portfolio' && (
            <div>
              <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Portfolio
              </h2>
              <motion.button
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95, y: 2 }}
                className="glass-section"
                style={{ fontWeight: 700, fontSize: 18, marginBottom: 24, background: 'linear-gradient(90deg,#7f5af0 0%,#2cb67d 100%)', color: '#fff', border: 'none', padding: '1em 2em', borderRadius: 16, cursor: 'pointer', boxShadow: '0 4px 16px 0 rgba(127,90,240,0.2)' }}
                onClick={() => setShowAddModal(true)}
              >
                + Add Asset
              </motion.button>
              
              {/* Drag and Drop Portfolio */}
              <Reorder.Group 
                axis="y" 
                values={assets} 
                onReorder={setAssets}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}
              >
                <AnimatePresence>
                  {assets.map((asset) => (
                    <Reorder.Item
                      key={asset.id}
                      value={asset}
                      onDragStart={() => setIsDragging(true)}
                      onDragEnd={() => setIsDragging(false)}
                    >
                      <motion.div
                        className="glass-section"
                        variants={tileVariants}
                        initial="initial"
                        animate={tileAction.id === asset.id ? tileAction.type : isDragging ? 'drag' : 'initial'}
                        whileHover="hover"
                        whileTap="tap"
                        exit="remove"
                        style={{
                          padding: '1.5rem',
                          border: '2px solid #7f5af0',
                          borderRadius: 18,
                          background: '#232946cc',
                          color: '#fff',
                          boxShadow: '0 8px 32px 0 rgba(44,182,125,0.08)',
                          cursor: 'grab',
                          transition: 'background 0.2s',
                          position: 'relative',
                          transformStyle: 'preserve-3d',
                          perspective: '1000px',
                        }}
                        onDoubleClick={() => openEditModal(asset)}
                        onClick={(e) => {
                          if (e.target === e.currentTarget) {
                            createParticleEffect(e.clientX, e.clientY);
                          }
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>{asset.symbol}</div>
                        <div style={{ fontSize: 15, marginBottom: 8 }}>{asset.name}</div>
                        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                          {asset.quantity} @ ${asset.price}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 18, color: '#7f5af0' }}>
                          ${(asset.quantity * asset.price).toLocaleString()}
                        </div>
                        
                        {/* Action Buttons */}
                        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 }}>
                          <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: '#7f5af0' }}
                            whileTap={{ scale: 0.95 }}
                            style={{ background: '#2cb67d', color: '#fff', border: 'none', borderRadius: 8, padding: '0.3em 0.7em', fontWeight: 700, cursor: 'pointer', fontSize: 12 }}
                            onClick={() => openEditModal(asset)}
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: '#ff6b6b' }}
                            whileTap={{ scale: 0.95 }}
                            style={{ background: '#ff6b6b', color: '#fff', border: 'none', borderRadius: 8, padding: '0.3em 0.7em', fontWeight: 700, cursor: 'pointer', fontSize: 12 }}
                            onClick={() => handleRemoveAsset(asset.id)}
                          >
                            Remove
                          </motion.button>
                        </div>
                      </motion.div>
                    </Reorder.Item>
                  ))}
                </AnimatePresence>
              </Reorder.Group>

              {/* Add Asset Modal */}
              <AnimatePresence>
                {showAddModal && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100vw',
                      height: '100vh',
                      background: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 200,
                    }}
                  >
                    <motion.form
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 40, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="glass-section"
                      style={{ padding: 32, minWidth: 320, background: '#232946', borderRadius: 20, boxShadow: '0 8px 32px 0 rgba(127,90,240,0.18)' }}
                      onSubmit={handleAddAsset}
                    >
                      <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 18 }}>Add Asset</h3>
                      <input
                        type="text"
                        placeholder="Symbol (e.g. BTC)"
                        value={addForm.symbol}
                        onChange={e => setAddForm(f => ({ ...f, symbol: e.target.value }))}
                        required
                        style={{ width: '100%', marginBottom: 12 }}
                      />
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={addForm.quantity}
                        onChange={e => setAddForm(f => ({ ...f, quantity: e.target.value }))}
                        required
                        style={{ width: '100%', marginBottom: 12 }}
                      />
                      <input
                        type="number"
                        placeholder="Price (USD)"
                        value={addForm.price}
                        onChange={e => setAddForm(f => ({ ...f, price: e.target.value }))}
                        required
                        style={{ width: '100%', marginBottom: 18 }}
                      />
                      <div style={{ display: 'flex', gap: 12 }}>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05, backgroundColor: '#2cb67d' }}
                          whileTap={{ scale: 0.95 }}
                          style={{ background: '#7f5af0', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7em 1.5em', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Add
                        </motion.button>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05, backgroundColor: '#ff6b6b' }}
                          whileTap={{ scale: 0.95 }}
                          style={{ background: '#232946', color: '#fff', border: '1.5px solid #ff6b6b', borderRadius: 8, padding: '0.7em 1.5em', fontWeight: 700, cursor: 'pointer' }}
                          onClick={() => setShowAddModal(false)}
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </motion.form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Edit Asset Modal */}
              <AnimatePresence>
                {showEditModal && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100vw',
                      height: '100vh',
                      background: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 200,
                    }}
                  >
                    <motion.form
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 40, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="glass-section"
                      style={{ padding: 32, minWidth: 320, background: '#232946', borderRadius: 20, boxShadow: '0 8px 32px 0 rgba(127,90,240,0.18)' }}
                      onSubmit={handleEditAsset}
                    >
                      <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 18 }}>Edit Asset</h3>
                      <input
                        type="text"
                        placeholder="Symbol (e.g. BTC)"
                        value={editForm.symbol}
                        onChange={e => setEditForm(f => ({ ...f, symbol: e.target.value }))}
                        required
                        style={{ width: '100%', marginBottom: 12 }}
                      />
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={editForm.quantity}
                        onChange={e => setEditForm(f => ({ ...f, quantity: e.target.value }))}
                        required
                        style={{ width: '100%', marginBottom: 12 }}
                      />
                      <input
                        type="number"
                        placeholder="Price (USD)"
                        value={editForm.price}
                        onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))}
                        required
                        style={{ width: '100%', marginBottom: 18 }}
                      />
                      <div style={{ display: 'flex', gap: 12 }}>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05, backgroundColor: '#2cb67d' }}
                          whileTap={{ scale: 0.95 }}
                          style={{ background: '#7f5af0', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7em 1.5em', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Save
                        </motion.button>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05, backgroundColor: '#ff6b6b' }}
                          whileTap={{ scale: 0.95 }}
                          style={{ background: '#232946', color: '#fff', border: '1.5px solid #ff6b6b', borderRadius: 8, padding: '0.7em 1.5em', fontWeight: 700, cursor: 'pointer' }}
                          onClick={() => setShowEditModal(false)}
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </motion.form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          {activeTab === 'market' && (
            <div>
              <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Market
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                {/* Market Overview Chart */}
                <div className="glass-section" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>Market Overview</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={portfolioData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(127,90,240,0.2)" />
                      <XAxis dataKey="date" stroke="#7f5af0" fontSize={12} />
                      <YAxis stroke="#7f5af0" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#7f5af0"
                        fill="url(#gradient)"
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7f5af0" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#7f5af0" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Crypto List */}
                <div className="glass-section" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>All Cryptocurrencies</h3>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {cryptoData.map((crypto, index) => (
                      <motion.div
                        key={crypto.symbol}
                        whileHover={{ scale: 1.03, x: 6, backgroundColor: 'rgba(127,90,240,0.1)' }}
                        whileTap={{ scale: 0.97, x: -2 }}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '1rem',
                          borderBottom: '1px solid rgba(127,90,240,0.1)',
                          backgroundColor: index % 2 === 0 ? 'rgba(127,90,240,0.05)' : 'transparent',
                          borderRadius: 10,
                          marginBottom: 4,
                          cursor: 'pointer',
                        }}
                        onClick={(e) => createParticleEffect(e.clientX, e.clientY)}
                      >
                        <div>
                          <div style={{ fontWeight: 700 }}>{crypto.symbol}</div>
                          <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                            {crypto.name}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 600 }}>
                            ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </div>
                          <div
                            style={{
                              color: crypto.change >= 0 ? '#2cb67d' : '#ff6b6b',
                              fontSize: '0.9rem',
                            }}
                          >
                            {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'alerts' && (
            <div>
              <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Price Alerts
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Active Alerts */}
                <div className="glass-section" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>Active Alerts</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      { crypto: 'BTC', condition: 'Above', price: '$50,000', status: 'Active' },
                      { crypto: 'ETH', condition: 'Below', price: '$3,000', status: 'Active' },
                      { crypto: 'SOL', condition: 'Above', price: '$120', status: 'Triggered' }
                    ].map((alert, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02, x: 4 }}
                        style={{
                          padding: '1rem',
                          border: '1px solid rgba(127,90,240,0.2)',
                          borderRadius: 10,
                          background: alert.status === 'Triggered' ? 'rgba(255,107,107,0.1)' : 'rgba(44,182,125,0.1)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 700 }}>{alert.crypto}</div>
                            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                              {alert.condition} {alert.price}
                            </div>
                          </div>
                          <div style={{ 
                            color: alert.status === 'Triggered' ? '#ff6b6b' : '#2cb67d',
                            fontWeight: 600,
                            fontSize: '0.9rem'
                          }}>
                            {alert.status}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Create New Alert */}
                <div className="glass-section" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>Create New Alert</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <select style={{ width: '100%' }}>
                      <option>Select Crypto</option>
                      <option>BTC</option>
                      <option>ETH</option>
                      <option>SOL</option>
                      <option>ADA</option>
                    </select>
                    <select style={{ width: '100%' }}>
                      <option>Above</option>
                      <option>Below</option>
                    </select>
                    <input type="number" placeholder="Price (USD)" style={{ width: '100%' }} />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        background: 'linear-gradient(90deg, #7f5af0 0%, #2cb67d 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '0.7em 1em',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Create Alert
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'settings' && (
            <div>
              <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Settings
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Profile Settings */}
                <div className="glass-section" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>Profile Settings</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="text" placeholder="Full Name" defaultValue="John Doe" />
                    <input type="email" placeholder="Email" defaultValue="john@example.com" />
                    <input type="text" placeholder="Phone Number" />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        background: 'linear-gradient(90deg, #7f5af0 0%, #2cb67d 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '0.7em 1em',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Update Profile
                    </motion.button>
                  </div>
                </div>

                {/* App Settings */}
                <div className="glass-section" style={{ padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>App Settings</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Dark Mode</span>
                      <motion.div 
                        whileTap={{ scale: 0.9 }}
                        style={{ 
                          width: 50, 
                          height: 25, 
                          background: isDarkMode ? '#7f5af0' : '#666', 
                          borderRadius: 25, 
                          position: 'relative',
                          cursor: 'pointer'
                        }}
                        onClick={toggleDarkMode}
                      >
                        <motion.div 
                          animate={{ x: isDarkMode ? 25 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          style={{ 
                            width: 20, 
                            height: 20, 
                            background: '#fff', 
                            borderRadius: '50%', 
                            position: 'absolute',
                            top: 2.5,
                            left: 2.5
                          }} 
                        />
                      </motion.div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Notifications</span>
                      <motion.div 
                        whileTap={{ scale: 0.9 }}
                        style={{ 
                          width: 50, 
                          height: 25, 
                          background: notificationsEnabled ? '#2cb67d' : '#666', 
                          borderRadius: 25, 
                          position: 'relative',
                          cursor: 'pointer'
                        }}
                        onClick={toggleNotifications}
                      >
                        <motion.div 
                          animate={{ x: notificationsEnabled ? 25 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          style={{ 
                            width: 20, 
                            height: 20, 
                            background: '#fff', 
                            borderRadius: '50%', 
                            position: 'absolute',
                            top: 2.5,
                            left: 2.5
                          }} 
                        />
                      </motion.div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Auto-refresh</span>
                      <motion.div 
                        whileTap={{ scale: 0.9 }}
                        style={{ 
                          width: 50, 
                          height: 25, 
                          background: autoRefreshEnabled ? '#7f5af0' : '#666', 
                          borderRadius: 25, 
                          position: 'relative',
                          cursor: 'pointer'
                        }}
                        onClick={toggleAutoRefresh}
                      >
                        <motion.div 
                          animate={{ x: autoRefreshEnabled ? 25 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          style={{ 
                            width: 20, 
                            height: 20, 
                            background: '#fff', 
                            borderRadius: '50%', 
                            position: 'absolute',
                            top: 2.5,
                            left: 2.5
                          }} 
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Floating Web3 Hero (bottom-right) */}
      <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 100 }}>
        <div style={{ width: 80, height: 80, filter: 'drop-shadow(0 4px 16px #7f5af0aa)' }}>
          <Web3Hero size={80} />
        </div>
      </div>
    </div>
  )
}

export default App
