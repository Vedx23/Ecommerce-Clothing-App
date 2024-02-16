import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Modal, Container, Row, Col } from 'react-bootstrap';
import Navbar from '../Components/Navbar';

//
const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  //---------------------------------
  const getOrderDetails = (id)=>{
    console.log(id)
    axios.get("http://127.0.0.1:7070/user/orderDetails/"+id )
          .then(res => {
            console.log(res.data)
            setOrderDetail(res.data)
          })
          .catch(err=>console.log(err))
  }

  //-------------------------------
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const getOrders = () => {
    axios.get("http://127.0.0.1:7070/user/orders/" + sessionStorage.getItem("userId"))
        .then(res => {
          setOrders(res.data)
        })
  }

  useEffect(() => {
    getOrders();
  }, [])

  return (
   <>
   <Navbar/>
   <div>
      <div className="container mt-5 col-sm-6">
      <h2>Order List</h2>
      <ListGroup>
        {orders.map((order) => (
          <ListGroup.Item
            key={order.id}
            action
            onClick={() => handleOrderClick(order)}
          >
            <div onClick={() => getOrderDetails(order.id)}>
              <div>Order Number: {order.id}</div>
              <div>Order Date: {order.orderDate}</div>
              <div>Total: {order.total}</div>
            </div>
            
          </ListGroup.Item>
        ))}
      </ListGroup>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details - {selectedOrder?.orderNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <Container>
              {/* <Row>
                <Col>
                  <p>Items: </p>
                  <p>Total: </p>
                </Col>
              </Row> */}
              {
                orderDetail.map(orderDtl =>{
                  return ( <Row key={orderDtl.id}>
                    <Col>
                      <p>Items: {orderDtl.product.name} </p>
                      <p>Quantity: {orderDtl.quantity} </p>
                      <p>Total: {orderDtl.product.price * orderDtl.quantity}</p>
                    </Col>
                    <hr></hr>
                  </Row> );
                })

              }
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
   </>
  );
};

export default Orders;
