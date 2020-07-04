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
    const list = result.items;

    const bookList = $("#bookSearch");
    bookList.children().remove();

    for (let i = 0; i < list.length; i++) {
        bookList.append(`<div class="card shadow" bookID="${list[i].id}" data-toggle="tooltip" data-placement="right" title='${list[i].volumeInfo.description}'>
                            <img src=${list[i].volumeInfo.imageLinks.thumbnail} class="card-img-top shadow-sm"/>
                            <div>
                                <h5>${list[i].volumeInfo.title}</h5> <br>
                               <h6>${list[i].volumeInfo.authors[0]}</h6>
                            </div>   
                        </div>`)

        $(".card").draggable();
    }
}

//Identifies libraries for user
const getLibrary = async () => {
    try {
        const response = await fetch('/api/library/', {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const data = await response.json()
        console.log(data)
        addLibraryToPanel(data)
        // addLibraryToDom(data)
    } catch (e) {
        console.log(e)

    }
}

const addLibraryToPanel = (library) => {
    library[0].book.forEach(oneBook => {
        $('#yesList').append(`<div class="card shadow" data-toggle="tooltip" data-placement="right" title='${oneBook.description}'>
    <img src=${oneBook.imageLinks.thumbnail} class="card-img-top shadow-sm"/>
    <div>
        <h5>${oneBook.title}</h5> <br>
       <h6>${oneBook.authors[0]}</h6>
    </div>   
</div>`)
    })
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
        $("#summaryList .card").remove();
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

            // addBookToLibrary()
            //console.log($(this).attr("bookID"))
            console.log(ui.draggable.attr("bookID"))
            //get the dropped element, use the attr to retrive the value. 
            //remove attr check if .this works. 
            //once have value create fucntion to link to backend. (code in edit library)

            ui.draggable.draggable('disable');
            ui.draggable.removeAttr('style');
            $("#yesList").append(ui.draggable);
        }
    })
}

const addPageToDom = () => {
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
            <h4 class="mx-auto">Personal Library</h4> <br />
        </div>
    </div>

</div>
`)
    landingOnReady()
    getLibrary()
}

export default addPageToDom