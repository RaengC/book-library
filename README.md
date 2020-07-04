# book-library

OVERVIEW 

User creates account

    - logs in
    - The username names their library (creates Library List)
        default name
        automatically created. 
        (good reads as example)

User searches for book (linked from google books API)
    - moves book to summary list or library 
    - summary list only shown during each DOM session
    - If book droped in library saved with association to library

Library 

    - New bookID created when moved here
    - Link google ID from original API to ensure orignal data can be updated with each login. 
    - Ability to leave comments on each book, saved within user login
    
    LISTS
        - create lists from books saved in personal Library
        - full CRUD 

***********
THINGS TO POSSIBLY ADD/FUNCTIONALITY

    Comments/ratings for books and lists
        - Book called from google API -> saved to Library -> unique ID created -> 
            review added (star/comment). 
        - EJS to make reviews? look at boutique travel homework for how to do review w08d02 

    Group Model
        - users can join/create a group
        - share/create lists within group
        - admin functionality

    Create individual profile (useful in group setting)
        - avatar
        - about section

    User Stories
        - use witin teams for research in workplaces/academia
        - sharing among friends/book clubs

************
BACKEND

    Packages
        - Express JS
        - Bcrypt (encrypted passwords)
        - mongoose JS
        - cors JS
        - Express Solutions
   
    MODELS (min 2)
        User Model
            User Schema
                - username
                - password
                - role ??
            User Routes
                - login
                - logout
                - new (sign up)
                    <!-- - on signup create library (change to book activation) -->
        <!-- Group User Model        //add if have time
            User Schema
                - groupUsername
                - groupPassword
                - role          //admin, general user
            User Routes
                - login
                - password
                - new (create new group)  -->
         Book Model                  //find books via google books API (public)
            Book Schema         
                - name
                - description
                - author
                - genre
                - [libaryRoutes]
            Book Routes (all RESTFUL routes/ full CRUD) // dont need as using google books API
             - get (all)        - 
             - getById          - title search
             - new              - authenticated
             - delete (byId)    - authenticated 
             - addLibraryToBook
                - inital book put in library, library to logged in user
        Library Model           
            Library Schema
                - name
                - owner                 // user who owns this library
            Library routes      - all authenticated/linked to userId
                - get (all)     
                - getById
                - newLibrary
                - add book to library
                - delete book from library
                - update                //change the name of the library
                - delete library
        <!-- List Model                      // user creates specific book lists within Library
            List Schema
                - name     
                - [ref: items]          //array of referenced books
                - owner                 
            List routes         
                - get (all)     
                - getById
                - new
                - update
                - delete
                - addItem               //add existing book to list
                - removeItem            //remove existing book to list -->

FRONTEND

    Tech
        * jquery
        * bootstrap
        * page

    Queries With
        * fetch
        * async await

    Routes
        * home
        * login/out
        * Library area, show all books and lists. 
        * List creation
        * item add to list
        * item delete from list
    
**********
RETROSPECTIVE CHANGE LOG


