const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
  })

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
})

app.get('/pizza/pineapple', (req, res) => {
    res.send('Delicious! I miss you so...');
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
      App: ${req.app}
      Body: ${req.body}
      Cookies: ${req.cookies}
      IP: ${req.ip}
      Method: ${req.method}
      Original URL: ${req.originalUrl}
      Params: ${req.params}
      Protocol: ${req.protocol}
      Query: ${req.query}
      Route: ${req.route}
      Secure: ${req.secure}
      Signed Cookies: ${req.signedCookies}
      Stale: ${req.stale}
      Subdomain: ${req.subdomains}
      XHR: ${req.xhr}
    `;
    res.send(responseText);
  });

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
});

app.get('/greetings', (req, res) => {
    const name = req.query.name;
    const race = req.query.race;

    if(!name) {
        return res.status(400).send('Please provide a name');
    }
    if(!race) {
        return res.status(400).send('Please provide a race');
    }
    
    const greeting = `Greetings ${name} the ${race}, welcome to our kindgon.`;

    res.send(greeting);
})


app.get('/sum', (req, res) => {
    const numA = Number(req.query.numA);
    const numB = Number(req.query.numB)
    console.log(numA, "hello??");
    const sum = numA + numB;

    if(!numA) {
        return res.status(400).send('Please provide a number');
    }
    if(!numB) {
        return res.status(400).send('Please provide a number');
    }
    
    const results = `The sum of ${numA} and ${numB} is ${sum}`;

    res.send(results);
})

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = req.query.shift;
    const caesarCipher = (text, shift) => {
        return text.toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0)-65 + shift ) % 26 + 65));
    }

    const decipher = caesarCipher(text, shift);

    console.log(text, shift, caesarCipher, decipher)

    res.send(decipher);
    
})

app.get('/lotto', (req, res) => {
    const picks = req.query.picks;
    const numPicks = picks.map(Number);
    console.log(numPicks);
    const winners = Array.from({length: 6}, () => Math.floor(Math.random() * 20) + 1);

    res.send(winners);
})

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});