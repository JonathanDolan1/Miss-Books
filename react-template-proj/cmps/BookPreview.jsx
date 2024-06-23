

export function BookPreview({ book}) {

    const { title, description, thumbnail, listPrice } = book

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
        <article className="book-preview">
            <h3 className="book-title">{title}</h3>
            <img className="book-img" src={thumbnail} alt={`Cover of ${title}`} />
            <p className="book-description">{description}</p>
            <div className="book-price">{currencySign + amount}</div>
            {/* {isOnSale && <OnSaleSign />} */}
        </article>
    )
}