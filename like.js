const likesContainer = document.querySelector(".likes");
const totalSpan = document.querySelector(".cart-total");
const clearBtn = document.getElementById("clearLikeBtn");
const addToCartBtn = document.getElementById("orderBtn1");

function renderLikes() {
    const items = favorite.getAll();

    likesContainer.innerHTML = "";
    let total = 0;

    if (items.length === 0) {
        likesContainer.innerHTML = "<h3>💔 Вподобаних товарів немає</h3>";
        totalSpan.textContent = "0";
        return;
    }

    items.forEach(item => {
        total += item.price;

        const div = document.createElement("div");
        div.className = "like-item";

        div.innerHTML = `
            <img src="${item.image}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="titquan">
                    <p class="cart-item-title">${item.title}</p>
                </div>
                <div class="prcbtn">
                    <div class="cart-item-price">
                        ${item.price} грн
                    </div>
                </div>
                <div class="del_btn">
                    <button class="remove-like delbtn">vidalit</button>
                </div>
            </div>
        `;

        div.querySelector(".remove-like").onclick = () => {
            favorite.add(item);
            renderLikes();
        };

        likesContainer.appendChild(div);
    });

    totalSpan.textContent = total;
}

clearBtn.onclick = () => {
    favorite.clear();
    renderLikes();
};

addToCartBtn.onclick = () => {
    const items = favorite.getAll();

    if (items.length === 0) {
        return;
    }

    items.forEach(item => {
        if (typeof cart !== 'undefined') {
            cart.addItem(item);
        }
    });
};

document.addEventListener('DOMContentLoaded', renderLikes);
