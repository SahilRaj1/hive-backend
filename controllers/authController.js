const User = require(`${__dirname}/../models/UserModel`);
const jwt = require('jsonwebtoken');
const signToken = require(`${__dirname}/../middlewares/createToken`);

// POST /auth/signup : Register a new user 
exports.signup = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;

        if (!name || !email || !password || !username) {
            return res.status(400).json({ message: 'Please provide all the fields.' });
        }
        
        const user = await User.findOne({ username });
        const mail = await User.findOne({email});
        if (user) {
            return res.status(200).json({ message: 'the username is already in use' });
        }
        if(mail){
            return res.status(200).json({ message: 'the email is already in use' });
        }
        const newUser = await User.create({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        const token = signToken(newUser._id);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
}

