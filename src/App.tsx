// App.tsx - Main application component
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import './App.css';
// import { HashRouter as Router } from 'react-router-dom';

// const App: React.FC = () => {
//   return (
//     <Router>
//       <div className="app">
//         <Navbar />
//         <main className="main-content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
