const express = require('express');
const app = express();
const SERVER_PORT = 3000;

app.get('/', function (req, res) {
  res.send('<h1>Hello World</h1>');
});

app.get('/about', function (req, res) {
    res.send('<h1>About Us</h1>');
  });

  app.get('/contact', function (req, res) {
    res.send('<h1>Contact us</h1>');
  });

  app.get('/hello', (req, res) => {
    res.send('Hello Express JS');
  });

//   app.all('/hello', (req, res) => {
//     res.status(200)
//     res.send('How youuu dooinng');
//   });


  app.put('/hello', (req, res) => {
    res.status(203)
    res.send('<h1>PUT - How youuu dooinng?</h1>');
  });

  app.delete('/hello', (req, res) => {
    res.status(204)
    res.send('<h1>DELETE - How youuu dooinng?????</h1>');
  });

  app.get('/student', (req, res) => {
    res.status(200)
    const stud = {
        name: 'John Doe',
        age: 25,
    }
    res.json(stud);
  });

  //query
//  //http://localhost:3000/employee?fnm=pritest&lnm=patel
  app.get('/employee', (req, res) => {
    console.log(req.query);
    const fnm = req.query.fnm;
    const lnm = req.query.lnm;

    res.send(`First Name : ${fnm}, Last Name: ${lnm}`);
  });

//http://localhost:3000/employee/pritest/patel/toronto

  app.get('/employee/:fnm/:lnm/:city', (req, res) => {
    console.log(req.params)
    const fnm = req.params.fnm;
    const lnm = req.params.lnm;
    const city = req.params.city;
    res.send(`First Name: ${fnm}, Last Name: ${lnm}, City: ${city}`);
  });



  //http://localhost:3000/user?fnm=pritest&lnm=patel

  app.get('/user', (req, res) => {
    const fnm = req.query.firstname || 'Pritesh';
    const lnm = req.query.lastname || 'Patel';

    res.json({
        firstname: fnm,
        lastname: lnm
    });
});


app.post('/user/:firstname/:lastname', (req, res) => {
  const fnm = req.params.firstname;
  const lnm = req.params.lastname;

  res.json({
      firstname: fnm,
      lastname: lnm
  });
});


app.listen(SERVER_PORT, () => {
    console.log('Server is running on http://localhost:${SERVER_PORT}');
});