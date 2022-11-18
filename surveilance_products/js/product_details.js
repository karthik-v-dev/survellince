function middle_section(product) {
    fill_data(product, "product");
}

function fill_data(product, type = "product") {
    //product title
    document.getElementsByClassName("P_title")[0].innerText = product.title;

    //ratings
    let ratings_ele = document.getElementsByClassName("ratings")[0];
    ratings_ele = fill_ratings_info(ratings_ele, product);

    //discount
    // document.getElementsByClassName("Disc_color")[0].innerText = "Save $"+product.discount.toFixed(2);
    set_price_in_ele(document.getElementsByClassName("Disc_color")[0], product.discount);

    //price
    // document.getElementsByClassName("discounted_price")[0].innerText = "$"+product.discounted_price.toFixed(2);
    set_price_in_ele(document.getElementsByClassName("discounted_price")[0], product.discounted_price);

    //Original price
    // document.getElementsByClassName("Original_price")[0].innerText = "$"+product.original_price.toFixed(2);
    set_price_in_ele(document.getElementsByClassName("Original_price")[0], product.original_price);

    //packs section
    fill_packs_info(product);

    //warranty section
    fill_warranty_info(product);
}

function set_price_in_ele(ele, price) {
    ele.innerText = ""
    if (ele.classList.contains("Disc_color"))
        ele.innerText += "Save ";
    ele.innerText += " $" + price.toFixed(2);
}

function highlight_element(ele, class_name) {
    [...document.getElementsByClassName(class_name)].forEach((item) => {
        item.classList.remove("selected");
    });
    ele.className += " selected";
}

