/* ==============================================
   men.js — نسخه‌ی ساده
   دیگه هیچ آرایه‌ی products یا products-data.js لازم نیست.
   کارت‌های محصول مستقیم توی HTML نوشته می‌شن (هرکدوم با
   data-category="tshirt" / "pants" / "shorts" / "shoes").
   این فایل فقط دو کار می‌کنه:
   ۱) افکت سه‌بعدی روی هاور کارت‌ها
   ۲) فیلتر دسته‌بندی با نمایش/مخفی کردن (بدون بازسازی HTML)
   ============================================== */

// ---------- افکت سه‌بعدی هاور ----------
document.querySelectorAll(".product").forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width)-0.5)*8;
        const rotateX = ((y / rect.height)-0.5)*-8;

        card.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
            scale(1.02)
        `;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform = `
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0)
            scale(1)
        `;

    });

});

// ---------- فیلتر دسته‌بندی (فقط نمایش/مخفی) ----------
const filterButtons = document.querySelectorAll(".categories button");
const productCards   = document.querySelectorAll(".product");

filterButtons.forEach(btn=>{

    btn.addEventListener("click", ()=>{

        filterButtons.forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");

        const category = btn.dataset.category; // "all" یا "tshirt"/"pants"/"shorts"/"shoes"

        productCards.forEach(card=>{

            const show = category === "all" || card.dataset.category === category;

            card.style.display = show ? "" : "none";

        });

    });

});
