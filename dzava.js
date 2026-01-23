let cart_list = document.querySelector('.cart-items-list')
let cart_total = document.querySelector('.cart-total')
let orderBtn = document.querySelector("#orderBtn")
let orderSection = document.querySelector(".order")

const clearBtn = document.getElementById('clearCartBtn');

function get_item(item) {
    return `
        <div class="cart-item">
            <img src="${item.image}" class="cart-item-img">
            <div class="cart-item-info">
                <div class = 'titquan'>
                    <p class="cart-item-title">${item.title}</p>
                </div>
                <div class = 'quan'>
                    <div class="cart-item-quantity">
                        Кількість: ${item.quantity}
                    </div>
                </div>
                <div class = 'prcbtn'>
                    <div class="cart-item-price">
                        ${item.price * item.quantity} грн
                    </div>
                </div>
                <div class = 'del_btn'>
                        <button class = 'delbtn'>vidalit</button>
                </div>
            </div>
        </div>
    `;
}


if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        cart.clear();
        showCartList();
    });
}

function showCartList() {
    if (!cart_list) return;
    cart_list.innerHTML = ''
    for (let key in cart.items) {
        cart_list.innerHTML += get_item(cart.items[key])
    }
    if (cart_total) {
        cart_total.innerHTML = cart.getTotal()
    }

    document.querySelectorAll('.delbtn').forEach((btn, index) => {
        const keys = Object.keys(cart.items);
        btn.addEventListener('click', () => {
            const itemTitle = keys[index];
            if (cart.items[itemTitle].quantity > 1) {
                cart.items[itemTitle].quantity -= 1;
            } else {
                delete cart.items[itemTitle];
            }
            cart.saveCart();
            showCartList();
        });
    });
}

if (cart_list && cart_total) {
    showCartList();
}

if (orderBtn) {
    orderBtn.addEventListener("click", function (event) {
        orderBtn.style.display = "none"
        orderSection.style.display = "block"
        anime({
            targets: '.order',
            opacity: 1,
            duration: 1000,
            easing: 'easeInOutQuad'
        })
    });
}
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeModal');

function openModal() {
    if (modal) modal.style.display = 'flex';
}

function closeModal() {
    if (modal) modal.style.display = 'none';
    if (orderBtn) orderBtn.style.display = 'block';
}

if (closeBtn) closeBtn.onclick = closeModal;

if (modal) {
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
}

const orderForm = document.querySelector('.order-form');
if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            deliveryMethod: document.getElementById('deliveryMethod').value,
            address: document.getElementById('address').value,
            comment: document.getElementById('comment').value,
            items: cart.items,
            total: cart.getTotal()
        };

        console.log('Order submitted:', formData);

        cart.clear();
        closeModal();
        showCartList();
        orderBtn.style.display = 'block';

        window.location.href = 'https://youtu.be/dQw4w9WgXcQ?si=mmPsyCtptFB9mFvJ&t=40';
    });
}
