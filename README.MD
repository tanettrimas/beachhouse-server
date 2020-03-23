To get started run:

1. Edit .env.example and change to .env (Ask for password)
2. Run 'npm test' (make sure the intial tests pass)
3. Run 'npm run dev' 
4. Run 'curl http://localhost:3000/allergies' or via Postman and make sure you get a 200 response with some data :)


Endpoints: 

- GET /menu (Will be behind user auth)
- GET-PUT-DELETE /menu/:id
- POST /menu/new

- GET /allergies
## For individual allergy information
- GET /allergies/query?q=

- POST /user/create (Will be behind admin auth)

If questions, please ask. Pull requests are welcomed!