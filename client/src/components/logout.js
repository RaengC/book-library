import page from "//unpkg.com/page/page.mjs"

const logoutHandler = async () => {
    try {
        const response = await fetch('/api/user/logout', {})

    } catch (e) {
        console.log(e)
    }
}

const logout = (ctx, next) => {
    logoutHandler()

    $('#app').append(`
    <div class="container">
        <div class="jumbotron">
            <h1> You are logged out </h1>
        </div>
    </div>
    `)
}

export default logout