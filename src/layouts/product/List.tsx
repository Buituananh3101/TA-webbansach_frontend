import React from "react";
import Book from "../../model/Book";
import BookProps from "./components/BookProps";

const List: React.FC = () => {
    const books: Book[] = [
        { id: 1, title: 'Book 1', description: 'Description for Book 1', originalPrice: 50000, price: 45000, imageUrl: './../../../images/book/i1.png' },
        { id: 2, title: 'Book 2', description: 'Description for Book 2', originalPrice: 60000, price: 55000, imageUrl: './../../../images/book/i1.png' },
        { id: 3, title: 'Book 3', description: 'Description for Book 3', originalPrice: 70000, price: 65000, imageUrl: './../../../images/book/i1.png' },
        { id: 4, title: 'Book 4', description: 'Description for Book 4', originalPrice: 80000, price: 75000, imageUrl: './../../../images/book/i1.png' },
        { id: 5, title: 'Book 5', description: 'Description for Book 5', originalPrice: 90000, price: 85000, imageUrl: './../../../images/book/i1.png' },
        { id: 6, title: 'Book 6', description: 'Description for Book 6', originalPrice: 100000, price: 95000, imageUrl: './../../../images/book/i1.png' },
        { id: 7, title: 'Book 7', description: 'Description for Book 7', originalPrice: 110000, price: 105000, imageUrl: './../../../images/book/i1.png' },
        { id: 8, title: 'Book 8', description: 'Description for Book 8', originalPrice: 120000, price: 115000, imageUrl: './../../../images/book/i1.png' },
        { id: 9, title: 'Book 9', description: 'Description for Book 9', originalPrice: 130000, price: 125000, imageUrl: './../../../images/book/i1.png' },
        { id: 10, title: 'Book 10', description: 'Description for Book 10', originalPrice: 140000, price: 135000, imageUrl: './../../../images/book/i1.png' },
        { id: 11, title: 'Book 11', description: 'Description for Book 11', originalPrice: 150000, price: 145000, imageUrl: './../../../images/book/i1.png' },
        { id: 12, title: 'Book 12', description: 'Description for Book 12', originalPrice: 160000, price: 155000, imageUrl: './../../../images/book/i1.png' },
        { id: 13, title: 'Book 13', description: 'Description for Book 13', originalPrice: 170000, price: 165000, imageUrl: './../../../images/book/i1.png' },
        { id: 14, title: 'Book 14', description: 'Description for Book 14', originalPrice: 180000, price: 175000, imageUrl: './../../../images/book/i1.png' },
        { id: 15, title: 'Book 15', description: 'Description for Book 15', originalPrice: 190000, price: 185000, imageUrl: './../../../images/book/i1.png' },
    ]
    return (
        <div className="container">
            <div className="row mt-4">
                {
                    books.map(book => (
                        <BookProps key={book.id} book={book} />
                    ))
                }
            </div>
        </div>
    );
}

export default List;