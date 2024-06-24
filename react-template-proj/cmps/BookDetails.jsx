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

    const { title, subtitle, authors, publishedDate, pageCount, categories, thumbnail, language, description, listPrice } = book

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

    let fullLangName
    switch (language) {
        case 'en':
            fullLangName = 'English'
            break
        case 'sp':
            fullLangName = 'Spanish'
            break
        case 'he':
            fullLangName = 'Hebrew'
            break
        default:
            fullLangName = 'Unrecognized Language'
            break
    }

    function getDifficulty(){
        let difficulty = null
        if (pageCount>500) difficulty = ' - Serious Reading'
        else if (pageCount>200) difficulty = ' - Descent Reading'
        else if (pageCount<100) difficulty = ' -  Light Reading'
        return difficulty
    }

    function getDateStatus(){
        let dateStatus = null
        if (publishedDate>10) dateStatus = ' - Vintage'
        else if (publishedDate<1) dateStatus = ' - New'
        return dateStatus
    }

    function getPriceStatusClass(){
        let priceStatusClass = ''
        if (amount<20) priceStatusClass = 'green'
        if (amount>150) priceStatusClass = 'red'
        return priceStatusClass
    }

    return (
        <section className="book-details">
            <h3 className="book-title">Title: {title}</h3>
            <h4 className="book-subtitle">Subtitle: {subtitle} </h4>
            <div className="book-authors">Authors: {authors.join(', ').trimEnd()}</div>
            <div className="book-published-date">Published Date: {publishedDate+getDateStatus()}</div>
            <div className="book-page-count">Page Count: {pageCount+getDifficulty()}</div>
            <div className="book-categories">Categories: {categories.join(', ').trimEnd()}</div>
            <div className="book-lanuage">Language: {fullLangName}</div>
            <div className="book-thumbnail-container">
                {book.listPrice.isOnSale && (
                    <div className="on-sale">On-sale!</div>
                )}
                <img className ="book-thumbnail" src={book.thumbnail} alt={`Cover of ${title}`}/>
            </div>
            <p className="book-description">{description}</p>
            <div className={`book-price ${getPriceStatusClass()}`}>{currencySign + amount}</div>
            {/* {isOnSale && <OnSaleSign />} */}
            <button><Link to="/book">Back</Link></button>
            <button><Link to={`/book/${nextBookId.current}`}>Next</Link></button>
        </section>
    )
}