

export function BookPreview({ book}) {

    const { title, thumbnail, listPrice } = book

    const { amount, currencyCode } = listPrice

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
        <article className="book-preview">
            <h3 className="book-title">{title}</h3>
            <img className="book-img" src={thumbnail} alt={`Cover of ${title}`} />
            <div className="book-price">{currencySign + amount}</div>
        </article>
    )
}