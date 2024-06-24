

const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() =>
        onSetFilter(filterByToEdit)
        , [filterByToEdit])

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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { title, minPrice, maxPrice, currency } = filterByToEdit

    return (
        <section className="book-filter">
            <h2>Filters</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">Title</label>
                <input value={title} onChange={handleChange} name="title" type="text" id="title" />

                <label htmlFor="minPrice">Min Price</label>
                <input value={minPrice || ''} onChange={handleChange} name="minPrice" type="number" id="minPrice" />

                <label htmlFor="maxPrice">Max Price</label>
                <input value={maxPrice || ''} onChange={handleChange} name="maxPrice" type="number" id="maxPrice" />

                <label htmlFor="currency">Currency</label>
                <select value={currency} onChange={handleChange} name="currency">
                    <option value="ILS">ILS</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                </select>

                <button>Submit</button>
            </form>
        </section>
    )

}