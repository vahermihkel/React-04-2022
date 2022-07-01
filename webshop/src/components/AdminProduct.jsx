import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from "react-bootstrap";
import { useState } from 'react';

function AdminProduct(props) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState();

  const handleClose = () => setShow(false);
  
  const handleShow = (productClicked) => {
    setShow(true);
    setItemToBeDeleted(productClicked);
  };

  const deleteProduct = (productClicked) => {
    const index = props.originalProducts.findIndex(element => element.id === productClicked.id);
    props.originalProducts.splice(index,1);
    toast.success(t("Edukalt kustutatud"));
    props.updateProducts();
  }

  const changeActive = (productClicked) => {
    const index = props.originalProducts.indexOf(productClicked);
    props.originalProducts[index].isActive = !props.originalProducts[index].isActive;
    props.updateProducts();
  }

  const decreaseStock = (productClicked) => {
    const index = props.originalProducts.indexOf(productClicked);
    if (props.originalProducts[index].stock > 0) {
      props.originalProducts[index].stock--;
      props.updateProducts();
    }
  }

  const increaseStock = (productClicked) => {
    const index = props.originalProducts.indexOf(productClicked);
    if (props.originalProducts[index].stock === undefined) {
      props.originalProducts[index].stock = 0;
    }
    props.originalProducts[index].stock++;
    props.updateProducts();
  }

  const confirmDelete = () => {
    handleClose();
    deleteProduct(itemToBeDeleted);
  }

  return ( 
  <div className={`cartProduct ${props.element.isActive ? "active": "inactive"} `}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Oled kustutamas toodet</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kui kustutad, siis enam tagasi võtta ei saa!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Katkesta
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Kustuta
          </Button>
        </Modal.Footer>
      </Modal>
    <div onClick={() => changeActive(props.element)}>
      <img className="cartProductImg" src={props.element.imgSrc} alt="Toote pilt" />
      <div>{props.element.id}</div>
      <div>{props.element.name}</div>
      <div>{props.element.description}</div>
      <div>{props.element.price} €</div>
      {/* <div>{props.element.stock ? props.element.stock : 0} tk</div> */}
    </div>
    <button disabled={!props.element.stock} onClick={() => decreaseStock(props.element)}>-</button>
    <div>{props.element.stock ?? 0} tk</div>
    <button onClick={() => increaseStock(props.element)}>+</button>
    {/* <button onClick={() => deleteProduct(props.element)}>X</button> */}
    <button onClick={() => handleShow(props.element)}>X</button>
  </div> );
}

export default AdminProduct;