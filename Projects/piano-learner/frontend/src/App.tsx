import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import LandingPage from './components/landingPage/LandingPage';
import Footer from './components/footer/Footer';
import Profile from './components/profile/Profile';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          {/* Route für die Startseite */}
          <Route path="/" element={<LandingPage />} />
          {/* Route für die Profilseite */}
          <Route path="/profile" element={<Profile />} />

          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
