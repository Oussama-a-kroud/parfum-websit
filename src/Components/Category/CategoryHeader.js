import React from 'react'
import { Container,Row ,Col} from 'react-bootstrap'

const CategoryHeader = () => {
    return (
        <div className="cat-header">
      <Container>
        <Row>
          <Col className="d-flex justify-content-start py-2 flex-wrap">
            <div className="cat-text-header ">tout</div>
            <div className="cat-text-header">Category1</div>
            <div className="cat-text-header">Category2</div>
            <div className="cat-text-header"> Category3</div>
            <div className="cat-text-header">Category4</div>
            <div className="cat-text-header">Category5</div>
            <div className="cat-text-header">Category6</div>
            <div className="cat-text-header">Category7</div>
            <div className="cat-text-header">Category8</div>
            <div className="cat-text-header">Category9</div>
          </Col>
        </Row>
      </Container>
    </div>
    )
}

export default CategoryHeader
