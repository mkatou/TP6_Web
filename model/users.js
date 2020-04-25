//uuid module import
const uuidv1 = require('uuid/v1')


//user model 
const users = [{
        id: uuidv1(),
        login: 'maro',
        name: 'Marius Katou',
        age: 18
    },

    {
        id: uuidv1(),
        login: 'drigo',
        name: 'Rodrigue Katou',
        age: 30
    },

    {
        id: uuidv1(),
        login: 'mano',
        name: 'Hermann Katou',
        age: 28
    },

]

/* ----- patten injection creation -----*/

//get user by id

const get = (id) => {
    const getUsers = users.filter((user) => user.id === id)
    return getUsers.length >= 1 ? getUsers[0] : undefined
}


//get all users
const getAll = () => {
    return users
}


//add new user 
const add = (user) => {
    const newUser = {
        ...user,
        id: uuidv1()
    }
    if (userValidator(newUser)) {
        users.push(newUser)
    } else {
        throw new Error('this user is not valid')
    }
    return newUser
}

//update a user
const update = (id, userPropertiesUpdated) => {
    const getUsers = users.filter((user) => user.id === id)
    if (getUsers.length === 1) {
        const existingUser = getUsers[0]
        const newUser = {
            ...existingUser,
            ...userPropertiesUpdated
        }
        if (userValidator(newUser)) {
            //Object.assign usage: it permits to keep old user properties and add new user
            Object.assign(existingUser, newUser)
        } else {
            throw new Error('user is not valid')
        }
    } else {
        throw new Error('user is not found')
    }
}

//remove user

const remove = (id) => {
    const userIndex = users.findIndex((user) => user.id === id)
    if (userIndex > -1) {
        users.splice(userIndex, 1)
    } else {
        throw new Error('user is not found')
    }
}

//user validation function
function userValidator(user) {
    let output = true
    if (user && user.id && user.login && user.name) {
        output = true
    }
}

//patten export

exports.get = get
exports.getAll = getAll
exports.add = add
exports.update = update
exports.remove = remove