import logo from './logo.svg';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Container } from 'react-bootstrap';

import Home from './screens/Home';
import Detail from './screens/Detail';
import Navigation from './partials/Navigation';

function App() {
  return (
    <AlertProvider template={AlertTemplate}>
      <BrowserRouter>
        <Container>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path=':id/detail' element={<Detail /> } />
          </Routes>
        </Container>
        
      </BrowserRouter>
    </AlertProvider>
  );
}

export default App;
