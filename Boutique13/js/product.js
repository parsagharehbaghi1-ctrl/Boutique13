const mainImage = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach(img => {

    img.addEventListener("click", () => {

        mainImage.style.opacity = "0";

        setTimeout(() => {

            mainImage.src = img.src;

            mainImage.style.opacity = "1";

        },200);

        thumbs.forEach(item=>item.classList.remove("active"));

        img.classList.add("active");

    });

});
const sizes = document.querySelectorAll(".sizes button");

let selectedSize="";

sizes.forEach(btn=>{

    btn.addEventListener("click",()=>{

        sizes.forEach(item=>item.classList.remove("active"));

        btn.classList.add("active");

        selectedSize=btn.innerText;

    });

});
const colors=document.querySelectorAll(".colors span");

let selectedColor="";

colors.forEach(color=>{

    color.addEventListener("click",()=>{

        colors.forEach(item=>item.classList.remove("selected"));

        color.classList.add("selected");

        selectedColor=color.dataset.color;

    });

});
const addBtn = document.querySelector(".addtocart");

addBtn.addEventListener("click", () => {

    if (!selectedColor) {

        alert("رنگ را انتخاب کنید.");

        return;

    }

    if (!selectedSize) {

        alert("سایز را انتخاب کنید.");

        return;

    }

    const product = {

        id: 1,

        name: "تیشرت اورسایز Premium",

        price: 1490000,

        image: mainImage.src,

        color: selectedColor,

        size: selectedSize

    };

    shoppingCart.addProduct(product);

    // --- فیدبک بصری: دکمه سیاه میشه و یک تیک سبز با انیمیشن نمایش داده میشه ---
    if(addBtn.dataset.busy === "true") return;
    addBtn.dataset.busy = "true";

    const originalHTML = addBtn.innerHTML;

    addBtn.classList.add("added");
    addBtn.innerHTML = `
        <svg class="checkIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 12 10 18 20 6"></polyline>
        </svg>
        <span>افزوده شد</span>
    `;

    setTimeout(() => {
        addBtn.classList.remove("added");
        addBtn.innerHTML = originalHTML;
        addBtn.dataset.busy = "false";
    }, 1600);

});
const image = document.getElementById("mainImage");
const container = document.querySelector(".mainImage");

container.addEventListener("mousemove",(e)=>{

    const rect = container.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    image.style.transformOrigin = `${x}% ${y}%`;

    image.style.transform = "scale(1.4)";

});

container.addEventListener("mouseleave",()=>{

    image.style.transformOrigin = "center";

    image.style.transform = "scale(1)";

});
