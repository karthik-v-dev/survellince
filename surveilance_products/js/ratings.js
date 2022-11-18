function fill_ratings_info(ratings_ele, product){
    for (let k = 0; k < 5; k++) {
        let span = document.createElement("span");
        let i = document.createElement("i");
        if (k < Number(product.avg_rating.toFixed(0)))
            i.className = "fa fa-star fa-star-custom";
        else
            i.className = "fa fa-star-o fa-star-custom";
        i.ariaHidden = true;
        span.appendChild(i)
        ratings_ele.appendChild(span)
    }
    let span = document.createElement("span");
    span.className = "fa0";
    span.innerText = product.review_count.toString() + " Reviews";
    ratings_ele.appendChild(span);
    return ratings_ele;
}