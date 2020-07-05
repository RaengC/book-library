import page from "//unpkg.com/page/page.mjs"

const submitHandler = async (formData) => {
    // console.log(formData)
    try {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        // console.log(response.json())
        const data = await response.text()
        console.log(data)

        page.redirect('/home')

    } catch (e) {
        console.log(e)
    }
}

const login = (ctx, next) => {

    $('#app').append(`
    <div class="container">
        <div class="jumbotron">
            <h1 class="display-4">Login To Library</h1>
                <form id="form-login">
                    <div class="form-group">
                        <label for="username">Login</label>
                        <input type="login" class="form-control" id="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
        </div>
    </div>
    
    `)

    /*
    ADD 
    - logout button above. 
    - create new user button 
    
    */

    $('#form-login').submit((e) => {
        e.preventDefault()

        const formData = {
            username: $('#username').val(),
            password: $('#password').val()
        }
        console.log(formData)
        submitHandler(formData)
    })
}

export default login