import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

const { useParams, Link, useNavigate } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    // const [imgUrl, setImgUrl] = useState('')



    const navigate = useNavigate()
    const { bookId } = useParams()


    useEffect(() => {
        if (bookId) loadBook()
    }, [])
    
    function loadBook() {
        bookService.get(bookId)
        .then(book => setBookToEdit(book))
        .catch(err => showErrorMsg('Error getting the books details: ' + err))
    }
    
    if (!bookToEdit) return <section>Loading...</section>
    
    
    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
        .then(() => {
            navigate('/book')
            showSuccessMsg(`The book has been ${bookId ? 'edited' : 'added'} successfully!`)
        })
        .catch(err => showErrorMsg('Error saving the book: ' + err))
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

        switch (field) {
            case 'authors':
            case 'categories':
                value = value.split(',')
                break;

            case 'amount':
            case 'currencyCode':
                setBookToEdit(prevBook => ({ ...prevBook, listPrice: { ...(prevBook.listPrice), [field]: value } }))
                return
            case 'isOnSale':
                value = (value==='true') ?  true : false
                setBookToEdit(prevBook => ({ ...prevBook, listPrice: { ...(prevBook.listPrice), [field]: value } }))
                return
            }
            
            setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
        }

        
        function handleImgChange({ target }) {
            const field = target.name
            const file = target.files[0]
            
            
            const reader = new FileReader()
            reader.onload = () => {
                setBookToEdit((prevBook)=>({ ...prevBook, [field]: reader.result }))
            }
            reader.readAsDataURL(file)
        }

    return (
        <section className="book-edit">
            <h2>{bookId ? 'Edit' : 'Add'} Book</h2>
            <form className="book-edit-form" onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input onChange={handleChange} className="book-title" value={title} type="text" name="title" id="title"></input>
                <label htmlFor="subtitle">Subtitle:</label>
                <input onChange={handleChange} className="book-subtitle" value={subtitle} type="text" name="subtitle" id="subtitle"></input>
                <label htmlFor="authors">Authors(seprated by ','):</label>
                <input onChange={handleChange} className="book-authors" value={authors.join(',')} type="text" name="authors" id="authors"></input>
                <label htmlFor="publishedDate">Published Date:</label>
                <input onChange={handleChange} className="book-published-date" value={publishedDate} type="number" name="publishedDate" id="publishedDate"></input>
                <label htmlFor="pageCount">Page Count:</label>
                <input onChange={handleChange} className="book-page-count" value={pageCount} type="number" name="pageCount" id="pageCount"></input>
                <label htmlFor="categories">Categories(seprated by ','):</label>
                <input onChange={handleChange} className="book-categories" value={categories.join(',')} type="text" name="categories" id="categories"></input>

                <label htmlFor="language">Language:</label>
                <select onChange={handleChange} className="book-language" value={language} name="language" id="language">
                    <option value="en">English</option>
                    <option value="sp">Spanish</option>
                    <option value="he">Hebrew</option>
                </select>


                <label htmlFor="isOnSale">On Sale:</label>
                <select onChange={handleChange} className="book-on-sale" value={isOnSale} name="isOnSale" id="isOnSale">
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>


                <label htmlFor="description">Description:</label>
                <input onChange={handleChange} className="book-description" value={description} type="text" name="description" id="description"></input>


                <label htmlFor="amount">Price:</label>
                <input onChange={handleChange} className="book-price" value={amount} type="number" name="amount" id="amount"></input>

                <label htmlFor="currencyCode">Currency Code:</label>
                <select onChange={handleChange} className="book-currecny-code" value={currencyCode} name="currencyCode" id="currencyCode">
                    <option value="EUR">€ - EUR</option>
                    <option value="ILS">₪ - ILS</option>
                    <option value="USD">$ - USD</option>
                </select>

                <label htmlFor="currencyCode">Thumbnail:</label>
                <input accept="image/*" onChange={handleImgChange} className="book-thumbnail" type="file" name="thumbnail" id="thumbnail"></input>
                <div></div>
                <div className="book-thumbnail-container">
                    {isOnSale && (
                        <div className="on-sale">On-sale!</div>
                    )}
                    <img className="book-thumbnail" src={thumbnail} alt={`Cover of ${title || 'book'}`} />
                </div>

                <div className="buttons-container">
                    <button><Link to="/book">Back</Link></button>
                    <button onClick={onSaveBook}>Save</button>
                </div>
            </form>


        </section>
    )


}