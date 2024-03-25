import DefaultLayout from './components/DefaultLayout';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Reservation from './pages/reservation';
import Dashboard from './pages/dashboard';
import "./stylesheets/tables.css"


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Navigate to='/reservation' />} />
          <Route path='' element={<DefaultLayout />} >
            <Route path='reservation' element={<Reservation />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
          {/* <Route path='/' element={<Navigate to={'/reservation'} />} />
          <Route path='/reservation' element={<DefaultLayout><Reservation /></DefaultLayout>} />
          <Route path='/dashboard' element={<DefaultLayout><Dashboard /></DefaultLayout>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
