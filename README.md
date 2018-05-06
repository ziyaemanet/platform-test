## Intro
Basic implementation of a skeleton web api with token based authentication/authorization.

***http://localhost:8080*** - http server redirects to https server

***https://localhost:8443*** - main https server, use this

Note: Using Postman to test you will need to disable SSL certificate verification for the dummy credentials included with this repo. This option can be found in Settings > General > Request.

## Endpoints

***https://localhost:8443/user*** - **post**

Request a new user, emails must be unique.
 - Request headers:
    * Content-type: application/json
 - Request body:
    {
      "name": "NAME",
      "email": "EMAIL",
      "password": "PASSWORD"
    }
 - Response body:
    {
      "token": "TOKEN"
    }

***https://localhost:8443/user*** - **get**

Request users information.
 - Request headers:
    * Authorization: Bearer TOKEN
 - Response body:
    {
      "id": "ID",
      "name": "NAME",
      "email": "EMAIL",
      "v": 0
    }

***https://localhost:8443/user*** - **put**

Update a users information. Provide all three: name, email, and password.
 - Request headers:
    * Content-type: application/json
    * Authorization: Bearer TOKEN
 - Request body:
     {
       "name": "NAME",
       "email": "EMAIL",
       "password": "PASSWORD"
     }
 - Response body: UPDATE USER SUCCESS

 ***https://localhost:8443/user*** - **delete**

 Delete a user account.
  - Request headers:
     * Authorization: Bearer TOKEN
  - Response body: YOUR TOKEN AND/OR USER HAS BEEN REVOKED

 ***https://localhost:8443/login*** - **post**

 Request a new token.
  - Request headers:
     * Content-type: application/json
  - Request body:
      {
        "email": "EMAIL",
        "password": "PASSWORD"
      }
  - Response body:
      {
        "token": "TOKEN"
      }

  ***https://localhost:8443/logout*** - **delete**

  Revoke the requesting token.
  - Request headers:
    * Authorization: Bearer TOKEN
  - Response body: YOUR TOKEN AND/OR USER HAS BEEN REVOKED

## Database
A free sandbox mongodb instance is hosted via mlab. Connect somewhere else if you'd like.

## Setup
1. Install the node LTS version at https://nodejs.org/en/
2. Clone this repo
2. Open terminal to this repos root directory
3. In the terminal from above run command 'npm i' to install dependencies
4. In the terminal from above run command 'npm start' to start the server
5. Test with a tool such as Postman

## Enhancements
1. Add unit and functional tests
2. There should only be one active token per user at a time
3. Move secrets, key, etc to environment variables/files, where they belong (in code for ease of setup)
4. TTL for revoked tokens to expire after exp claim
5. Update user should revoke the token it was invoked with and return a new token
6. Add logging
7. Improve error handling
8. Improve responses
9. Refactor revoke.add so it can be added more easily to other models
10. Validate/sanitize inputs
11. Modularization changes
12. Log in should return a used but unexpired token or revoke and return a new token
13. Checking mongo db each time for revoked tokens will be slow, put blacklisted tokens in memory
14. more...
