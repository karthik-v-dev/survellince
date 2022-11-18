function fill_warranty_info(product){
    //if warranty exists
    if (
        (Object.keys(product.warranty_packs).length > 0) &&
        (Object.keys(product.warranty_packs.prices).length > 0)
    ) {
        let warranty_sec = document.getElementsByClassName("Warranty_selection")[0];
        let warranty_packs = Object.keys(product.warranty_packs.prices);
        for (let i = 0; i < warranty_packs.length; i++) {
            let span = document.createElement("span");
            span.className = "Warranty_selection" + (i + 1).toString() + " warranty_set";
            //to highlight selected pack
            if (i == 0){
                span.className += " selected";
                //Adding initial prices for product in product cart
                product_cart.warranties.price = product.warranty_packs.prices[warranty_packs[i]] - product.warranty_packs.prices[warranty_packs[0]];
                product_cart.warranties.discount = 0;
            }
            
            //button inner text info
            span.innerHTML = warranty_packs[i].toString() + "Year - $" + product.warranty_packs.prices[warranty_packs[i]].toFixed(2);

            //on click events for packs
            span.addEventListener("click", (e) => {
                highlight_element(span, "warranty_set");
                product_cart.warranties = adjust_cart_price(
                    product_cart.warranties,
                    "warranty",
                    Number(document.getElementById("Add").previousElementSibling.innerText), //1
                    1,
                    //warranty difference
                    product.warranty_packs.prices[warranty_packs[i]] - product.warranty_packs.prices[warranty_packs[0]],
                    product.warranty_packs.prices[warranty_packs[i]] - product.warranty_packs.prices[warranty_packs[0]],
                    0,
                );
                change_product_price_text(
                    product_cart,
                    document.getElementsByClassName("discounted_price")[0],
                    document.getElementsByClassName("Original_price")[0],
                    document.getElementsByClassName("Disc_color")[0]
                );
                update_final_cart_summary(product_cart);
            });

            warranty_sec.appendChild(span);
        }
    }
    else {
        document.getElementsByClassName("warranty")[0].style = "display: None;"
    }
}