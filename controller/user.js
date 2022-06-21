const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const notSoSecret = 'lkuAt8q9tNGqAugv2Rx4CD87ebf3ti4NerqZ7rWMX8mYYJwBm+1NgdpaSTnniI/J2djE4h8W6N9wdg9uBjCpgRRHefUHvMoTsFB8VmuV+lwlpC4hFxouqL4pqflA/zMJyfSBEEKFTqdG6b5Om4b20jez3URTbaPk/nXJoP8XzNMyWuEaEmmpcxqKLiCJYuANU60j6amwLLHexrB0aVaGs2C/EKW5lauqbcX2MsH7C9DuLJxp6v0v3mvYYnNE8Tv2ZSgVwp6FqwHA1T1FvqB0Y8ARXL0J3k+mK02hSVFHGZUomXtAm1dyhN1RfQCsFf0Z/BW2ZBRj1dOqKQ9klUS9Fw==';

exports.getUserByToken = async (req, res) => {
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET || notSoSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: 'Invalid token'
                });
            } else {
                User.findOne({
                    where: {
                        id: decoded.userId
                    }
                }).then((user) => {
                    if (user) {
                        res.json({user});
                    } else {
                        res.status(404).json({
                            message: 'User not found'
                        });
                    }

                }).catch((err) => {
                    res.status(500).json({
                        message: err.message
                    });
                });
            }
        });
    }
            



exports.signup = async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!email || !name || !phone || !password) {
        return res.status(422).json({ message: "Please add all the fields" });
    }

    // less indent to make it more readable
    // const userExist = await User.findOne({ where: { email: email } });

    // if (userExist) {
    //     return res.status(422).json({ message: "User already exists" });
    // }

    // const hashPassword = await bcrypt.hash(password, 12);

    // const user = await User.create({
    //     name: name,
    //     email: email,
    //     phone: phone,
    //     password: hashPassword
    // });

    // const token = jwt.sign({userId: user.id,},
    //     process.env.JWT_SECRET, {expiresIn: '7d'})

    // await User.update({ token: token }, { where: { id: user.id } });

    User.findOne({ where: { email: email } })
        .then((userExist) => {

            // user already exist with this email
            if (userExist) {
                return res.status(422).json({ message: "User already exist" });
            }

            // hashing password
            bcrypt.hash(password, 12).then((hashedPassword) => {
                const user = new User({
                    name: name,
                    email: email,
                    phone: phone,
                    password: hashedPassword,
                    // token: token
                });

                // savign user to database
                user.save().then((user) => {

                    // create token for user
                    const token = jwt.sign({userId: user.id,},
                        process.env.JWT_SECRET || notSoSecret, {expiresIn: '7d'})

                    User.update({ token: token }, { where: { id: user.id } });

                    const { id, name, email, phone, profile_img, address } = user;

                    res.status(200).json({
                        token: token,
                        user: {
                            id,
                            name,
                            email,
                            phone,
                            profile_img,
                            address
                        }
                    });
                })
                .catch((error) => {
                    res.status(500).json({ message: error.message });
                });
            });
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
    };


exports.signin = async (req, res) => {
    console.log("signin");
    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password) {
        return res.status(422).json({ message: "Please add all the fields" });
    }  
    User.findOne({ where: { email: email } })
        .then((user) => {
            if (!user) {
                return res.status(422).json({ message: "User does not exist" });
            }

            // comparing password
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (!isMatch) {
                    return res.status(422).json({ message: "Incorrect password" });
                }

                // check is token valid
                if (user.token) {
                    jwt.verify(user.token, process.env.JWT_SECRET || notSoSecret, (err, decoded) => {
                        if (err) {
                            //Token expired
                            const token = jwt.sign({userId: user.id,},
                                process.env.JWT_SECRET || notSoSecret, {expiresIn: '7d'}
                            )

                            User.update({ token: token }, { where: { id: user.id } });
                            const { id, name, email, phone, profile_img, address } = savedUser;

                               
                            res.status(200).json({
                                token: token,
                                user: {
                                    id: id,
                                    name: name,
                                    email: email,
                                    phone: phone,
                                    profile_img: profile_img,
                                    address: address
                                }
                            });

                        } else {
                            //Token valid
                            const { id, name, email, phone, profile_img, address } = user;
                            res.status(200).json({
                                token: user.token,
                                user: {
                                    id: id,
                                    name: name,
                                    email: email,
                                    phone: phone,
                                    profile_img: profile_img,
                                    address: address
                                }
                            });
                        }
                    })
                } else {
                    // create token for user
                    const token = jwt.sign({userId: user.id,},
                        process.env.JWT_SECRET || notSoSecret, {expiresIn: '7d'}
                    )

                    User.update({ token: token }, { where: { id: user.id } });

                    const { id, name, email, phone, profile_img, address } = user;

                    res.status(200).json({
                        token: token,
                        user: {
                            id: id,
                            name: name,
                            email: email,
                            phone: phone,
                            profile_img: profile_img,
                            address: address
                        }
                    });
                }
            }).catch((error) => {
                res.status(500).json({ message: error.message });
            });
        }).catch((error) => {
            res.status(500).json({ message: error.message });
        });
    }

exports.signout = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(422).json({ message: "Not signed in" });
    }

    jwt.verify(token, process.env.JWT_SECRET || notSoSecret, (err, decoded) => {
        if (err) {
            return res.status(422).json({ message: "Not signed in" });
        }

        User.update({ token: null }, { where: { id: decoded.userId } });

        res.status(200).json({ message: "Signed out" });
    });
}

exports.deleteUserByToken = async (req, res) => {

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET || notSoSecret, (err, decoded) => {

        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        User.destroy({ where: { id: decoded.userId } })
            .then((user) => {
                res.status(200).json({ message: "User deleted" });
            }).catch((error) => {
                res.status(500).json({ message: error.message });
            });
    });
}

