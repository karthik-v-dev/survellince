function fill_packs_info(product){
    let pack_sec = document.getElementsByClassName("Pack_selection")[0];
    for (let i = 0; i < product.pack_sizes.length; i++) {
        let span = document.createElement("span");
        span.className = "Pack_selection" + (i + 1).toString() + " pack_set";

        //to highlight selected pack
        if (i == 0){
            span.className += " selected";
            //Adding initial prices for product in product cart
            product_cart.products.count = 1;
            product_cart.products.pack_size = product.pack_sizes[i];
            product_cart.products.price = product.discounted_price;
            product_cart.products.original_price = product.original_price;
            product_cart.products.discount = product.discount;
        }

        //different text for pack size of 1
        if (product.pack_sizes[i] == 1)
            span.innerText = "Single";
        else
            span.innerHTML = product.pack_sizes[i].toString() + " - Pack";

        //on click events for packs
        span.addEventListener("click", (e) => {
            highlight_element(span, "pack_set");
            product_cart.products = adjust_cart_price(
                product_cart.products,
                "product",
                Number(document.getElementById("Add").previousElementSibling.innerText), //i + 1,
                product.pack_sizes[i],
                product.discounted_price,
                product.original_price,
                product.discount
            );
            change_product_price_text(
                product_cart,
                document.getElementsByClassName("discounted_price")[0],
                document.getElementsByClassName("Original_price")[0],
                document.getElementsByClassName("Disc_color")[0]
            );
            update_final_cart_summary(product_cart);
        });

        pack_sec.appendChild(span);
    }
}