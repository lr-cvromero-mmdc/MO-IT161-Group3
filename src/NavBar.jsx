import './NavBar.css';
import './Book Now Button.css'; 

function NavBar() {
  return (
    <nav className="navbar" role="navigation">
      <div className="rectangle" />

      <div className="navibar">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#locations">Locations</a>
        <a href="#store">Store</a>
        <a href="#contact">Contact</a>
      </div>

      <div className="group">
        <a href="#book" className="btn-book-now">Book Now</a>
      </div>
    </nav>
  );
}

export default NavBar;