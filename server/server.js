const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler')
const jwt = require('jsonwebtoken');
const secret = 'bceThuF1geiP!DUyD73jk/KeXImnssfWKFnWXHxqykhA18/6nCl0vBYFJx00Wc5VN';


//create custom middleware
app.use((req, res, next) => {
    console.log(`${req.method}, ${req.path}`);
    next();
})
const whiteList = ['http://localhost:4200']
const corsOptions = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }
        else{
            callback(new Error('Not Allowed'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false}));

app.use(express.json());


// Sample users data
const users = [
    { id: 1, email: "MTN_user", password: "test123" },
  ];

//ROUTES
app.post('/auth', async (req, res) => {

    const  { email, password } = req.body;

    if(!email)
    {
        return res.status(400).json({message: 'NO_EMAIL'});
    }

    if(!password){
        return res.status(400).json({message: 'NO_PASSWORD'});
    }


    const foundUser = users.find(u => u.email === email && u.password === password);
  

    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }




const token = jwt.sign({ userId: foundUser.id}, secret);

res.json({email,token});
});






app.listen(3001, () => {
    console.log('Running');
})