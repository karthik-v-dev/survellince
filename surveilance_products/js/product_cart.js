/**Object to track each product type price */
var product_cart = {
    "products": {
        "count": 0,
        "pack_size": 0,
        "price": 0,
        "original_price": 0,
        "discount": 0,
    },
    "warranties": {
        "price": 0,
        "discount": 0,
    },
    "add_ons": []
};

// to change price texts with final prices of a single product
function change_product_price_text(product_cart, discounted_price_ele, original_price_ele, discount_ele) {
    //update final cart prices for product
    let product_price = find_final_cart_prices_for_single_product(product_cart.products.pack_size, product_cart.products.price, product_cart.products.original_price, product_cart.products.discount);
    //update final cart prices for warranty
    let warranty_price = find_final_cart_prices_for_single_product(product_cart.products.pack_size, product_cart.warranties.price, product_cart.warranties.price, product_cart.warranties.discount);

    //Discounted price calculation
    let discounted_price = product_price.price + warranty_price.price;
    set_price_in_ele(discounted_price_ele, discounted_price);

    //Original price calculation
    let original_price = product_price.original_price + warranty_price.original_price;
    set_price_in_ele(original_price_ele, original_price);

    //Discount calculation
    let discount = product_price.discount + warranty_price.discount;
    set_price_in_ele(discount_ele, discount);
}

//product prices for packs
function find_final_cart_prices_for_single_product(pack_size, price, original_price, discount){

    let product_price = {
        "price": 0,
        "discount": 0,
        "original_price": 0
    };

    //Discounted price calculation
    price = //discounted price for selected no.of packs
        (pack_size * price);

    //Original price calculation
    original_price = //original price for selected no.of packs
        (pack_size * original_price);

    //Discount calculation
    discount = //dicount for selected no.of packs
        (pack_size * discount);
    
    //Update final cart prices for product
    product_price.discount = discount;
    product_price.original_price = original_price;
    product_price.price = price;

    return product_price;
}

//set prices in product cart according to it's prices
function adjust_cart_price(product_cart, product_type, count, pack_size, product_price, product_original_price, product_discount) {
    if (product_type == "product") {
        product_cart.count = count;
        product_cart.pack_size = pack_size;
        product_cart.price = product_price;
        product_cart.original_price = product_original_price;
        product_cart.discount = product_discount;
    }
    else if (product_type == "warranty") {
        product_cart.price = product_price;
        product_cart.discount = product_discount;
    }
    // else if (product_type == "add-on") {
    //     product_cart.concat({
    //         "count": count,
    //         "pack_size": pack_size,
    //         "price": product_price,
    //         "discount": product_discount
    //     });
    // }
    return product_cart;
}

//to compute complete cart prices
function final_cart_prices_for_all_products(product_cart){
    //update final cart prices for product
    let product_price = find_final_cart_prices_for_single_product(product_cart.products.pack_size, product_cart.products.price, product_cart.products.original_price, product_cart.products.discount);
    //update final cart prices for warranty
    let warranty_price = find_final_cart_prices_for_single_product(product_cart.products.pack_size, product_cart.warranties.price, product_cart.warranties.price, product_cart.warranties.discount);

    let final_cart_prices = {
        "product": {
            "price": 0,
            "discount": 0,
            "original_price": 0
        },
        "add_ons": {
            "price": 0,
            "discount": 0,
            "original_price": 0,
            "count": 0
        }
    };

    // final product prices for product at quantity of count
    final_cart_prices.product.price = product_cart.products.count * (product_price.price + warranty_price.price);
    final_cart_prices.product.discount = product_cart.products.count * (product_price.discount + warranty_price.discount);
    final_cart_prices.product.original_price = product_cart.products.count * (product_price.original_price + warranty_price.original_price);

    // final add-ons prices for all add-ons
    final_cart_prices.add_ons.count = product_cart.add_ons.length;
    for (let i=0; i<final_cart_prices.add_ons.count; i++){
        //calculate prices for an add-on of pack size
        let add_on_prices = find_final_cart_prices_for_single_product(product_cart.add_ons[i].pack_size, product_cart.add_ons[i].price, product_cart.add_ons[i].original_price, product_cart.add_ons[i].discount);

        final_cart_prices.add_ons.price += add_on_prices.price;
        final_cart_prices.add_ons.discount += add_on_prices.discount;
        final_cart_prices.add_ons.original_price += add_on_prices.original_price;
    }

    return final_cart_prices;
}