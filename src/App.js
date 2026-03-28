import './App.css';

function Navbar() {
  return (
    <div className="navbar">
      <h1>Homely</h1>
      <p>Bangalore's home food community</p>
    </div>
  );
}

function OptionCard({ icon, title, description }) {
  return (
    <div className="option-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Navbar />

      <div className="hero">
        <h2>Real home food, made with love</h2>
        <p>Order from home cooks near you in Bangalore</p>
      </div>

      <div className="options">
        <OptionCard
          icon="👩‍🍳"
          title="Cook"
          description="Register and sell your home food"
        />
        <OptionCard
          icon="🍱"
          title="Customer"
          description="Order fresh homemade food"
        />
        <OptionCard
          icon="❤️"
          title="Donate Meal"
          description="Feed nearby orphanages"
        />
        <OptionCard
          icon="⭐"
          title="Reviews"
          description="See what people are saying"
        />
        <OptionCard
          icon="🎁"
          title="Membership"
          description="Special offers and discounts"
        />
      </div>

      <div className="food-banner">
        <h2>No investment. No risk. Just cook!</h2>
        <p>Women at home can earn by sharing what they love making</p>
      </div>

    </div>
  );
}

export default App;