import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import ProductsPage from './pages/ProductsPage';
import RawMaterialsPage from './pages/RawMaterialsPage';
import ProductionPage from './pages/ProductionPage';

function App() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>📦 Stock Control</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Products</Nav.Link>
              <Nav.Link as={Link} to="/raw-materials">Raw Materials</Nav.Link>
              <Nav.Link as={Link} to="/production">Production</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="main-container">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/raw-materials" element={<RawMaterialsPage />} />
          <Route path="/production" element={<ProductionPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
