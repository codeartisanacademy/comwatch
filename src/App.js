import logo from './logo.svg';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './screens/Home';
import Detail from './screens/Detail';
import Navigation from './partials/Navigation';
import Register from './screens/Register';
import Login from './screens/Login';
import Profile from './screens/Profile';

function App() {
  return (
      <BrowserRouter>
        <Container>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path=':id/detail' element={<Detail /> } />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='profile' element={<Profile />} />
          </Routes>
        </Container>
        
      </BrowserRouter>
  );
}

export default App;
