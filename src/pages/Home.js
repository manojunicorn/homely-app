import { useNavigate } from 'react-router-dom';

function OptionCard({ icon, title, description, path }) {
  const navigate = useNavigate();

  return (
    <div className="option-card" onClick={() => navigate(path)}>
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  return (
    <div>
      <div className="hero">
        <h2>Real home food, made with love</h2>
        <p>Order from home cooks near you in Bangalore</p>
      </div>

      <div className="options">
        <OptionCard
          icon="👩‍🍳"
          title="Cook"
          description="Register and sell your home food"
          path="/cook-register"
        />
        <OptionCard
          icon="🍱"
          title="Customer"
          description="Order fresh homemade food"
          path="/customer"
        />
        <OptionCard
          icon="❤️"
          title="Donate Meal"
          description="Feed nearby orphanages"
          path="/donate"
        />
        <OptionCard
          icon="⭐"
          title="Reviews"
          description="See what people are saying"
          path="/reviews"
        />
        <OptionCard
          icon="🎁"
          title="Membership"
          description="Special offers and discounts"
          path="/membership"
        />
      </div>

      <div className="food-banner">
        <h2>No investment. No risk. Just cook!</h2>
        <p>Women at home can earn by sharing what they love making</p>
      </div>
    </div>
  );
}

export default Home;