function add_add_ons_details(){
    let add_ons = data_obj.add_ons;
    let add_ons_container = document.getElementsByClassName("add_ons_container")[0];
    add_ons_container.innerHTML = "";
    if (add_ons.length > 0){
        for (let i=0; i<add_ons.length; i++){
            let add_on = add_ons[i];

            /**Seperate container for each add-on */
            let container_div = document.createElement("div");
            container_div.className = "container";



            /** To add checkbox */
            let div1 =  add_checkbox(i+1, add_on);
            div1.style.margin="13% 0% 0% 0%";
            div1.style.textAlign='revert';
            console.log(div1);
            container_div.appendChild(div1);

            /**to add image and offer text */
            let div2 = add_add_on_image_and_offer(add_on);
            container_div.appendChild(div2);

            /**to add title and ratings */
            let div3 = add_title_ratings_and_packs(add_on);
            container_div.appendChild(div3);
            

            /**Append check box to container */
            add_ons_container.appendChild(container_div);
            /**Finished adding single add-on */

            let divider = document.createElement("hr");
            divider.className = "product_divide_hr";

            add_ons_container.appendChild(divider);
        }
    }
    else{
        document.getElementsByClassName("add_ons_main_container")[0].style = "display:none";
    }
}

function add_checkbox(id, add_on){
    let div1 = document.createElement("div");
    div1.className = "Div1";
    
    let checkbox_label = document.createElement("label");
    // checkbox_label.className="checkbox_label";
    checkbox_label.className="container";
    let checkbox_input = document.createElement("input");
    let checkbox_span = document.createElement("span");
    checkbox_input.type = "checkbox";
    checkbox_input.className = "Mark";
    checkbox_input.name = "List";
    // checkbox_input.style.opacity= 0;
    checkbox_input.id = "checkbox_"+id.toString();
    checkbox_input = add_checkbox_events(checkbox_input, add_on);
    /**Finished creating checkbox for add-on */
    // checkbox_span.className="checkbox_custom";
    checkbox_span.className="checkmark";
    checkbox_label.appendChild(checkbox_input);
    checkbox_label.appendChild(checkbox_span);
    div1.appendChild(checkbox_label);
    return div1;
}

function add_checkbox_events(checkbox, add_on){
    //add change evernts (checked and unchecked) for add-on check box
    checkbox.addEventListener("change", (event)=>{
        //if selected
        if (event.target.checked){
            let obj = {
                "id": event.target.id,
                "price": add_on.discounted_price,
                "discount": add_on.discount,
                "original_price": add_on.original_price,
                "pack_size": 1 //TBD
            };
            product_cart.add_ons = product_cart.add_ons.concat(obj);
            update_final_cart_summary(product_cart);
        }
        //if unselected
        else{
            //find index of current unchecked add-on in cart
            let current_check_box_index = product_cart.add_ons.findIndex((obj) => (obj.id == event.target.id)? true: false);
            if (current_check_box_index != -1){
                let removed_obj = product_cart.add_ons.splice(current_check_box_index, 1);
            }
            update_final_cart_summary(product_cart);
        }
    });

    return checkbox;
}

function add_add_on_image_and_offer(add_on){
    let div2 = document.createElement("div");
    div2.className = "Div2";

    let p = document.createElement("p");
    p.className = "Disc_color set";
    set_price_in_ele(p, add_on.discount);

    div2.appendChild(p);
    /**Finished with offer text for add-on*/

    let img = document.createElement("img");
    img.src = add_on.images[0];
    img.className = "add_on_image";

    div2.appendChild(img);
    /**Finished with image for add-on */

    return div2;
}

function add_title_ratings_and_packs(add_on){
    let div3 = document.createElement("div");
    div3.className = "Div3";
    div3.style = "color: #545454";

    let p1 = document.createElement("p");
    // p1.className="remove_default_margin";
    p1.innerText = add_on.deal_of_the_day ? "DEAL OF THE DAY! ": "";
    p1.innerText += add_on.title;

    div3.appendChild(p1);
    /**Finished with title part for add-on */

    let model = document.createElement("strong");
    model.innerText = add_on.model;

    div3.appendChild(model);
    /**Finished with model number for add-on */

    let ratings_ele = document.createElement("p");
    // ratings_ele.className="remove_default_margin"; 
    ratings_ele = fill_ratings_info(ratings_ele, add_on);

    div3.appendChild(ratings_ele);
    /**Finished with ratings for add-on */

    // <span class="selected_item_cost">
	// 	<strong class="discounted_price bold"></strong>
	// </span>
    let span1 = document.createElement("span");
    span1.className = "selected_item_cost";
    span1.style.color="#EE0000";
    let discounted_price_ele = document.createElement("strong");
    discounted_price_ele.className = "discounted_price bold";
    set_price_in_ele(discounted_price_ele, add_on.discounted_price);
    span1.appendChild(discounted_price_ele);

    div3.appendChild(span1);
    /**Finished with discounted price for add-on */

    // <span class="Original_price bold"></span>
    let span2 = document.createElement("span");
    span2.className = "Original_price bold";
    set_price_in_ele(span2, add_on.original_price)

    div3.appendChild(span2);
    /**Finished with original price for add-on */

    return div3;
}


