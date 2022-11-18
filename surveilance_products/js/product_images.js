function left_section(images) {
    product_images_segment(images[0]);
    product_thumbnails(images);
}

function product_images_segment(image_path) {
    document.getElementById("product_image").src = image_path;
    document.getElementById("full_product_image").src = image_path;
}

function product_thumbnails(images) {
    for (let i = 0; i < images.length; i++) {
        img = document.createElement("img");
        img.src = images[i];
        img.className = "img_style1";

        btn = document.createElement("button");
        btn.className = "Product";
        btn.id = "image_" + i.toString();
        btn.addEventListener("click", (e) => {
            product_images_segment(images[i])
        });
        btn.appendChild(img);
        document.getElementById("other_images").appendChild(btn);
    }
}