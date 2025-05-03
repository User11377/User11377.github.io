import './App.css';
import Header from './components/header/Header'
import LandingPage from './components/landingPage/LandingPage';
import Footer from './components/footer/Footer';
//Router Datei, sie routet zu den richtigen dateien


function App() {
  return (
    <div className="app">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
