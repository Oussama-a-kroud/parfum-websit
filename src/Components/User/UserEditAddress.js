import React from 'react'
import { Row,Col } from 'react-bootstrap'

const UserEditAddress = () => {
    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-2"> modification d'adresse </div>
                <Col sm="8">
                    <input
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        value="home"
                        placeholder=" nom d'adresse exemple(home - work)"
                    />
                    <textarea
                        className="input-form-area p-2 mt-3"
                        rows="4"
                        cols="50"
                        value=" OULED TEIMA "
                        placeholder=" adresse"
                    />
                    <input
                        type="text"
                        value="0666050879"
                        className="input-form d-block mt-3 px-3"
                        placeholder="numero de telephone "
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button className="btn-save d-inline mt-2 ">enregistrer la modification  </button>
                </Col>
            </Row>
        </div>
    )
}

export default UserEditAddress
