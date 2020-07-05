# book-library

OVERVIEW 

    Visitor can search library without login

    User creates account to save items to personal library
        - Creates login
        - Names their library 

    User searches for book (linked from google books API)
        - moves book to summary list or library 
        - summary list only shown during each DOM session
        - If book droped in library saved with association to library
        - User can add notes/comments/reviews of book (can be shared in group settings)

    Library 
        - New bookID created when moved here
        - Link google ID from original API to ensure orignal data can be updated with each login. 
        - Ability to leave comments on each book, saved within user login
        
        LISTS
            - create lists from books saved in personal Library
            - full CRUD 

***********
LINK  - To user stories and associated Technical Tasks 
https://trello.com/invite/b/wslzbKjc/226040f2eb73d5433a81889df65dd9ce/library

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
        - use witin teams for research in workplaces/academia

    User profile (useful in group setting)
        - avatar
        - about section
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
            User Routes
                - login
                - logout
                - Create new user
         Book Model                  //find books via google books API (public)
            Book Schema         
                - name
                - description
                - author
                - genre
            Book Routes 
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

FRONTEND

    Tech
        - jquery
        - bootstrap
        - page

    Queries With
        - fetch
        - async await

    Routes
        - home
        - login/out/create new user
        - Library area, show all books and lists. 
        - List creation
        - item add to list
        - item delete from list
    
**********
RETROSPECTIVE CHANGE LOG

- deleted component 'editLibrary', changed so user can only have one library on landing page
- added drop down NAV for Account, New User and Loggin (login working, new user working but not linked to library creation)
- user linked to library, then books attached to user library to display on DOM

