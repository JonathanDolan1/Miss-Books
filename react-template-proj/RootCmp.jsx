const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Navigate } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookDetails } from './cmps/BookDetails.jsx'
import { BookEdit } from './cmps/BookEdit.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="container">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />} >
                            {/* <Route path="/about/team" element={<Team />} />
                            <Route path="/about/vision" element={<Vision />} /> */}
                        </Route>
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />

                        {/* <Route path="*" element={<NotFound />} /> */}
                    </Routes>
                </main>
            </section>
            <UserMsg />
        </Router>
    )
}