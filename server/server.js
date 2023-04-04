const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler')



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

//ROUTES
app.post('/auth', async (req, res) => {

    const userDB = {
        users: require('./model/user.json'),
        setUsers: function(data) {
            this.users = data
        }
    }

    const  { email, password } = req.body;
    if(!email)
    {
        return res.status(400).json({message: 'NO_EMAIL'});
    }
    if(!password){
        return res.status(400).json({message: 'NO_PASSWORD'});
    }
    const foundUser = userDB.users.find(user => user.email === email)
  
    if(!foundUser){
        res.status(401).json({message: 'EMAIL_NOT_FOUND'});
    }

    //CHECK PASSWORD
    if(foundUser.password === password) {
        const userResponse = {
            "email": foundUser.email,
            "username": foundUser.username
        }
        res.send(userResponse);
    }
    else{
        res.status(401).json({message: 'PASSWORD_INCORRECT'});
    }
});

app.get('/home', (req, res) => {
    return res.status(401).json({message: 'Not Authorized'})
});



app.use(errorHandler);

app.listen(3001, () => {
    console.log('Running');
})