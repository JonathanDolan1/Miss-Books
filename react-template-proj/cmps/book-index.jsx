import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, SetFilterBy] = useState({})

    useEffect(() => {
        loadBooks(filterBy)
    }, [filterBy])
    
    function loadBooks() {
        bookService.query()
        .then(books => {
            setBooks(books)
        })
        .catch(err => console.log('error fetching books: ', err))
    }
    
    console.log('books: ' ,books)

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">

        </section>
    )
}