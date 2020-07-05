import page from "//unpkg.com/page/page.mjs"

page.configure({
    window: window
}) // bind to main window

// components
import nav from './components/nav.js'
import landing from './components/landing.js'
import login from './components/login.js'
import newAccount from './components/newAccount.js'
import logout from './components/logout.js'


const showPages = () => {
    //configure routes

    page('/', () => {
        page.redirect('/home')
    })

    page('/home', nav, landing)

    page('/login', nav, login)

    page('/newAccount', nav, newAccount)

    page('/logout', nav, logout)

    page({
        hashbang: true
    })
}


//jquery on ready
$(() => {
    showPages() //added showPages to link backend

    console.log('ready');

})