// Cambio de cantidad de articulos ingresado por el usuario.

const minusBtn = document.querySelector('.input__minus');
const plusBtn = document.querySelector('.input__plus');
let userInput = document.querySelector('.input__number');

let userInputNumber = 0;

plusBtn.addEventListener('click', ()=>{
    userInputNumber++;
    userInput.value = userInputNumber;
    
});

minusBtn.addEventListener('click', ()=>{
    userInputNumber--;
    if(userInputNumber <= 0){
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
    
});

// Agregar el total de productos al carrito cuando se presiona el boton ADD TO CART
const addToCartBtn = document.querySelector('.details__button');
let cartNotification = document.querySelector('.header__cart--notification');
let lastValue = parseInt(cartNotification.innerText);


addToCartBtn.addEventListener('click', () => {
    lastValue = lastValue + userInputNumber;
    
  // sweetalert
    Swal.fire({
      title: 'Producto agregado al carrito',
      text: `Cantidad: ${userInputNumber}`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ir al carrito',
      cancelButtonText: 'Seguir comprando',
    }).then((result) => {
      if (result.isConfirmed) {
        // Mostrar el modal del carrito
        cartModal.style.display = 'block';
      } else {
        // Continuar comprando
      }
    });
  
    cartNotification.innerText = lastValue;
    cartNotification.style.display = 'block';
    drawProductInModal();
  });

//Mostrar el modal con el detalle del carrito
const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
const productContainer = document.querySelector('.cart-modal__chekout-container');

cartIconBtn.addEventListener('click', () => {
    if (cartModal.style.display === 'block') {
      cartModal.style.display = 'none'; // Oculta el modal
    } else {
      cartModal.style.display = 'block'; // Muestra el modal
    }
    if(lastValue == 0) {
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';

    }
});

//Borrar el contenido del carrito
function deleteProduct(){
    const deleteProductBtn = document.querySelector('.cart-modal__delete');
    deleteProductBtn.addEventListener('click', ()=>{
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        lastValue = 0;
        cartNotification.innerText = lastValue;
    });
}

// Cambiar imagenes cuando se presione los botones flecha.
const imageContainer = document.querySelector('.gallery__image-container');
const previusGalleryBtn = document.querySelector('.gallery__previus');
const nextGalleryBtn = document.querySelector('.gallery__next');
let imgIndex = 1;

nextGalleryBtn.addEventListener('click', ()=>{
    changeNextImage(imageContainer);
});

previusGalleryBtn.addEventListener('click', ()=>{
    changePreviusImage(imageContainer);
});
const imageUrls = [
    'images2/image-product-1.jpg',
    'images2/image-product-2.jpg',
    'images2/image-product-3.jpg',
    'images2/image-product-4.jpg'
]

//Mostrar el modal de imagenes cuando hago click en la imagen principal.
const imagesModal = document.querySelector('.modal-gallery__background');
const closeModalBtn = document.querySelector('.modal-gallery__close');

imageContainer.addEventListener('click', ()=>{
    if(window.innerWidth >= 1115){
        imagesModal.style.display = 'grid';
    }
    
});

closeModalBtn.addEventListener('click', ()=>{
    imagesModal.style.display = 'none';
});

//Cambiar las imagenes principales desde los thumbnails
let thumbnails = document.querySelectorAll('.gallery__thumnail')
thumbnails = [...thumbnails]

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', event=>{
        console.log(event.target.id)
        imageContainer.style.backgroundImage = `url('./images2/image-product-${event.target.id}.jpg')`
    });
});

//Cambiar las imagenes principales desde los thumbnails en el MODAL
let modalthumbnails = document.querySelectorAll('.modal-gallery__thumnail');
const modalImageContainer = document.querySelector('.modal-gallery__image-container')
modalthumbnails = [...modalthumbnails]

