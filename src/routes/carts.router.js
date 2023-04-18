import { Router } from 'express';
import CartManager from '../persistence/daos/mongoManagers/CartsManager.js';

const router = Router();

const cartManager = new CartManager();

router.post('/', async (request, response) => {
    const addedCart = await cartManager.addCart();
    response.json({ message: `El carrito ha sido creado exitosamente con el ID ${addedCart._id}.` })
});

router.get('/:cartId', async (request, response) => {
    const { cartId } = request.params;
    const cart = await cartManager.getProductsFromCart(cartId);
    if (cart) {
        response.json({ message: 'Carrito encontrado.', cart: cart })
    } else {
        response.json({ message: 'Carrito no encontrado.' })
    }
});

router.post('/:cartId/products/:productId', async (request, response) => {
    const { cartId, productId } = request.params;
    const addedProduct = await cartManager.addProductToCart(cartId, productId);
    if (addedProduct) {
        response.json({ message: 'El producto se ha agregado al carrito exitosamente.', product: addedProduct })
    } else {
        response.json({ message: 'El producto no ha podido ser agregado al carrito.' })
    }
});

router.delete('/:cartId/products/:productId', async (request, response) => {
    const { cartId, productId } = request.params;
    const cart = await cartManager.deleteProductInCart(cartId, productId);
    if (cart) {
        response.json({ message: 'El producto se ha eliminado del carrito exitosamente.', cart: cart })
    } else {
        response.json({ message: 'El producto no ha podido ser eliminado al carrito.' })
    }
});

router.put('/:cartId', async (request, response) => {
    const { cartId } = request.params;
    const products = request.body;
    const cart = await cartManager.replaceProductsInCart(cartId, products);
    if (cart) {
        response.json({ message: 'Se han actualizado los productos del carrito exitosamente.', cart: cart })
    } else {
        response.json({ message: 'No se han podido actualizar los productos del carrito.' })
    }
});

router.put('/:cartId/products/:productId', async (request, response) => {
    const { cartId, productId } = request.params;
    const { quantity } = request.body;
    const cart = await cartManager.updateProductInCart(cartId, productId, quantity);
    if (cart) {
        response.json({ message: 'Se ha actualizado la cantidad del producto en el carrito exitosamente.', cart: cart })
    } else {
        response.json({ message: 'No se ha podido actualizar la cantidad del producto en el carrito.' })
    }
});

router.delete('/:cartId', async (request, response) => {
    const { cartId } = request.params;
    const cart = await cartManager.emptyCart(cartId);
    if (cart) {
        response.json({ message: 'Se ha vaciado el carrito exitosamente.', cart: cart })
    } else {
        response.json({ message: 'No se ha podido vaciar el carrito.' })
    }
});

export default router;