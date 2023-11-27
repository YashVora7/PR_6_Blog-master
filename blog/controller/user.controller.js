const user = require("../models/user.schema")

const signupui = (req, res) => {
    res.status(200).render("signup")
}
const signup = async (req, res) => {
    let { username, email, password, role } = req.body
    let userdata = await user.findOne({ email: email })
    if (!userdata) {
        let data = await user.create(req.body)

        res.status(200).cookie("role", data.role)
        res.status(200).cookie("id", data.id).send(`Account created successfully ${data.username}`)
    }
    else {

        res.status(200).cookie("role", userdata.role)
        res.status(200).cookie("id", userdata.id).send(`Account created successfully ${userdata.username}`)
    }
}
const loginui = (req, res) => {
    res.status(200).render("login")
}
const login = async (req, res) => {
    let { email, password } = req.body
    try {
        let userdata = await user.findOne({ email: email ,password:password})
        if (userdata) {
            res.cookie("role", userdata.role)
            res.cookie("id", userdata.id).send(`Welcome User ${userdata.username}`)
        }
        else {
            res.send("Invalid Credentials.")
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}
const userDelete = async (req, res) => {
    let { id } = req.params
    let data = await user.findByIdAndDelete(id)
    res.status(200).send(data)
}
module.exports = { signup, signupui, loginui, login, userDelete }