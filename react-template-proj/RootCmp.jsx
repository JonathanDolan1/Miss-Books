import { Home } from './cmps/Home.jsx'

export function App() {
    return (
        <section className="app">
            <header className="app-header">
                <h1>Miss Books</h1>
                <nav className="app-nav">
                    <a onClick={() => setPage('home')} href="#">Home</a>
                    <a onClick={() => setPage('about')} href="#">About</a>
                    <a onClick={() => setPage('car')} href="#">Cars</a>
                </nav>
            </header>
            <main class="container">
                <Home />
            </main>
        </section>
    )
}