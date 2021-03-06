import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { ReactComponent as CartEmpty } from '../../assets/svg/cart-empty.svg';
import { ReactComponent as CartFull } from '../../assets/svg/cart-full.svg';
import { ReactComponent as Close } from '../../assets/svg/close.svg';
import { ReactComponent as Garbage } from '../../assets/svg/garbage.svg';
import { STORAGE_PRODUCT_CART, BASE_PATH } from '../../utils/constants';
import {
    removeArrayDuplicates,
    duplicateItemArray,
    removeItemArray,
} from '../../utils/arrayUtils';
import './Cart.scss';
const Cart = ({ productCart, getProductsCart, productos }) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [singleProductCart, setSingleProductCart] = useState([]);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    const widthCartContent = cartOpen ? 400 : 0;

    useEffect(() => {
        const allProductsId = removeArrayDuplicates(productCart);
        setSingleProductCart(allProductsId);
    }, [productCart]);

    useEffect(() => {
        let productData = {};
        const allProductId = removeArrayDuplicates(productCart);
        let totalPrice = 0;

        allProductId.forEach((productId) => {
            const quantity = duplicateItemArray(productId, productCart);
            productData = { ...productData, [productId]: quantity };
        });

        if (productos.length) {
            totalPrice = calcularPrecio(productos, totalPrice, productData);
            setCartTotalPrice(totalPrice);
        }


    }, [productCart, productos]);

    const openCart = () => {
        setCartOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeCart = () => {
        setCartOpen(false);
        document.body.style.overflow = 'scroll';
    };

    return (
        <>
            <Button variant='link' className='cart'>
                {productCart.length > 0 ? (
                    <CartFull onClick={openCart} />
                ) : (
                    <CartEmpty onClick={openCart} />
                )}
            </Button>
            <div className='cart-content' style={{ width: widthCartContent }}>
                <CartContentHeader
                    closeCart={closeCart}
                    getProductsCart={getProductsCart}
                />
                <CartContentProducts
                    productCart={productCart}
                    productos={productos}
                    singleProductCart={singleProductCart}
                    getProductsCart={getProductsCart}
                />
                <CartContentFooter cartTotalPrice={cartTotalPrice} />
            </div>
        </>
    );
};

function calcularPrecio(productos, totalPrice, productData) {
    productos.forEach((producto) => {
        totalPrice += productData[producto.id]
            ? productData[producto.id] * producto.price
            : 1;
    });
    return totalPrice;
}

function CartContentHeader(props) {
    const { closeCart, getProductsCart } = props;

    const emptyCart = () => {
        localStorage.removeItem(STORAGE_PRODUCT_CART);
        getProductsCart();
        closeCart();
    };

    return (
        <div className='cart-content__header'>
            <div>
                <Close onClick={closeCart} />
                <h2>Carrito</h2>
            </div>
            <Button variant='link' onClick={emptyCart}>
                Vaciar
                <Garbage />
            </Button>
        </div>
    );
}

function CartContentProducts(props) {
    const {
        productCart,
        productos,
        singleProductCart,
        getProductsCart,
    } = props;

    return (
        <>
            <div className='cart-content__products'>
                {singleProductCart.map((id, index) => {
                    const producto = productos.find(
                        (e) => e.id === parseInt(id, 10),
                    );
                    const quantity =
                        producto &&
                        duplicateItemArray(producto.id, productCart);
                    return (
                        producto && (
                            <ProductCart
                                key={`${index}_${producto.id}`}
                                producto={producto}
                                quantity={quantity}
                                productCart={productCart}
                                getProductsCart={getProductsCart}
                            />
                        )
                    );
                })}
            </div>
        </>
    );
}

function ProductCart({ producto, quantity, productCart, getProductsCart }) {
    const increase = () => {
        const arrayItemsCart = productCart;
        arrayItemsCart.push(producto.id);
        localStorage.setItem(STORAGE_PRODUCT_CART, arrayItemsCart);
        getProductsCart();
    };

    const decrease = () => {
        const arrayItemsCart = removeItemArray(
            productCart,
            producto.id.toString(),
        );
        localStorage.setItem(STORAGE_PRODUCT_CART, arrayItemsCart);
        getProductsCart();
    };
    return (
        <>
            <div className='cart-content__product'>
                <img
                    src={`${BASE_PATH}/${producto.image}`}
                    alt={producto.name}
                />
                <div className='cart-content__product-info'>
                    <h3>{producto.name.substr(0, 25)}</h3>
                    <p>{producto.price.toFixed(2)}</p>
                    <div>
                        <p>En carro: {quantity} ud.</p>
                        <div>
                            <button onClick={increase}>+</button>
                            <button onClick={decrease}>-</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function CartContentFooter(props) {
    const { cartTotalPrice } = props;

    return (
        <div className='cart-content__footer'>
            <div>
                <p>Total aproximado: </p>
                <p>{cartTotalPrice.toFixed(2)} €</p>
            </div>
            <Button>Tramitar Peidos</Button>
        </div>
    );
}
export default Cart;
