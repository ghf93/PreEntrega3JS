// Lista de productos en formato JSON
const products = [
    {
        title: 'Nike Air Jordan 1 Low',
        price: '$180',
    },
    {
        title: 'Nike Dunk Low Panda',
        price: '$120',
    },
    {
        title: 'Nike Jordan 1 High Taxi',
        price: '$250',
    },
    {
        title: 'Nike Jordan 4 Red Cement',
        price: '$290',
    },
    {
        title: 'Nike Air Force 1 Total White',
        price: '$150',
    },
    {
        title: 'Nike Air Jordan 3 Dark Iris',
        price: '$150',
    },
];

// Almacenar la lista de productos en el localStorage

localStorage.setItem('productsList', JSON.stringify(products));

const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos

const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos

let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        const exists = allProducts.some(
            (product) => product.title === infoProduct.title
        );

        if (exists) {
            const products = allProducts.map((product) => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        showHTML();
    }
});

rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(
            (product) => product.title !== title
        );

        showHTML();
    }
});

// Agregar evento de escucha para el botón "completar compra"


const btnCompletePurchase = document.querySelector('.btn-complete-purchase');

btnCompletePurchase.addEventListener('click', () => {
    if (allProducts.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de completar la compra.');
    } else {
        

        allProducts = [];
        showHTML();
        alert('¡Gracias por tu compra!');
    }
});

// Funcion para mostrar HTML


const showHTML = () => {
    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    // Limpiar HTML

    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach((product) => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        rowProduct.append(containerProduct);

        total = total + parseInt(product.quantity * product.price.slice(1));
        totalOfProducts = totalOfProducts + product.quantity;
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;

    // Almacenar el carrito en el localStorage
    
    localStorage.setItem('shoppingCart', JSON.stringify(allProducts));
};

// Cargar productos del localStorage cuando inicio la página


const savedShoppingCart = localStorage.getItem('shoppingCart');
if (savedShoppingCart) {
    allProducts = JSON.parse(savedShoppingCart);
    showHTML();
}
