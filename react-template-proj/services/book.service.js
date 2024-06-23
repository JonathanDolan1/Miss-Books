import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = { txt: '', minSpeed: 0 }
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    setFilterBy
}

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                books = books.filter(book => regex.test(book.vendor))
            }
            if (gFilterBy.minSpeed) {
                books = books.filter(book => book.maxSpeed >= gFilterBy.minSpeed)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(
    title = '',
    description = '',
    thumbnail = '',
    listPrice = {
        amount: 0,
        currencyCode: '',
        isOnSale: false
    }) {
    return {
        id: '',
        title,
        description,
        thumbnail,
        listPrice
    }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextBookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextBookIdx === books.length) nextBookIdx = 0
            return books[nextBookIdx].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook(`World's Atlas`, 'Maps of the world', '../assets/img/1.jpg', { amount: 120, currencyCode: 'EUR', isOnSale: false }))
        books.push(_createBook('Harry Potter', 'A book about wizards', '../assets/img/2.jpg', { amount: 150, currencyCode: 'USD', isOnSale: false }))
        books.push(_createBook(`Pretzel's Wisdom`, 'A book about the wisdom of the street', '../assets/img/3.jpg', { amount: 300, currencyCode: 'ILS', isOnSale: true }))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(
    title,
    description,
    thumbnail,
    listPrice) {

    const book = getEmptyBook(title, description, thumbnail, listPrice)
    book.id = utilService.makeId()
    return book

}