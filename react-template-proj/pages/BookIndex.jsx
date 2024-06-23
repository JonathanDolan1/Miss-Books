import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "../cmps/BookDetails.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, SetFilterBy] = useState({})
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        loadBooks(filterBy)
    }, [filterBy])

    function loadBooks() {
        bookService.query()
            .then(books => {
                setBooks(books)
            })
            .catch(err => console.log('error fetching books : ', err))
    }

    function onSelectBook(id) {
        setSelectedBookId(id)
    }

    function onRemoveBook(id){
        bookService.remove(id)
            .then(setBooks(prevBooks=>prevBooks.filter(book=>book.id!==id)))
            .catch(err=>console.log('issue with removing the book : ', err))
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {!selectedBookId && <BookList books={books} onSelectBook={onSelectBook} onRemoveBook={onRemoveBook} />}
            {selectedBookId && <BookDetails bookId={selectedBookId} onBack={() => setSelectedBookId(null)} />}
        </section>

    )
}