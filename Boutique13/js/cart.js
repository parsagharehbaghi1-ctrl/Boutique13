/* ==============================================
   NAVBAR یکپارچه بوتیک ۱۳
   این فایل خودش HTML هدر، منوی موبایل و سرچ‌اورلی رو
   می‌سازه و به بالای <body> اضافه می‌کنه.
   یعنی توی هیچ‌کدوم از صفحات (index.html, men.html, ...)
   دیگه لازم نیست هدر رو دستی بنویسی؛ فقط کافیه همین یک
   فایل رو در انتهای body لینک کنی:

   <script src="navbar.js"></script>

   و navbar.css رو هم داخل <head> اضافه کنی. همین.
   این‌طوری هدر همه‌ی صفحات صد در صد یکسان می‌مونه و اگه
   یه روز خواستی چیزی توش عوض بشه، فقط همین یک فایل رو
   ویرایش می‌کنی، نه ۶ تا فایل جدا جدا.
   ============================================== */

(function(){

    // لیست لینک‌های منو — اسم فایل هر صفحه اینجا مشخصه
    const links = [
        { href:"index.html",        label:"خانه" },
        { href:"men.html",          label:"مردانه" },
        { href:"women.html",        label:"زنانه" },
        { href:"shoes.html",        label:"کفش" },
        { href:"accessories.html",  label:"اکسسوری" },
        { href:"contact.html",      label:"تماس با ما" }
    ];

    // آیکون‌های SVG ساده و سبک (بدون نیاز به فونت/کتابخانه خارجی)
    const icons = {
        search:`<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
        heart:`<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path></svg>`,
        bag:`<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l1 13H5z"></path><path d="M9 8V6a3 3 0 0 1 6 0v2"></path></svg>`
    };

    function currentPage(){
        let p = location.pathname.split("/").pop();
        if(p === "" || p === "/"){ p = "index.html"; }
        return p;
    }

    function navLinksHTML(withActive){
        const page = currentPage();
        return links.map(l=>{
            const active = l.href === page ? " active" : "";
            return `<a href="${l.href}" class="${withActive ? active.trim() : ""}">${l.label}</a>`;
        }).join("");
    }

    const headerHTML = `
    <header class="site-header" id="siteHeader">

        <a href="index.html" class="logo">
            <span class="logoIcon">B</span>
            <span class="logoText">Boutique<small>13</small></span>
        </a>

        <nav class="navbar" id="mainNav">
            ${navLinksHTML(true)}
        </nav>

        <div class="navIcons">
            <button class="searchBtn" aria-label="جستجو">${icons.search}</button>
            <button class="wishBtn" aria-label="علاقه‌مندی‌ها">
                ${icons.heart}
                <span class="badge" id="wishCount">0</span>
            </button>
            <button class="cartBtn" aria-label="سبد خرید">
                ${icons.bag}
                <span class="badge" id="cartCount">0</span>
            </button>
            <button class="menuToggle" id="menuToggle" aria-label="منو">
                <span></span><span></span><span></span>
            </button>
        </div>

    </header>

    <div class="mobileMenu" id="mobileMenu">
        ${navLinksHTML(true)}
    </div>

    <div class="searchOverlay" id="searchOverlay">
        <div class="searchBox">
            <div class="searchHeader">
                <input type="text" id="searchInput" placeholder="جستجوی محصول...">
                <button class="closeSearch" aria-label="بستن">✕</button>
            </div>
            <div class="searchResults"></div>
        </div>
    </div>

    <div class="cartOverlay"></div>
    <aside class="cart">
        <div class="cartHead">
            <h3>سبد خرید</h3>
            <button class="closeCart" aria-label="بستن">✕</button>
        </div>
        <div class="cartBody"></div>
        <div class="cartFoot">
            <p class="totalPrice">جمع کل: <strong>۰ تومان</strong></p>
            <a href="checkout.html" class="checkoutBtn">تسویه حساب</a>
        </div>
    </aside>
    `;

    document.body.insertAdjacentHTML("afterbegin", headerHTML);

    // توجه: بازکردن/بستن باکس سرچ دیگه اینجا مدیریت نمی‌شه — search.js
    // خودش روی همین المنت‌هایی که بالا ساختیم (.searchBtn, #searchOverlay,
    // .closeSearch, #searchInput) لیسنر می‌ذاره. فقط کافیه navbar.js
    // قبل از search.js لود بشه تا این المنت‌ها موقع اجرای search.js
    // از قبل توی DOM باشن.

    // ---------- عناصر ----------
    const header        = document.getElementById("siteHeader");
    const menuToggle     = document.getElementById("menuToggle");
    const mobileMenu     = document.getElementById("mobileMenu");

    // ---------- منوی موبایل ----------
    menuToggle.addEventListener("click", ()=>{
        menuToggle.classList.toggle("open");
        mobileMenu.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach(a=>{
        a.addEventListener("click", ()=>{
            menuToggle.classList.remove("open");
            mobileMenu.classList.remove("active");
        });
    });

    // ---------- بستن منوی موبایل با Escape ----------
    // (بستن باکس سرچ با Escape از قبل توسط خود search.js انجام می‌شه)
    document.addEventListener("keydown", (e)=>{
        if(e.key === "Escape"){
            menuToggle.classList.remove("open");
            mobileMenu.classList.remove("active");
        }
    });

    // ---------- جمع‌شدن هدر موقع اسکرول ----------
    window.addEventListener("scroll", ()=>{
        if(window.scrollY > 40){
            header.classList.add("scrolled");
        }else{
            header.classList.remove("scrolled");
        }
    });

})();


/* ==============================================
   ShoppingCart
   این کلاس قبلاً اصلاً وجود نداشت — به همین دلیل
   shoppingCart.addProduct(...) در product.js با خطا
   مواجه می‌شد و نه سبد باز می‌شد، نه عدد روی آیکون
   سبد به‌روزرسانی می‌شد.
   ============================================== */

class ShoppingCart{

    constructor(){

        this.storageKey = "cart";

        this.items = JSON.parse(localStorage.getItem(this.storageKey)) || [];

        this.cartEl    = document.querySelector(".cart");
        this.overlayEl = document.querySelector(".cartOverlay");
        this.bodyEl    = document.querySelector(".cartBody");
        this.totalEl   = document.querySelector(".totalPrice strong");
        this.countEl   = document.getElementById("cartCount");
        this.cartBtn   = document.querySelector(".cartBtn");
        this.closeBtn  = document.querySelector(".closeCart");

        this.init();

    }

    init(){

        this.render();

        this.cartBtn && this.cartBtn.addEventListener("click", ()=> this.open());
        this.closeBtn && this.closeBtn.addEventListener("click", ()=> this.close());
        this.overlayEl && this.overlayEl.addEventListener("click", ()=> this.close());

        this.bodyEl && this.bodyEl.addEventListener("click", (e)=>{

            const item = e.target.closest(".cartItem");
            if(!item) return;
            const index = Number(item.dataset.index);

            if(e.target.closest(".increase")) this.changeQty(index, 1);
            if(e.target.closest(".decrease")) this.changeQty(index, -1);
            if(e.target.closest(".deleteItem")) this.removeItem(index);

        });

    }

    open(){
        this.cartEl.classList.add("active");
        this.overlayEl.classList.add("active");
    }

    close(){
        this.cartEl.classList.remove("active");
        this.overlayEl.classList.remove("active");
    }

    addProduct(product){

        const existing = this.items.find(i=>
            i.id === product.id && i.color === product.color && i.size === product.size
        );

        if(existing){
            existing.qty += 1;
        }else{
            product.qty = 1;
            this.items.push(product);
        }

        this.save();
        this.render();
        this.open();
        this.bounceIcon();

    }

    changeQty(index, delta){

        const item = this.items[index];
        if(!item) return;

        item.qty += delta;

        if(item.qty <= 0){
            this.items.splice(index,1);
        }

        this.save();
        this.render();

    }

    removeItem(index){
        this.items.splice(index,1);
        this.save();
        this.render();
    }

    save(){
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    }

    getTotal(){
        return this.items.reduce((sum,i)=> sum + (i.price * i.qty), 0);
    }

    bounceIcon(){
        if(!this.cartBtn) return;
        this.cartBtn.classList.remove("cartBounce");
        void this.cartBtn.offsetWidth; // ری‌استارت انیمیشن
        this.cartBtn.classList.add("cartBounce");
    }

    render(){

        if(this.countEl){
            const totalQty = this.items.reduce((s,i)=> s + i.qty, 0);
            this.countEl.textContent = totalQty;
            this.countEl.style.display = totalQty > 0 ? "flex" : "none";
        }

        if(this.totalEl){
            this.totalEl.textContent = this.getTotal().toLocaleString("fa-IR") + " تومان";
        }

        if(!this.bodyEl) return;

        if(this.items.length === 0){
            this.bodyEl.innerHTML = `<div class="emptyCart">سبد خرید شما خالی است.</div>`;
            return;
        }

        this.bodyEl.innerHTML = this.items.map((item, index)=> `

            <div class="cartItem" data-index="${index}">

                <img src="${item.image}" alt="${item.name}">

                <div class="cartInfo">
                    <h3>${item.name}</h3>
                    <small>${item.color || ""} ${item.size ? "- " + item.size : ""}</small>
                    <p>${Number(item.price).toLocaleString("fa-IR")} تومان</p>

                    <div class="quantity">
                        <button class="decrease">-</button>
                        <span>${item.qty}</span>
                        <button class="increase">+</button>
                    </div>
                </div>

                <button class="deleteItem">🗑</button>

            </div>

        `).join("");

    }

}

const shoppingCart = new ShoppingCart();
