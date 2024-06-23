
export function UserPreview() {
    var user = { fullname: 'Jonathan Dolan' }
    return (
        <section className="user-preview">
            <h2>{user.fullname}</h2>
        </section>
    )
}