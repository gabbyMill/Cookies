# Gabby's Url-shortener

## Questions

NOTE Error handling in json handler is good ?

## Left to Implement:

- [x] Check if valid url
- [x] Return user it's shortened version + if he already shortened it
- [x] Implement redirects counter
- [x] Respond with stats
- [ ] Handle errors like a boss
- [ ] Add user functionality
- [ ] Learn How to tests + Databases with class
- [ ] Bonuses are always a good thing

- "BUG", "HACK", "FIXME", "TODO", "COMMENT", "NOTE",

### Guidelines

- [x] Create a route /api/shorturl/ in your express app that will handle all url shortening requests. (We recommend using express Router)

- [x] Write/read Asynchronously a single JSON file as your DB

- [x] Serve your client files from your server at route /

Style and change your front-end as you wish. You can take inspiration from this example

### Requirements

- [x] Examine thoroughly and copy all functionality of this FCC example

- [x] Add another functionality to your service: a statistics route (api/statistic/:shorturl-id) that will respond with the following data per shorturl-id:

creationDate - a SQLDate format
redirectCount - the amount of times this url was used for redirection
originalUrl
shorturl-id
Fully test your express app with jest and supertest. Test each end point response including error responses.

Use a separate DB file for your tests. Hint: use Environment variables

### Bonus

Add any feature you desire. Some ideas worth extra points:
Custom short URL. Support optional shorturl-id parameter in your POST request. Pay attention to error handling.
Serve a styled statistics dashboard instead of the default JSON statistics
Use the JSONBIN.io service bin as your persistent layer in your back-end DB class (use CRUD operations to read write bins)
Try implementing user management
Use supertest/puppeteer test to test any bonus feature you implemented
Add an explanation in README.md for each bonus feature you add and a link to any resource you used
