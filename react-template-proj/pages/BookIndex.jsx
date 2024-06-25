const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "../cmps/BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { showSuccessMsg , showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterBy())
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        loadBooks(filterBy)
    }, [filterBy])

    function loadBooks(filterBy) {
        bookService.query(filterBy)
            .then(books => {
                setBooks(books)
            })
            .catch(err => showErrorMsg(`Issues with getting books from service: ` + err))
    }

    function onSelectBook(id) {
        setSelectedBookId(id)
    }

    function onRemoveBook(id) {
        bookService.remove(id)
            .then(()=>{
                setBooks(prevBooks => prevBooks.filter(book => book.id !== id))
                showSuccessMsg(`Book ${id} removed succesfuly`)
            })
            .catch(err => showErrorMsg(`Issues with removing book ${id}: ` + err))
    }

    function onSetFilter(filterBy) {
        console.log(filterBy);
        setFilterBy({ ...filterBy })
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <button><Link to="/book/edit">Add Book</Link></button>
            <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <BookList books={books} onSelectBook={onSelectBook} onRemoveBook={onRemoveBook} />
        </section>
    )
}