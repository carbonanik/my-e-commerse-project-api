const User = reqquire('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.getUserByToken = async (req, res) => {
    try {
        const user = await User.findOne({where: {token: req.headers.token}});
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.signup = async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!email || !name || !phone || !password) {
        return res.status(422).json({ message: "Please add all the fields" });
    }

    User.findOne({ where: { email: email } })
        .then((userExist) => {

            // user already exist with this email
            if (userExist) {
                return res.status(422).json({ message: "User already exist" });
            }

            // create token for user
            const token = jwt.sign({userId: user._id,},
                process.env.ACCESS_TOCKEN_SECRET//, {expiresIn: '1d'}
            )

            // hashing password
            bcrypt.hash(password, 12).then((hashedPassword) => {
                const user = new User({
                    name: name,
                    email: email,
                    phone: phone,
                    password: hashedPassword,
                    token: token
                });

                // savign user to database
                user.save().then((user) => {

                    // sending successful response to client
                    res.status(201).json({
                            message: "User created successfully",
                            token: user.token,
                        });
                })
                    .catch((error) => {
                        // sending error response to client
                        res.status(500).json({ message: error.message });
                    });
            });
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
    };