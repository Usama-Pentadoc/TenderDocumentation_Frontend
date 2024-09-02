import React from 'react'
import { Col, Row} from 'reactstrap';
import '../Style/Navbar.css'
import PentaDocLogo from '../Logo/Word Logo_PD.png'

const Navbar = () => {
  return (
    <>
    <Row className='navbar-container'>
        <Col>
        <img src={PentaDocLogo} alt="Example" style={{ maxWidth: '100%', height: '30%' }} />
        </Col>
    </Row>
    </>

  )
}

export default Navbar