const express = require("express");
const app = express();
const port = 3000;
app.use(express.static("public"));

const pg = require('pg');

const bodyParser = require("body-parser");

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "job-portal",
    password: "pass123",
    port: 5432,
});

db.connect();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/index', (req, res)=>{
    res.render('index.ejs');
})

app.get('/login' , (req,res)=>{
    res.render('login.ejs');
})

// app.post('/login', (req,res)=>{
//     console.log(req.body);
//     res.redirect('/login');
// })

app.get('/register' , (req,res)=>{
    res.render('register.ejs');
})

// app.post('/register', (req,res)=>{
//     console.log(req.body);
//     res.redirect('/register');
// })

app.get('/forget_password' , (req,res)=>{
    res.render('forget_password.ejs');
})

app.post('/forget_password', (req,res)=>{
    console.log(req.body);
    res.redirect('/forget_password');
})

app.get('/' , (req,res)=>{
    res.render('landing.ejs');
})

app.get('/index' , (req,res)=>{
    res.render('index.ejs');
})

app.get('/about' , (req,res)=>{
    res.render('about.ejs');
})

app.get('/job' , (req,res)=>{
    res.render('job.ejs');
})

app.post('/login', async(req, res)=>{
    const data = req.body;
    // console.log(data)
    const result = await db.query('select * from customers where username = $1', [data.username]);
    if(result.rows.length === 0){
       
        res.redirect('/register');
    }
    
    else{

        
       console.log(data);
        res.redirect('/index');
    }
});

app.post('/register', async(req, res)=>{
    const user_data = req.body;
    console.log(user_data)
    
    {
        await db.query('insert into customers (name, username, email, password) values ($1, $2, $3, $4)', 
        [user_data.name, user_data.username, user_data.email, user_data.password]);
        console.log(user_data)
        res.redirect('/login');
    }
});

// const userName = "John";  // John's name
// const companyName = "Cisco";  // Cisco is the magical company

// // When John clicks the Apply Now button, the magic happens:
// fetch('http://localhost:3000/apply', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ userName, companyName }),
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
