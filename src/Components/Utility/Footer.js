import React from 'react'
import { Container, Col ,Row} from "react-bootstrap";
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import twitter from "../../images/twitter.png";
import phone from "../../images/phone.png";
const Footer = () => {
    return (
        <div className="footer-background footer  bg-dark bg-gradient " style={{ maxHeight: "50px"}}>
            <Container className="">
                <Row className="d-flex justify-content-between align-items-center ">
                    <Col sm="6" className="d-flex align-items-center">
                        <div className="footer-shroot text-light"> Termes et conditions</div>
                        <div className="footer-shroot mx-2 text-light">Confidentialité</div>
                        <div className="footer-shroot mx-2 text-light">Contactez-nous </div>
                    </Col>
                    <Col
                        sm="6"
                        className="d-flex justify-content-end align-items-center ">
                        <div className="d-flex pt-3 mx-2 ">
                            <img width="20px" height="20px" src={phone} alt="" />
                            <p className="footer-phone">0666050979</p>
                        </div>
                        <div style={{ cursor: "pointer" }}>
                            <img width="20px" height="20px" src={facebook} alt="" />
                        </div>
                        <div style={{ cursor: "pointer" }} className="">
                            <img width="20px" height="20px" src={instagram} alt="" />
                        </div>
                        <div style={{ cursor: "pointer" }} className="">
                            <img width="20px" height="20px" src={twitter} alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
