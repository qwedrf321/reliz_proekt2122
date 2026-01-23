function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));
    const titleElement = document.getElementById("title");
    const imageElement = document.getElementById("image");
    const priceElement = document.getElementById("price");
    const propertiesElement = document.getElementById("properties");
    const buyBtn = document.getElementById("buyBtn");
    const likeBtn = document.getElementById("likeBtn");

    if (titleElement && imageElement && priceElement && propertiesElement && buyBtn && likeBtn && productId) {

        fetch("products.json")
            .then(res => {
                if (!res.ok) throw new Error("Не удалось загрузить products.json");
                return res.json();
            })
            .then(products => {
                const product = products.find(p => p.id === productId);
                if (!product) {
                    document.body.innerHTML = "<h1>Товар не найден</h1>";
                    return;
                }

                titleElement.textContent = product.title;
                priceElement.textContent = product.price + " грн";
                imageElement.src = product.image;
                imageElement.alt = product.title;

                propertiesElement.innerHTML = '';
                for (let key in product) {
                    if (["id", "title", "price", "image", "category"].includes(key)) continue;

                    const p = document.createElement("p");
                    p.innerHTML = `<b>${key}:</b> ${product[key]}`;
                    propertiesElement.appendChild(p);
                }

                buyBtn.addEventListener("click", () => {
                    if (typeof cart !== 'undefined') {
                        cart.addItem(product);
                    } else {
                        console.error("Объект cart не найден");
                    }
                });

                likeBtn.addEventListener("click", () => {
                    if (typeof favorite !== 'undefined') {
                        favorite.add(product);
                        
                        if (favorite.isLiked(product.id)) {
                            likeBtn.textContent = "❤️ Видалити зі списку бажань";
                            likeBtn.style.backgroundColor = "#ff6b6b";
                        } else {
                            likeBtn.textContent = "Додати в список бажань";
                            likeBtn.style.backgroundColor = "";
                        }
                    } else {
                        console.error("Объект favorite не найден");
                    }
                });

                if (typeof favorite !== 'undefined' && favorite.isLiked(product.id)) {
                    likeBtn.textContent = "❤️ Видалити зі списку бажань";
                    likeBtn.style.backgroundColor = "#ff6b6b";
                }
            })
            .catch(err => {
                console.error("Ошибка загрузки товара:", err);
                document.body.innerHTML = "<h1>Ошибка загрузки товара</h1>";
            });
    }
}

document.addEventListener('DOMContentLoaded', loadProductDetails);

