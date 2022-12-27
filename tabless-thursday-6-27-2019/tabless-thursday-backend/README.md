Tabless-Thursday-Backend

Doing a GET request for '/' should get the server and shows "Server is up and running"

Doing a POST request for '/api/register' should create a user.
*You need to fill in the data of:
-Email (mandatory & unique)
-Password (mandatory)

Doing a POST request for '/api/login' should login the user.
*You must have created an account and fill in the data of:
-Email (mandatory and must be correct)
-Password (mandatory and must be correct)


Doing a GET request for '/tabs' should get the list of tabs.
*This only works if you have created and logged in.

Doing a POST request for '/tabs' should create a tab.
*You need to fill in the data of:
-Title (mandatory & Unique)
-URL (mandatory)
-Description (optional)
-category(mandatory)

Doing a PUT request for '/tabs/:id' should edit the chosen tab
*You must be logged in

Doing a DELETE request for '/tabs/:id' should delete the chosen tab
*You must be logged in