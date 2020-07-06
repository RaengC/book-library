import page from "//unpkg.com/page/page.mjs"

const submitHandler = async (formData) => {
    // console.log(formData)
    try {
        const response = await fetch('/api/user/new', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await response.text()
        console.log(data)
        libraryHandler(data)
    } catch (e) {
        console.log(e)
    }
}

//LINK TO CREATE NEW LIBRARY NOT YET working. 
const libraryHandler = async () => {
    try {
        const response = await fetch('/api/library/new', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
        const data = await response.text()
        console.log(data)
        page.redirect('/home')
    } catch (e) {
        console.log(e)
    }
}

const newAccount = (ctx, next) => {

    $('#app').append(`
    <div class="container">
        <div class="jumbotron">
            <h1 class="display-4">Create New Account</h1>
                <form id="new-account">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="login" placeholder="Enter User Name" class="form-control" id="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" placeholder="Enter password" class="form-control" id="password">
                    </div>
                    <div class="form-group">
                        <label for="library">Library Name</label>
                        <input type="library" placeholder="Name your library" class="form-control" id="library">
                    </div>  
                    <button type="create-account" class="btn btn-primary">Create Account</button>
                </form>
        </div>
    </div>

    `)

    $('#new-account').submit((e) => {
        e.preventDefault()

        const formData = {
            username: $('#username').val(),
            password: $('#password').val(),
            libaries: $('#library').val()
        }
        console.log(formData)
        submitHandler(formData)
    })
}

export default newAccount