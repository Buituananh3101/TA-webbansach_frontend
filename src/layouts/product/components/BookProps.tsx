import React from "react";
import Book from "../../../model/Book";

interface BookProps {
    book: Book;
}

const BookProps: React.FC<BookProps> = ({ book }) => {
    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                <img
                    src={book.imageUrl}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: '200px' }}
                />
                <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{book.description}</p>
                    <div className="price">
                        <span className="original-price">
                            <del>{book.originalPrice}</del>
                        </span>
                        <span className="discounted-price">
                            <strong>{book.price}</strong>
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

export default BookProps;   