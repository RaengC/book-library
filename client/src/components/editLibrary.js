import page from "//unpkg.com/page/page.mjs"

let list
let libraryID

function queryAPI(search) {

    $.ajax({
            url: `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=6&filter=ebooks`,
            method: "GET",
        })
        .then((response) => {
            displayResult(response);
        })
        .catch((error) => console.log(error));
}


function displayResult(result) {
    list = result.items;
    console.log('list', list)

    const bookList = $("#bookSearch");
    bookList.children().remove();

    for (let i = 0; i < list.length; i++) {
        bookList.append(`<div data-listindex=${i} class="card shadow" data-toggle="tooltip" data-placement="right" title='${list[i].volumeInfo.description}'>
                            <img src=${list[i].volumeInfo.imageLinks.thumbnail} class="card-img-top shadow-sm"/>
                            <div>
                                <h5>${list[i].volumeInfo.title}</h5> <br>
                               <h6>${list[i].volumeInfo.authors[0]}</h6>
                            </div>   
                        </div>`)

        $(".card").draggable();
    }
}


const landingOnReady = () => {

    $("#searchBtn").on('click', () => {
        const search = $("#inp-limit").val();
        queryAPI(search);
    })

    $("#clearBtn").on('click', () => {
        $('#bookSearch').empty();
    })

    $("#clearBtn").on('click', () => {
        $("#inp-limit").val("");
    })

    $("#summaryBtn").on('click', () => {
        $("#summaryList .card").remove()
    })


    $("#summaryList").droppable({
        drop: (event, ui) => {
            $("#summaryList").addClass('dropOnActive');
            ui.draggable.addClass('dropOnActive')

            ui.draggable.removeAttr('style');
            $("#summaryList").append(ui.draggable);
        }
    });

    $("#yesList").droppable({
        drop: (event, ui) => {
            $("#yesList").addClass('holdOnActive');
            ui.draggable.addClass('holdOnActive')
            console.log('ui draggable', ui.draggable)
            const book = list[ui.draggable[0].dataset.listindex]
            // console.log('book', book)

            //construct an object similar to the API added to library
            //from the book variable
            //create an ajax to post to api call. 

            //add edit library fx to hold book id. (redirected from library.js, library._id)
            // function addBookToLibrary() {
            //     $.ajax({
            //         type: 'POST',
            //         url: `/api/book/library/new`,
            //         data: {
            //             _id: String,
            //             title: String,
            //             authors: [
            //                 String
            //             ],
            //             description: String,
            //             imageLinks: {
            //                 smallThumbnail: String,
            //                 thumbnail: String
            //             },
            //         }
            //     })

            // }

            // $('#addBtn').on('click', () => {
            //     page.redirect(`/library/${book._id}`)
            // })

            const bookData = {
                _id: book.id,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
                description: book.volumeInfo.description,
                imageLinks: book.volumeInfo.imageLinks
            }
            console.log('bookdata', bookData)

            //posting to backend
            const addBook = async () => {
                try {
                    $.ajax({
                        type: 'POST',
                        url: `/api/book/library/new/${libraryID}`,
                        data: JSON.stringify(bookData),
                        contentType: 'application/json'
                    })
                } catch (e) {
                    console.log(e)
                }
            }

            addBook()

            // ui.draggable.draggable('disable');
            ui.draggable.removeAttr('style');
            $("#yesList").append(ui.draggable);
        }
    })
}

const addPageToDom = (ctx, next) => {
    libraryID = ctx.params.id
    $('#app').append(`
    <div class="container">
    <div class="jumbotron">
        <h1 class="display-4">ebook Personal Library </h1>
        <p>Search for a book to tickle your fancy by Author, Genre or random search term.</p>
        <div class="form-inline">
            <input type="text" placeholder="Author/Genre/Search Term" class="form-control" id="inp-limit">
            <button type="button" class="btn btn-primary ml-3 eventListener" id="searchBtn">Search</button>
            <button type="button" class="btn btn-primary ml-3 eventListener" id="clearBtn">Clear</button>
        </div>
    </div>

    <div class="row">
        <div class="card-group" id="selectedItems draggable">
            <div id="bookSearch" class="imageDisplay card-body"></div>
        </div>
    </div>

    <div class="row holdingBox">
        <div id="summaryList" class="ui-widget-header d-inline-flex p-2">
            <h4 class="mx-auto">Summary List <button id="summaryBtn" type="button"
                    class="btn btn-primary ml-3 eventListener">Clear</button></h4> <br />
        </div>
        <div id="yesList" class="ui-widget-header d-inline-flex p-2">
            <h4 class="mx-auto">Personal Library<button id="summaryBtn" type="button"
            class="btn btn-primary ml-3 eventListener">Clear</button></h4> <br />
        </div>
    </div>

</div>
`)
    landingOnReady()
    next()

}

export default addPageToDom