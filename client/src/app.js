import page from "//unpkg.com/page/page.mjs"

page.configure({
    window: window
}) // bind to main window

import nav from './components/nav.js'
import landing from './components/landing.js'
import login from './components/login.js'
import newAccount from './components/newAccount.js'
import logout from './components/logout.js'
import visitor from './components/visitor.js'


const showPages = () => {

    page('/', () => {
        page.redirect('/home')
    })
    page('/home', nav, visitor)

    page('/library', nav, landing)

    page('/login', nav, login)

    page('/newAccount', nav, newAccount)

    page('/logout', nav, logout)

    page({
        hashbang: true
    })
}

//jquery on ready
$(() => {
    showPages()

    console.log('ready');
})