modalthumbnails.forEach(modalthumbnail => {
    modalthumbnail.addEventListener('click', event=>{
        console.log(event.target.id.slice(-1))
        modalImageContainer.style.backgroundImage = `url('./images2/image-product-${event.target.id.slice(-1)}.jpg')`
    });
});

// Cambiar imagen principal de modal desde flechas en el modal
const previusModalBtn = document.querySelector('.modal-gallery__previus');
const nextModalBtn = document.querySelector('.modal-gallery__next');

nextModalBtn.addEventListener('click', ()=>{
    changeNextImage(modalImageContainer);
});

previusModalBtn.addEventListener('click', ()=>{
    changePreviusImage(modalImageContainer);
});

// Mostrar el navbar cuando presiono el menu de hamburgesa
const hamburgerMenu = document.querySelector('.header__menu');
const modalNavbar = document.querySelector('.modal-navbar__background');
const closeModalNavbar = document.querySelector('.modal-navbar__close-icon');

modalNavbar.style.display = 'none'

hamburgerMenu.addEventListener('click', ()=>{
    console.log('abrir modal');
    modalNavbar.style.display = 'block';
});

closeModalNavbar.addEventListener('click', ()=>{
    modalNavbar.style.display = 'none';
});





// FUNCIONES

function drawProductInModal(){
    productContainer.innerHTML = `
        <div class="cart-modal__details-container">
            <img class="cart-modal__image" src="./images2/image-product-1-thumbnail.jpg" alt="">
            <div>
            <p class="cart-modal__product">Autumn Limited Edition...</p>
            <p class="cart-modal__price">$125 x${lastValue} <span>$${lastValue*125}.00</span> </p>
            </div>
            <img class="cart-modal__delete" src="./logs/icon-delete.svg" alt="delete">
        </div>
        <button class="cart-modal__chekount">Checkout</button>`
        const check = document.querySelector('.cart-modal__chekount');
        const modal = document.getElementById('modal');
        const close = document.getElementById('close');
        const form = document.getElementById('checkout-form');
        check.addEventListener('click', ()=>{
            modal.style.display = 'block';
        });
        // Función para cerrar el modal
        close.addEventListener('click', () => {
        modal.style.display = 'none';
        });
        
        // Función para procesar el formulario
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        
            // Obtener los valores de los campos del formulario
            const nombre = document.getElementById('nombre').value;
            const cedula = document.getElementById('cedula').value;
            const telefono = document.getElementById('telefono').value;
            const correo = document.getElementById('correo').value;
            const tarjeta = document.getElementById('tarjeta').value;
        
            // Crear un objeto con los datos del formulario
            const formData = {
            nombre,
            cedula,
            telefono,
            correo,
            tarjeta
            };
        
            // Realizar una solicitud HTTP POST a JSON Server para almacenar los datos
            fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // Aquí puedes realizar acciones adicionales después de almacenar los datos, como mostrar un mensaje de éxito o redirigir al usuario a otra página
                console.log('Datos almacenados:', data);
            })
            .catch(error => {
                // Manejar cualquier error que ocurra durante la solicitud
                console.error('Error al almacenar los datos:', error);
            });
        
            // Cerrar el modal después de enviar el formulario
            modal.style.display = 'none';
        });
        
            
            
            deleteProduct()
            let priceModal = document.querySelector('.cart-modal__price');
            priceModal.innerHTML = `$125 x${lastValue} <span>$${lastValue*125}.00</span>`;
            }

        function changeNextImage(imgContainer){
            if(imgIndex === 4){
                imgIndex = 1;
            }else{
                imgIndex++;
            }
            imgContainer.style.backgroundImage = `url('./images2/image-product-${imgIndex}.jpg')`
        }

        function changePreviusImage(imgContainer){
            if(imgIndex === 1){
                imgIndex = 4;
            }else{
                imgIndex--;
            }
            imgContainer.style.backgroundImage = `url('./images2/image-product-${imgIndex}.jpg')`
        };
///////////////////////////////////////////////////////////////////////////////////////////
