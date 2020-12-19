const express = require('express');

const hbs = require('hbs');


const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');


const app = express();

const punkAPI = new PunkAPIWrapper();

//package hbs schould be render
app.set('view engine', 'hbs');
//locate the views
app.set('views', path.join(__dirname, 'views'));

//make public folder public
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:





app.get('/:foo', (request, response) => {
  const name = request.params.foo;
  //const query = request.query;
  //console.log(query)
  switch (name) {
    case 'beers':
      punkAPI
        .getBeers()
        .then(
          (beersFromApi) => {
            console.log('Beers from the database: ', beersFromApi);
            response.render('beers', {beersFromApi})
          }
        )
        .catch(error => console.log(error));
      break;

    case 'random-beer':
      punkAPI
      .getRandom()
      .then((responseFromAPI) => {
        console.log('Random Beer: ', responseFromAPI);
        response.render('random-beer', responseFromAPI[0])
      })
      .catch(error => console.log(error));
      break;
    default:
        response.render('index');
  }
});

app.get('/beers/:foo', (request, response) => {
  const id = request.params.foo;
  const query = request.query;




//working on this now
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
