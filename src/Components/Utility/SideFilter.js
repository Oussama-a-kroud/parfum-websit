import React from 'react'
import { Row } from 'react-bootstrap'

const SideFilter = () => {
    return (
        <div className="mt-3">
        <Row>
          <div className="d-flex flex-column mt-2">
            <div className="filter-title">catégorie </div>
            <div className="d-flex mt-3">
              <div className="filter-sub me-2 ">tout </div>

              <input type="checkbox" value="" />
            </div>
            <div className="d-flex mt-2">
              <div className="filter-sub me-2 ">category1</div>

              <input type="checkbox" value="" />
            </div>
            <div className="d-flex mt-2">
              <div className="filter-sub me-2 ">category2 </div>

              <input type="checkbox" value="" />
            </div>
            <div className="d-flex mt-2">
              <div className="filter-sub me-2 ">category3 </div>

              <input type="checkbox" value="" />
            </div>
            <div className="d-flex mt-2">
              <div className="filter-sub me-2 ">category4 </div>

              <input type="checkbox" value="" />
            </div>
          </div>
  
          <div className="d-flex flex-column mt-2">
            <div className="filter-title mt-3">Marque</div>
            <div className="d-flex mt-3">
              <div className="filter-sub me-2 ">tout</div>

              <input type="checkbox" value="" />
            </div>
            <div className="d-flex mt-2">
              <div className="filter-sub me-2 ">Marque1</div>

              <input type="checkbox" value="" />
            </div>
            <div className="d-flex mt-2">
              <div className="filter-sub me-2 ">Marque2</div>

              <input type="checkbox" value="" />
            </div>
          </div>
  
          <div className="filter-title my-3">Prix</div>
          <div className="d-flex">
            <p className="filter-sub my-2">de:</p>
            <input
              className="m-2 text-center"
              type="number"
              style={{ width: "50px", height: "25px" }}
            />
          </div>
          <div className="d-flex">
            <p className="filter-sub my-2">â :</p>
            <input
              className="m-2 text-center"
              type="number"
              style={{ width: "50px", height: "25px" }}
            />
          </div>
        </Row>
      </div>
    )
}

export default SideFilter
