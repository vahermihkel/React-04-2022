import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NavigationBar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
      <Navbar.Brand as={Link} to="/"> <img src="/webshio.png" alt="" /> </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/admin">{t('navbar.admin-button')}</Nav.Link>
        <Nav.Link as={Link} to="/ostukorv">{t('navbar.cart-button')}</Nav.Link>
        <Nav.Link as={Link} to="/poed">{t('Poed')}</Nav.Link>
      </Nav>
      </Container>
      <img onClick={() => changeLanguage('ee')} className='lang' src="/lang/estonia.png" alt="" />
      <img onClick={() => changeLanguage('ru')} className='lang' src="/lang/russia.png" alt="" />
      <img onClick={() => changeLanguage('en')} className='lang' src="/lang/uk.png" alt="" />
    </Navbar>
  )
}

export default NavigationBar;