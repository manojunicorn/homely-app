import React, { useState } from 'react';
import styles from './CustomerPage.module.css';

const foods = [
  { id:1, emoji:'🍛', name:'Chicken Biryani', cook:'Meena Amma', area:'Jayanagar', price:120, rating:4.8, veg:false, category:'Lunch', cuisine:'South Indian' },
  { id:2, emoji:'🥣', name:'Poha & Chutney', cook:'Radha Akka', area:'Koramangala', price:60, rating:4.6, veg:true, category:'Breakfast', cuisine:'South Indian' },
  { id:3, emoji:'🫓', name:'Aloo Paratha Set', cook:'Sunita Didi', area:'Indiranagar', price:80, rating:4.7, veg:true, category:'Breakfast', cuisine:'North Indian' },
  { id:4, emoji:'🍱', name:'Dal Rice Thali', cook:'Lakshmi Akka', area:'BTM Layout', price:100, rating:4.5, veg:true, category:'Lunch', cuisine:'South Indian' },
  { id:5, emoji:'🥘', name:'Mutton Curry Rice', cook:'Fatima Bi', area:'Shivajinagar', price:150, rating:4.9, veg:false, category:'Lunch', cuisine:'North Indian' },
  { id:6, emoji:'🫙', name:'Idli Sambar (4 pcs)', cook:'Savitha Amma', area:'Marathahalli', price:50, rating:4.7, veg:true, category:'Tiffin', cuisine:'South Indian' },
  { id:7, emoji:'🍝', name:'Rajma Chawal', cook:'Sunita Didi', area:'Indiranagar', price:90, rating:4.4, veg:true, category:'Lunch', cuisine:'North Indian' },
  { id:8, emoji:'🪔', name:'Rava Dosa Set', cook:'Meena Amma', area:'Jayanagar', price:70, rating:4.8, veg:true, category:'Tiffin', cuisine:'South Indian' },
];

const bgColors = { Lunch:'#FAECE7', Breakfast:'#FAEEDA', Tiffin:'#EAF3DE' };

const sideFilters = [
  { label:'Category', items:[
    { name:'All', color:'#888780', count:8 },
    { name:'Breakfast', color:'#EF9F27', count:3 },
    { name:'Lunch', color:'#D85A30', count:4 },
    { name:'Tiffin', color:'#1D9E75', count:3 },
  ]},
  { label:'Cuisine', items:[
    { name:'South Indian', color:'#378ADD', count:5 },
    { name:'North Indian', color:'#D4537E', count:3 },
  ]},
  { label:'Diet', items:[
    { name:'Veg', color:'#639922', count:6 },
    { name:'NonVeg', color:'#A32D2D', count:2 },
  ]},
];

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2);
}

export default function CustomerPage() {
  const [cart, setCart] = useState({});
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('rating');
  const [toast, setToast] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const addToCart = (id) => {
    setCart(prev => ({ ...prev, [id]: 1 }));
    showToast('Added to cart!');
  };

  const changeQty = (id, delta) => {
    setCart(prev => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const cartTotal = Object.values(cart).reduce((a, b) => a + b, 0);

  const filtered = foods
    .filter(f => {
      if (activeFilter === 'Veg') return f.veg;
      if (activeFilter === 'NonVeg') return !f.veg;
      if (activeFilter === 'South Indian' || activeFilter === 'North Indian') return f.cuisine === activeFilter;
      if (activeFilter !== 'All') return f.category === activeFilter;
      return true;
    })
    .filter(f =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.cook.toLowerCase().includes(search.toLowerCase()) ||
      f.area.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'price_low') return a.price - b.price;
      return b.price - a.price;
    });

  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <div className={styles.logo}>Home<em>ly</em></div>
        <div className={styles.navCenter}>
          <span className={styles.pin}></span> Bangalore
        </div>
        <div className={styles.cartWrap} onClick={() => showToast(cartTotal ? `${cartTotal} item(s) — checkout coming soon!` : 'Cart is empty')}>
          <div className={styles.cartIcon}>🛒</div>
          <div className={styles.cartBubble}>{cartTotal}</div>
        </div>
      </nav>

      <div className={styles.hero}>
        <div className={styles.heroEyebrow}>Fresh · Home-cooked · Bangalore</div>
        <h1 className={styles.heroTitle}>Food made with<br /><em>love & tradition</em></h1>
        <p className={styles.heroSub}>Order from real home cooks near you. No restaurants, just amma's kitchen.</p>
        <div className={styles.searchPill}>
          <input
            placeholder="Search dishes, cooks, areas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button>Search</button>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.sidebar}>
          {sideFilters.map(section => (
            <div key={section.label}>
              <div className={styles.sidebarLabel}>{section.label}</div>
              {section.items.map(item => (
                <button
                  key={item.name}
                  className={`${styles.sideChip} ${activeFilter === item.name ? styles.active : ''}`}
                  onClick={() => setActiveFilter(item.name)}
                >
                  <span className={styles.chipDot} style={{ background: item.color }}></span>
                  {item.name}
                  <span className={styles.chipCount}>{item.count}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.sortRow}>
            <p className={styles.resultTxt}>
              Showing <strong>{filtered.length} dish{filtered.length !== 1 ? 'es' : ''}</strong> near you
            </p>
            <select value={sort} onChange={e => setSort(e.target.value)} className={styles.sortSelect}>
              <option value="rating">Top rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>

          <div className={styles.grid}>
            {filtered.map(f => (
              <div key={f.id} className={styles.card}>
                <div className={styles.cardThumb} style={{ background: bgColors[f.category] || '#F1EFE8' }}>
                  <span style={{ fontSize: 52 }}>{f.emoji}</span>
                  <div className={`${styles.vegDot} ${f.veg ? styles.veg : styles.nonveg}`}></div>
                  <div className={styles.starsBadge}>★ {f.rating}</div>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.dish}>{f.name}</div>
                  <div className={styles.cookLine}>
                    <span className={styles.av}>{getInitials(f.cook)}</span>
                    {f.cook} · {f.area}
                  </div>
                  <div className={styles.cardFoot}>
                    <div className={styles.price}>₹{f.price} <span>/ serving</span></div>
                    {cart[f.id] ? (
                      <div className={styles.qtyCtrl}>
                        <button className={styles.qb} onClick={() => changeQty(f.id, -1)}>−</button>
                        <span className={styles.qn}>{cart[f.id]}</span>
                        <button className={styles.qb} onClick={() => changeQty(f.id, 1)}>+</button>
                      </div>
                    ) : (
                      <button className={styles.addBtn} onClick={() => addToCart(f.id)}>+ Add</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.donateStrip} onClick={() => showToast('Donate Meal feature coming soon!')}>
            <span className={styles.donateIcon}>🤲</span>
            <div className={styles.donateText}>
              <h3>Donate a meal to an orphanage</h3>
              <p>Your ₹80 feeds a child today. Tap to contribute.</p>
            </div>
            <span className={styles.donateArrow}>→</span>
          </div>
        </div>
      </div>

      <div className={`${styles.toast} ${toastVisible ? styles.toastShow : ''}`}>{toast}</div>
    </div>
  );
}