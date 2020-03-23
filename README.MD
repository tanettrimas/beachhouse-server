To get started:

1. Run 'npm install'
2. Edit .env.example and change to .env (Ask for password)
3. Run 'npm test' (make sure the intial tests pass)
4. Run 'npm run dev' or 'npm start'
5. Run 'curl http://localhost:3000/allergies' or via Postman and make sure you get a 200 response with some data :)


## Endpoints 

There are some validation rules in place for the menu-endpoint. Advice is to look at the menu-test.js in the src/controllers directory for the checks

- GET /menu (Will be behind user auth)
- GET-PUT-DELETE /menu/:id
- POST /menu/new

- GET /allergies

# For individual allergy information
- GET /allergies/query?q=

- POST /user/create (Will be behind admin auth)

If questions, please ask. Pull requests are welcomed!