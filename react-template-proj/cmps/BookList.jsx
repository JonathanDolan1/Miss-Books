import { BookPreview } from "./BookPreview.jsx";


export function BookList({ books , onSelectBook , onRemoveBook }) { 

    return (
        <ul className="book-list clean-list">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                        <button onClick={() => onSelectBook(book.id)}>Select</button>
                    </section>
                </li>
            )}
        </ul>
    )
}