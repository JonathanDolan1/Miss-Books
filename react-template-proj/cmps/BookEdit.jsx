import { bookService } from "../services/book.service.js"

const { useParams, Link , useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(null)
    const navigate = useNavigate() 
    const { bookId } = useParams()


    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBookToEdit(book))
            .catch(err => console.log('error getting book details :', err))
    }

    if (!bookToEdit) return <section>Loading...</section>

    
    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
        .then(() => {
            navigate('/book')
            // showSuccessMsg(`Book saved successfully!`)
        })
        .catch(err => console.log('err:', err))
    }

    const { title, subtitle, authors, publishedDate, pageCount, categories, thumbnail, language, description, listPrice } = bookToEdit
    const { amount, currencyCode, isOnSale } = listPrice

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }


    return (
        <section className="book-edit">
            <form className="book-edit-form" onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input onChange={handleChange} className="book-title" value={title} type="text" name="title" id="title"></input>
                <label htmlFor="subtitle">Subtitle:</label>
                <input onChange={handleChange} className="book-subtitle" value={subtitle} type="text" name="subtitle" id="subtitle"></input>
                <label htmlFor="authors">Authors(seprated by ','):</label>
                <input onChange={handleChange} className="book-authors" value={authors.join(',')} type="text" name="authors" id="authors"></input>
                <label htmlFor="published-date">Published Date:</label>
                <input onChange={handleChange} className="book-published-date" value={publishedDate} type="number" name="published-date" id="published-date"></input>
                <label htmlFor="page-count">Page Count:</label>
                <input onChange={handleChange} className="book-page-count" value={pageCount} type="number" name="page-count" id="page-count"></input>
                <label htmlFor="categories">Categories(seprated by ','):</label>
                <input onChange={handleChange} className="book-categories" value={categories.join(',')} type="text" name="categories" id="categories"></input>

                <label htmlFor="language">Language:</label>
                <select onChange={handleChange} className="book-language" value={language} name="language" id="language">
                    <option value="en">English</option>
                    <option value="sp">Spanish</option>
                    <option value="he">Hebrew</option>
                </select>
                

                <label htmlFor="on-sale">On Sale:</label>
                <select onChange={handleChange} className="book-on-sale" value={isOnSale} name="on-sale" id="on-sale">
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>


                <label htmlFor="description">Description:</label>
                <input onChange={handleChange} className="book-description" value={description} type="text" name="description" id="description"></input>


                <label htmlFor="price">Price:</label>
                <input onChange={handleChange} className="book-price" value={amount} type="number" name="price" id="price"></input>
                
                <label htmlFor="currency-code">Currency Code:</label>
                <select onChange={handleChange} className="book-currecny-code" value={currencyCode} name="currency-code" id="currency-code">
                    <option value="EUR">€ - EUR</option>
                    <option value="ILS">₪ - ILS</option>
                    <option value="USD">$ - USD</option>
                </select>

                <button className="book-thumbnail-upload-button">Upload Image</button>
                <div className="book-thumbnail-container">
                    {isOnSale && (
                        <div className="on-sale">On-sale!</div>
                    )}
                    <img className="book-thumbnail" src={thumbnail} alt={`Cover of ${title}`} />
                </div>
                
            <div className="buttons-container">
                <button><Link to="/book">Back</Link></button>
                <button onClick={onSaveBook}>Save</button>
            </div>
            </form>


        </section>
    )


}