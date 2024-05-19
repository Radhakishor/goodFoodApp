import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

export default function Carousel(){
    return (
    <div>
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
        <div className="carousel-caption" style={{'zIndex':'10'}}>
        <form className="d-flex ">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
        </div>
      <div className="carousel-item active">
        <img src="https://st2.depositphotos.com/1027198/9484/i/950/depositphotos_94849016-stock-photo-one-pot-pasta.jpg" className="d-block  " alt="..." style={{'height':'450px','width':'99%'}}/>
      </div>
      <div className="carousel-item">
      <img src="https://st2.depositphotos.com/1027198/9484/i/950/depositphotos_94849016-stock-photo-one-pot-pasta.jpg" className="d-block  " alt="..." style={{'height':'450px','width':'99%'}}/>
      </div>
      <div className="carousel-item">
      <img src="https://st2.depositphotos.com/1027198/9484/i/950/depositphotos_94849016-stock-photo-one-pot-pasta.jpg" className="d-block  " alt="..." style={{'height':'450px','width':'99%'}}/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  </div>
  )
}