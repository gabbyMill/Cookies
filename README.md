# Gabby's Url-shortener

## Guidelines

Create a route /api/shorturl/ in your express app that will handle all url shortening requests. (We recommend using express Router)

Write/read Asynchronously a single JSON file as your DB

Serve your client files from your server at route /

Style and change your front-end as you wish. You can take inspiration from this example

## Requirements

Examine thoroughly and copy all functionality of this FCC example

Use a class DataBase{} to read/write (Asynchronously) all data in your back-end (you can use a json file as persistent layer)

Add another functionality to your service: a statistics route (api/statistic/:shorturl-id) that will respond with the following data per shorturl-id:

creationDate - a SQLDate format
redirectCount - the amount of times this url was used for redirection
originalUrl
shorturl-id
Fully test your express app with jest and supertest. Test each end point response including error responses.

Use a separate DB file for your tests. Hint: use Environment variables

## Bonus

Add any feature you desire. Some ideas worth extra points:
Custom short URL. Support optional shorturl-id parameter in your POST request. Pay attention to error handling.
Serve a styled statistics dashboard instead of the default JSON statistics
Use the JSONBIN.io service bin as your persistent layer in your back-end DB class (use CRUD operations to read write bins)
Try implementing user management
Use supertest/puppeteer test to test any bonus feature you implemented
Add an explanation in README.md for each bonus feature you add and a link to any resource you used
