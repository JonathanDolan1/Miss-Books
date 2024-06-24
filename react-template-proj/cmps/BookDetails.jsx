import { bookService } from "../services/book.service.js"

const { useEffect, useState, useRef } = React

const { useParams, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const { bookId } = useParams()

    const nextBookId = useRef()

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => console.log('error getting book details :', err))

        bookService.getNextBookId(bookId)
            .then(id => nextBookId.current = id)
            .catch(err => console.log('error getting the next book ID: ', err))

    }, [bookId])

    if (!book) return <section>Loading...</section>

    const { title, thumbnail, description, listPrice } = book

    const { amount, currencyCode, isOnSale } = listPrice

    let currencySign
    switch (currencyCode) {
        case 'USD':
            currencySign = '$'
            break
        case 'EUR':
            currencySign = '€'
            break
        case 'ILS':
            currencySign = '₪'
            break
    }



    return (
        <section className="book-details">
            <h3 className="book-title">{title}</h3>
            <img className="book-img" src={thumbnail} alt={`Cover of ${title}`} />
            <p className="book-description">{description}</p>
            <div className="book-price">{currencySign + amount}</div>
            {/* {isOnSale && <OnSaleSign />} */}
            <button><Link to="/book">Back</Link></button>
            <button><Link to={`/book/${nextBookId.current}`}>Next</Link></button>
        </section>
    )
}