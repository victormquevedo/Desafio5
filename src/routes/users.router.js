import { Router } from 'express';
import UsersManager from '../persistence/daos/mongoManagers/UsersManager.js';

const router = Router();
const usersManager = new UsersManager();

router.get('/logout', (request, response) => {
    request.session.destroy( error => {
        if (error) {
            console.log(error);
            response.json({ message: error })
        } else {
            // response.json({ message: 'Sesión eliminada con éxito.' });
            response.redirect('/views/login')
        }
    })
});

router.post('/register', async (request, response) => {
    const newUser = await usersManager.createUser(request.body);
    if (newUser) {
        response.redirect('/views/login')
    } else {
        response.redirect('/views/errorRegister')
    }
});

router.post('/login', async (request, response) => {
    const { email } = request.body;
    const user = await usersManager.loginUser(request.body);
    if (user) {
        request.session.name = user[0].firstName;
        request.session.email = email;
        if (user[0].admin) {
            request.session.role = 'admin'
        } else {
            request.session.role = 'user'
        }
        response.redirect('/views/products')
    } else {
        response.redirect('/views/errorLogin')
    }
})


export default router;