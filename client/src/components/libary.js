import page from "//unpkg.com/page/page.mjs"

//Identifies libraries for user
const getLibrary = async (formData) => {
    console.log(formData)
    try {
        const response = await fetch('/api/library/', {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json()
        console.log(data)
        addLibraryToDom(data)
    } catch (e) {
        console.log(e)

    }
}


const addLibraryToDom = (list) => {

    list.forEach((library) => {
        const ul = $('<ul></ul>')
        const li = $(`<li>${library.name}</li>`)

        const btn = $(`<button>Add Book</button>`).on('click', () => {
            page.redirect(`/editLibrary/${library._id}`)
        });
        ul.append(btn)

        ul.append(li)
        $('#app').append(ul)
    })

}

//working
const library = (ctx, next) => {

    //card to add later
    $('#app').append(`
    <h1>Your Personal Libraries</h1>
    `)

    getLibrary()
}

export default library


//possible card below from bootstrap

// <div class="card" style="width: 18rem;">
//     <img src="..." class="card-img-top" alt="...">
//     <div class="card-body">
//         <h5 class="card-title">Library</h5>
//         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     </div>
//     <ul class="list-group list-group-flush">
//         <li class="list-group-item">Cras justo odio</li>
//         <li class="list-group-item">Dapibus ac facilisis in</li>
//         <li class="list-group-item">Vestibulum at eros</li>
//     </ul>
//     <div class="card-body">
//         <a href="#" class="card-link">Open library</a>
//     </div>
// </div>
/*
libary to only show on Nav click. 

Books added and saved in association with library on landing page

display users libraries, add capacity to show different libraries
books need to be listed under each library

delete books, move books between areas - trello type capacity here. drag and drop


possible card for library below, from bootstrap
*/