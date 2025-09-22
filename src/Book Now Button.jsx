import './Book Now Button.css'; // Move your .btn-book-now styles here
function BookNowButton({ link = "#booking", text = "Book Now" }) {
  return (
    <a href={link} className="btn-book-now">
      {text}
    </a>
  );
}

export default BookNowButton;