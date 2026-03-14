import React from "react";
import Book from "../../../model/Book";
import SachModel from "../../../model/SachModel";

interface SachPropsInterface{
    sach: SachModel;
}

const SachProps: React.FC<SachPropsInterface> = (props) => {
    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                <img
                    src={""}
                    className="card-img-top"
                    alt={props.sach.tenSach}
                    style={{ height: '200px' }}
                />
                <div className="card-body">
                    <h5 className="card-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{props.sach.tenSach}</h5>
                    <p className="card-text" style={{ 
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        height: '3rem' // Adjust based on line-height to keep layout consistent
                    }}>
                        {props.sach.moTa}
                    </p>
                    <div className="price">
                        <span className="original-price">
                            <del>{props.sach.giaNiemYet}</del>
                        </span>
                        <span className="discounted-price">
                            <strong>{props.sach.giaBan}</strong>
                        </span>
                    </div>

                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SachProps;   