import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BigText from './components/BigText';
import NotFound from './components/NotFound';
import TopBar from './components/TopBar';
import PlanetDetail from './components/PlanetDetail';
import PersonDetail from './components/PersonDetail';
import StarshipDetail from './components/StarshipDetail';




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
      <body>
      <div class="height">
        <TopBar />
          <Routes>
            <Route path="/" element={<Navigate to="/main-page" replace />} />
            <Route path="/main-page" element={<BigText />} />
            <Route path="/planets/:id" element={<PlanetDetail />} />
            <Route path="/people/:id" element={<PersonDetail />} />
            <Route path="/starships/:id" element={<StarshipDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
      </body>
    </Router>
  );
}

export default App;
