// ================== ЗАГРУЗКА ДЕТАЛЕЙ ТОВАРА НА СТРАНИЦЕ TOVAR.HTML ==================
// Получаем ID товара из URL
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));
// Проверяем, находимся ли мы на странице товара (ищем элементы которые есть только на tovar.html)
const titleElement = document.getElementById("title");
const imageElement = document.getElementById("image");
const priceElement = document.getElementById("price");
const propertiesElement = document.getElementById("properties");
const buyBtn = document.getElementById("buyBtn");

// Загружаем и отображаем товар только если мы на странице товара
if (titleElement && imageElement && priceElement && propertiesElement && buyBtn && productId) {
    
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

            // Отображаем информацию о товаре
            titleElement.textContent = product.title;
            priceElement.textContent = product.price + " грн";
            imageElement.src = product.image;
            imageElement.alt = product.title;

            // Отображаем свойства товара
            propertiesElement.innerHTML = '';
            for (let key in product) {
                if (["id", "title", "price", "image", "category"].includes(key)) continue;

                const p = document.createElement("p");
                p.innerHTML = `<b>${key}:</b> ${product[key]}`;
                propertiesElement.appendChild(p);
            }

            // Добавляем обработчик для кнопки "Додати в корзину"
            const currentProduct = product; // Сохраняем товар для обработчика
            buyBtn.addEventListener("click", () => {
                if (typeof cart !== 'undefined') {
                    cart.addItem(currentProduct);
                } else {
                    console.error("Объект cart не найден");
                }
            });
        })
        .catch(err => {
            console.error("Ошибка загрузки товара:", err);
            document.body.innerHTML = "<h1>Ошибка загрузки товара</h1>";
        });
} else {
    console.log("Страница не является страницей товара или ID не найден");
    console.log("titleElement:", titleElement);
    console.log("imageElement:", imageElement);
    console.log("priceElement:", priceElement);
    console.log("propertiesElement:", propertiesElement);
    console.log("cont2Element:", cont2Element);
    console.log("productId:", productId);
}