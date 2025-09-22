import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import HeroSection from './Hero Section.jsx';  

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <HeroSection />
        {/* Other main content can go here */}
      </main>
      <Footer />
    </>
  );
}

export default App;