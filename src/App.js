import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SketchPage from './pages/SketchPage'
import SketchesNav from './components/SketchesNav/SketchesNav';
import './App.css';

function App() {

  return (
          <>
          <Router>
          <SketchesNav />
          <Routes>
            <Route path='/' element={<SketchPage />} />
            <Route path='/:id' element={<SketchPage />} />
          </Routes>
        </Router>
        </>
  );
}

export default App;
