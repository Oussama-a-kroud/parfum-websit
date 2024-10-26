import React from 'react'
import { Row, Col } from 'react-bootstrap'
import avatar from '../../images/avatar.png'
import add from '../../images/add.png'
const AdminAddProducts = () => {


    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">ajouter un produit</div>
                <Col sm="8">
                    <div className="text-form pb-2"> photo de produit </div>
                    <img src={avatar} alt="" height="100px" width="120px" />
                    <input
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="nom de produit "
                    />
                    <textarea
                        className="input-form-area p-2 mt-3"
                        rows="4"
                        cols="50"
                        placeholder="description "
                    />
                    <input
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="prix "
                    />
                    {/* <input
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="سعر المنتج"
                    /> */}
                    <select
                        name="languages"
                        id="lang"
                        className="select input-form-area mt-3 px-2 ">
                        <option value="val">categories </option>
                        <option value="val"> categories 1</option>
                        <option value="val"> categories 2</option>
                        <option value="val2">categories 3</option>
                        <option value="val2">categories 4 </option>
                        <option value="val2">categories 5 </option>
                    </select>

                    {/* <select
                        name="brand"
                        id="brand"
                        className="select input-form-area mt-3 px-2 ">
                        <option value="val">marque</option>
                        <option value="val2">التصنيف الماركة الاولي</option>
                        <option value="val2">التصنيف الماركة الثانيه</option>
                        <option value="val2">التصنيف الرابع</option>
                    </select> */}
                   
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button className="btn-save d-inline mt-2 "> enregistrer la modification</button>
                </Col>
            </Row>
        </div>
    )
}

export default AdminAddProducts
