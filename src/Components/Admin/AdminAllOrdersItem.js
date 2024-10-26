import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import mobile from '../../images/dwa2.png'
const AdminAllOrdersItem = () => {
    return (
        <Col sm="12">
            <Link
                to="/admin/orders/23"
                className="cart-item-body my-2 px-1 d-flex"
                style={{ textDecoration: "none" }}>
                <img width="160px" height="197px" src={mobile} alt="" />
                <div className="w-100">
                    <Row className="justify-content-between">
                        <Col sm="12" className=" d-flex flex-row justify-content-between">
                            <div className="d-inline pt-2 cat-text">  command n #3</div>
                            <div className="d-inline pt-2 cat-text">supprimer</div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-2">
                        <Col sm="12" className=" d-flex flex-row justify-content-start">
                            <div className="d-inline pt-2 cat-title">
                    dwa mzayan khasso gha description
                            </div>
                            <div className="d-inline pt-2 cat-rate me-2">4.5</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" className=" d-flex">
                            <div className="mt-2  cat-text d-inline">Marque :</div>
                            <div className="mt-1 barnd-text d-inline mx-1">dwa </div>
                            
                        </Col>
                    </Row>

                    <Row className="justify-content-between">
                        <Col sm="12" className=" d-flex flex-row justify-content-between">
                            <div className="d-inline pt-2 d-flex">
                                <div className="cat-text pt-1 d-inline">quantite</div>
                                <input
                                    className="mx-2 mt-1"
                                    type="number"
                                    style={{ width: "40px", height: "25px" }}
                                />
                            </div>
                            <div className="d-inline pt-2 barnd-text">3000 mad </div>
                        </Col>
                    </Row>
                </div>
            </Link>
        </Col>
    )
}

export default AdminAllOrdersItem
