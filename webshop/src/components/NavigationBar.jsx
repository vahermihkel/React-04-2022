import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { cartSumService } from '../services/cartSumService';

function NavigationBar() {
  const { t, i18n } = useTranslation();

  const calculateSumOfCart = () => {
    let cartProducts = JSON.parse(sessionStorage.getItem("cartProducts")) || [];
    let sumOfCart = 0;
    cartProducts.forEach(element => sumOfCart += element.product.price * element.quantity );
    return sumOfCart;
  }

  const [cartSum, setCartSum] = useState(calculateSumOfCart());

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  }

  cartSumService.getCartSum().subscribe(newSum => setCartSum(newSum));

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
      <Navbar.Brand as={Link} to="/"> <img src="/webshio.png" alt="" /> </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/admin">{t('navbar.admin-button')}</Nav.Link>
        <Nav.Link as={Link} to="/poed">{t('Poed')}</Nav.Link>
        <Nav.Link as={Link} to="/meist">{t('Meist')}</Nav.Link>
        <Nav.Link as={Link} to="/ostukorv">{t('navbar.cart-button')} - {cartSum} €</Nav.Link>
      </Nav>
      </Container>
      <img onClick={() => changeLanguage('ee')} className='lang' src="/lang/estonia.png" alt="" />
      <img onClick={() => changeLanguage('ru')} className='lang' src="/lang/russia.png" alt="" />
      <img onClick={() => changeLanguage('en')} className='lang' src="/lang/uk.png" alt="" />
    </Navbar>
  )
}

export default NavigationBar;