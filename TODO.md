## Spec

[] Tests
  [x] Initial tests/happy path 
  [] Create tests for db connection and database controller
  [] Integration test

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
    [x] Delete menu item(s)
    [x] Change menu item

[] Database
  [x] Mongo
  [] Implement connection pooling
  [] Add seeding script for admin user (development)

[] Security
  [x] Implement helmet
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