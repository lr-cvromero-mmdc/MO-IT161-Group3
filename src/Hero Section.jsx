import './Hero Section.css';
import './Book Now Button.css'; 

function HeroSection() {
  return (
    <section className="hero-section">
      <a href="/" className="espinosas-car-wash">
        ESPINOSA’S CAR WASH LOCATOR
      </a>

      <div className="where-cars-come">
        Where Cars Come to Shine
      </div>

      <div className="family-owned-meticulous-hand">
        Family-owned. Meticulous hand washing & detailing at neighborhood-friendly pricing.
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Enter city or postcode"
          className="enter-city-or"
        />
        <a href="#location" className="or-use-your">
          Or use your current location
        </a>
      </div>

      <div className="hero-button-wrapper">
        <a href="#book" className="btn-book-now">
          Book Now
        </a>
      </div>
    </section>
  );
}

export default HeroSection;