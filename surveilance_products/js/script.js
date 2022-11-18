document.addEventListener('DOMContentLoaded', (e) => {
    //Left segment
    let product = data_obj.product
    if (product.images.length > 0)
        left_section(product.images);

    //Middle segment
    middle_section(product, product_cart);

    //Add to cart button actions
    addToCartActions();

    //Add add-ons details
    add_add_ons_details();
   
    
    //Right_segment
    // right_sectoin();
});
