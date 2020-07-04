import page from "//unpkg.com/page/page.mjs"

page.configure({
    window: window
}) // bind to main window

// components
import nav from './components/nav.js'
import landing from './components/landing.js'
import login from './components/login.js'
import library from './components/libary.js'


const showPages = () => {
    //configure routes

    page('/', () => {
        page.redirect('/home')
    })

    page('/home', nav, landing)

    page('/login', nav, login)

    page('/library', nav, library)


    page({
        hashbang: true
    })
}


//jquery on ready
$(() => {
    showPages() //added showPages to link backend

    console.log('ready');

})