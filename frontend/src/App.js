import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BigText from './components/BigText';
import NotFound from './components/NotFound';




// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/main-page" replace/>} />
//         <Route path="/main-page" element={<BigText />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }
function App() {
  return (
    <Router>
      <div className="container">
        <TopBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/main-page" replace />} />
            <Route path="/main-page" element={<BigText />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
