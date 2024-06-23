import { HomePage } from './cmps/home-page.jsx'
import { AboutUs } from './cmps/about-us.jsx'
import { BookIndex } from './cmps/book-index.jsx'

const { useState } = React

export function App() {

    const [page,setPage] = useState('books')

    return (
        <section className="app">
            <header className="app-header">
                <h1>Miss Books</h1>
                <nav className="app-nav">
                    <a onClick={() => setPage('home')} href="#">Home</a>
                    <a onClick={() => setPage('about')} href="#">About</a>
                    <a onClick={() => setPage('books')} href="#">Books</a>
                </nav>
            </header>
            <main className="container">
                {page === 'home' && <HomePage />}
                {page === 'about' && <AboutUs />}
                {page === 'books' && <BookIndex />}
            </main>
        </section>
    )
}