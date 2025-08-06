

# 1.lecture one

learning backend web dev
we need 
DB
models
controllers: methods
Routes
middlewares
utils(most frequently used things, mail, signup wagera wagera, file upload)


# 2.lecture 2
explains the get , req res

node app
npm init

express: unopiinionated web framewwokr for node.js 




# 3. CORS
     How to connect frontend and backend
     2 folders
     then used cors module npm
    or add a proxy of the server localhost link which makes it seem the request is not CORS

    or do cors. configure in backend


# 3 video:
demo

# 4.
data modelling
models folder
all the moongose models.js
# 5. ecom and hospital models

# 6. SETTING UP project
-   backend ftw
    overview
    1.data modelling using these apps like i forgot

- gitkeep

- prettier config
- a lot more
- folder structure discussed


# 7. Connection to DB
 - either put the connection code in the index.js, asap it runs
 - make funciton in db folder, then call it in index.js . (better ig)
 - always do async await and try catch
 - give correct error defn
 - node process exit codes( need to read about it)


 # 8 Custom API Response and Error Handling
 - gonna make classes for error response, api response
 - creating asynchandler util
 - #### when an async fxn returns, it gives a promise which can be handled by .then .catch

- learn about cors
- whitelisting urls

### Middleware part
- (err,req,res,next)
- const asyncHandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=>next(err))
    }
}


# 9 Data modelling, user model, video model
- jwt, decyrpt ...

-  made models for user and video where owner of video is a schemaType
- now will use moongoseaggregatepaginate-v2
- and use bcryptjs
- Mongoose is an ODM library for MongoDB that lets you define schemas, models, and validation rules for structured data in Node.js applications.

It simplifies database operations by providing methods like .save(), .find(), and middleware (e.g., pre('save')).

MongoDB aggregation pipeline processes data through multiple stages ($match, $group, $sort, etc.) to filter, transform, and compute results efficiently.

Pagination is the technique of loading data in chunks (pages) using .skip() and .limit() to improve performance and user experience.

mongoose-aggregate-paginate-v2 is a plugin that adds easy pagination support to complex Mongoose aggregation queries with total counts and page info.



### JWT and Bcrypt 
 - ✅ JWT (JSON Web Token)
JWT is a stateless token that encodes user data and is signed (not encrypted) to verify authenticity.

It consists of three parts: header (algo info), payload (data like user ID), and signature (validates it wasn't tampered).

Sent in headers (like Authorization: Bearer <token>) for each request — server verifies signature using a secret key.

🔐 bcrypt
bcrypt is a one-way hashing algorithm used to securely store passwords with an added salt to prevent rainbow table attacks.

It's intentionally slow to make brute-force attacks harder — you never store the raw password, only the hash.

On login, bcrypt rehashes the input password and compares it to the stored hash — if they match, authentication passes.


# 10 File Uploaddddd 
- multer is a npm library , like express-fileupload

- user will upload the file to us using multer, as a safety measure.
- after this , we will send it to cloudinary
- nodejs has a filesystem called fs to handle files
- multer im using as a middleware


# 11 HTTP CRASH COURSE
 - https is just http with a secure layer
 -  URL URI URN same same
 - http headers are metadata-> key value pairs
  ### headers are used for caching, auth, manage state

  #### category
  - request headers -> from client
  - response headers -> from server
  - representation headers -> encoding
  - payload headers -> data

  methods :
  get post put delete patch


# postman video
- console.log req.boy
- console.log cloudinary response
- console log req.files


