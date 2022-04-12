const shopItemBtns = document.querySelectorAll(".shop-item-button");
console.log(shopItemBtns);
if (shopItemBtns.length > 0) {
    shopItemBtns.forEach(function(singleItem) {
        singleItem.addEventListener("click", addToCart);
    });
}
// }

function addToCart(event) {
    event.preventDefault();
    const currentElement = event.target;
    const priceTemp = currentElement.previousElementSibling.innerText;
    const convertedPrice = parseFloat(priceTemp.replace("$", ""));// used to accept a string and convert it into a number.
    const image = currentElement.parentElement.previousElementSibling.src;
    const itemName =
        currentElement.parentElement.previousElementSibling.previousElementSibling
        .innerText;

    const cartItem = document.querySelector(".cart-items");

    //check if this item is already exist on this cart
    let isUserHaveThisItem = false;
    const cartRows = document.querySelectorAll(".cart-items .cart-row");
    if (cartRows.length > 0) {
        cartRows.forEach(function(singleCartRow) {
            const prevCartTitle = singleCartRow.querySelector(".cart-item-title").innerText;
            if (prevCartTitle == itemName) {

                const quantityInput = singleCartRow.querySelector(".cart-quantity-input");
                const currentQty = parseInt(quantityInput.value) + 1; // parseINT converts its first argument to a string parses that string then returns an integer or NaN
                quantityInput.value = currentQty;

                const cartQtyExactPriceTemp = singleCartRow.querySelector(".cart-exact-price");
                const cartQtyExactPrice = parseFloat(cartQtyExactPriceTemp.innerText.replace("$", ""));

                singleCartRow.querySelector(".cart-qty-price").innerText = "$ " + (cartQtyExactPrice * currentQty).toFixed(2);

                isUserHaveThisItem = true;
            }
        });
    }

    if (isUserHaveThisItem == false) {

        const cartRow = document.createElement("div");
        cartRow.classList.add("cart-row");
        const cartRowContent = `<div class="cart-item cart-column">
                          <img class="cart-item-image" src="${image}" width="100" height="100">
                          <span class="cart-item-title">${itemName}</span>
                      </div>
                      <span class="cart-price cart-exact-price cart-column">$ ${convertedPrice}</span>
                        <span class="cart-price cart-qty-price cart-column">$ ${convertedPrice}</span>
                      <div class="cart-quantity cart-column">
                          <input class="cart-quantity-input" type="number" value="1">
                          <button class="btn btn-danger cart-delete-btn" type="button" >REMOVE</button>
                      </div>`;
        cartRow.innerHTML = cartRowContent;

        cartItem.append(cartRow);
    }

    bindAllDeleteBtnEvents();

    updateCartTotal();
}

function bindAllDeleteBtnEvents() {
    const removeBtns = document.querySelectorAll(".cart-delete-btn");
    if (removeBtns.length > 0) {
        removeBtns.forEach(function(singleBtn) {
            singleBtn.addEventListener("click", removeBtnHandler);
        }); 
    }
}

function removeBtnHandler(event) {
    event.preventDefault();
    if (confirm("Are you sure")) {
        const currentElement = event.target;
        currentElement.parentElement.parentElement.remove();
    }
    updateCartTotal();
}


function updateCartTotal() {
    const cartRows = document.querySelectorAll(".cart-items .cart-row");
    let total = 0;
    if (cartRows.length > 0) {
        cartRows.forEach(function(singleCartRow) {
            const qtyPriceTemp = singleCartRow.querySelector('.cart-qty-price');
            const convertedPrice = parseFloat(qtyPriceTemp.innerText.replace("$", ""))
                // total += convertedPrice;
            total = total + convertedPrice;
        })
    }

    document.querySelector(".cart-total-price").innerText = "$ " + total.toFixed(2);
}