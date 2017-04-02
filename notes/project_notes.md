## CRUD - Create, Read, Update, Delete

**Households**
- Create household - POST to /households
- Read household(s) - GET to /households or to /households/id
- Update household - PUT to /households/id
- Delete household - DELETE to /households/id

**People**
???

**Node** is an engine for running JS outside the browser (at the CL). Can work with HTTP requests.

**Express** is a framework to simplify working with HTTP requests

## Getting started
- Make a project dir
- Run npm init to create package.json
- Run `npm install --save express mongoose mocha`
- Create app.js, importing express, setting app = express, exporting app
- Create index.js importing app, setting up listen on port

## Set up a Route Handler in app.js
```app.get('/api', (req, res) => {
  res.send({ hi: 'there' });
});
```
- Run the server: `node index.js`
- In browser: `http://localhost:3050/api`
