import { usersModel } from '../../models/users.model.js';

export default class UsersManager {
    async createUser(user) {
        const { email } = user;
        try {
            const userExists = await usersModel.find({ email });
            if (userExists.length === 0) {
                const newUser = await usersModel.create(user);
                return newUser
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }

    async loginUser(user) {
        try {
            const { email, password } = user;
            const foundUser = await usersModel.find({ email, password });
            if (foundUser.length !== 0) {
                return foundUser
            } else if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                return [{...user, firstName: 'coder', lastName: 'house', admin: true, age: 9}]
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }
}