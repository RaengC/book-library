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
        $("#summaryListVisitor .card").remove();
    })


    $("#summaryListVisitor").droppable({
        drop: (event, ui) => {
            $("#summaryListVisitor").addClass('dropOnActive');
            ui.draggable.addClass('dropOnActive')
            console.log('drop detected')
            ui.draggable.removeAttr('style');
            $("#summaryListVisitor").append(ui.draggable);
        }

    });
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
    <div class="row holdingBoxVisitor">
        <div id="summaryListVisitor" class="ui-widget-header d-inline-flex p-2">
            <h4 class="mx-auto">Summary List <button id="summaryBtn" type="button"
                    class="btn btn-primary ml-3 eventListener">Clear</button></h4> <br />
        </div>
    </div>

</div>
`)
    landingOnReady()
}

export default addPageToDom