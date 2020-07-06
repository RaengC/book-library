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
    page.redirect('/home')
}

export default logout