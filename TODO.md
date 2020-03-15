## Spec

[] Tests
  [x] Initial tests/happy path 

[] Index page 
  [] Header (menu, booking, contact, about, )
  [] Nav (social media links, copyright)

[] Login with authentication route
  [] Only admin user
  [] Can create new users with access rights

[] MenuRoute
  [] Locked behind authorization
    [x] List menu items
    [x] Create new menu item
    [] Delete menu item(s)
    [] Change menu item
    [] Dynamically add number from the last, doing it via middleware and checking only on post/put route in the DB

[] Database
  [x] Mongo
  [] Implement connection pooling

[] Security
  [] Implement helmet
  [] XSS
  [] CSRF
  [] Express-validator
  [] Object-prop manipulation

[] CI/CD
  [] Travis/CircleCI
  [] Git Hooks on push/commit/pr
  [] Snyk

[] Deploy
  [] Heroku/Digital Ocean/Now


IMPORTANT - TDD first!!!!