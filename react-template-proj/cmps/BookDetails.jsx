import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => console.log('error getting book details :', err))
    }, [])

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

    function onCloseDetails() {
        onBack()
    }

    return (
        <section className="book-details">
            <h3 className="book-title">{title}</h3>
            <img className="book-img" src={thumbnail} alt={`Cover of ${title}`} />
            <p className="book-description">{description}</p>
            <div className="book-price">{currencySign + amount}</div>
            {/* {isOnSale && <OnSaleSign />} */}
            <button onClick={onCloseDetails}>X</button>
        </section>
    )
}