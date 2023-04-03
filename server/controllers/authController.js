const userDB = {
    users: require('../model/user.json'),
    setUsers: function(data) {
        this.users = data
    }
}



const handleLogin = async (req, res) => {
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
        res.json({'success': `User with email ${email} is logged in`})
    }
    else{
        res.status(401).json({message: 'PASSWORD_INCORRECT'});
    }
}

module.exports = { handleLogin }
