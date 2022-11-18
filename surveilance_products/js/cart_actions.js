function addToCartActions(){
    //on click @ add to cart button
    document.getElementById("addToCart").addEventListener("click", (e)=>{
        product_cart.products.count = 1;
        document.getElementById("addToCart").style = "display:none";
        document.getElementById("quantity").style = "display:block";
        document.getElementsByClassName("add_ons_main_container")[0].style = "display:block";
        // find_final_cart_prices_for_single_product(product_cart);
        document.getElementsByClassName("Third_seg")[0].style = "display:block";
        update_final_cart_summary(product_cart);
    });

    // on click @ (+) increase quantity
    document.getElementById("Add").addEventListener("click", (e) => {
        product_cart.products.count += 1;
        document.getElementById("Add").previousElementSibling.innerText = product_cart.products.count.toString();
        // find_final_cart_prices_for_single_product(product_cart);
        update_final_cart_summary(product_cart);
    });

    // on click @ (-) decrease quantity
    document.getElementById("Sub").addEventListener("click", (e) => {
        product_cart.products.count -= 1;
        update_final_cart_summary(product_cart);
        // if selected quantity = 0: enable add to cart button
        if (product_cart.products.count < 1){
            document.getElementById("addToCart").style = "display:block";
            document.getElementById("quantity").style = "display:none";
            document.getElementsByClassName("add_ons_main_container")[0].style = "display:none";
            document.getElementsByClassName("Third_seg")[0].style = "display:none";
        }
        else
            document.getElementById("Sub").nextElementSibling.innerText = product_cart.products.count.toString();
        
        // find_final_cart_prices_for_single_product(product_cart)
    });
}

// to update final cart prices in the cart summary
function update_final_cart_summary(product_cart){
    let final_cart_prices = final_cart_prices_for_all_products(product_cart);

    document.getElementsByClassName("total_product_price")[0].innerText = "$" + final_cart_prices.product.price.toFixed(2);
    
    document.getElementsByClassName("total_add_ons_count")[0].innerText = final_cart_prices.add_ons.count.toString();
    document.getElementById("Add_items").value="Add "+" "+ final_cart_prices.add_ons.count.toString()+" "+"items to cart"
    document.getElementsByClassName("total_add_ons_price")[0].innerText = "$" + final_cart_prices.add_ons.price.toFixed(2);

    let total_original_price = final_cart_prices.product.original_price + final_cart_prices.add_ons.original_price;
    document.getElementsByClassName("total_original_price")[0].innerText = "$" + total_original_price.toFixed(2);

    let total_discounted_price = final_cart_prices.product.price + final_cart_prices.add_ons.price;
    document.getElementsByClassName("total_discounted_price")[0].innerText = "$" + total_discounted_price.toFixed(2);

    let total_discount = total_original_price - total_discounted_price;
    document.getElementsByClassName("total_discount")[0].innerText = "$" + total_discount.toFixed(2);

    let total_discount_percentage = 100 * (total_discount / total_original_price);
    document.getElementsByClassName("total_discount_percentage")[0].innerText = total_discount_percentage.toFixed(0);
}