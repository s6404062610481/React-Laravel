import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductList from './component/ProductList'
import CreateProduct from './component/CreateProduct';
import EditProduct from './component/EditProduct';

function App() {

  return (
    <BrowserRouter>
        <Navbar bg="primary">
            <Container>
                <Link to={"/"} className='navbar-brannd text-white'>
                    React & Laravel CRUD APP
                </Link>
            </Container>
        </Navbar>
            <Container className='mt-5'>
                <Row>
                    <Col md={12}>
                        <Routes>
                            <Route exact path='/' element={<ProductList/>} />
                            <Route exact path='/product/create' element={<CreateProduct/>} />
                            <Route exact path='/product/edit/:id' element={<EditProduct/>} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
    </BrowserRouter>
  )
}

export default App
