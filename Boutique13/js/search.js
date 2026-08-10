// ==========================
// Boutique13 Search System
// HTML Based - No products.js
// ==========================

const searchBtn = document.querySelector(".searchBtn");
const searchOverlay = document.querySelector(".searchOverlay");
const closeSearch = document.querySelector(".closeSearch");
const searchInput = document.getElementById("searchInput");
const searchResults = document.querySelector(".searchResults");

const productCards = document.querySelectorAll(".productCard");

// ==========================
// Open Search
// ==========================

function openSearch() {

    searchOverlay.classList.add("active");

    setTimeout(() => {

        searchInput.focus();

    }, 250);

    renderPopular();

}

// ==========================
// Close Search
// ==========================

function hideSearch() {

    searchOverlay.classList.remove("active");

    searchInput.value = "";

}

// ==========================
// Events
// ==========================

searchBtn.addEventListener("click", openSearch);

closeSearch.addEventListener("click", hideSearch);

searchOverlay.addEventListener("click", (e) => {

    if (e.target === searchOverlay) {

        hideSearch();

    }

});

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        hideSearch();

    }

});

// ==========================
// Normalize Persian
// ==========================

function normalize(text) {

    return text
        .toLowerCase()
        .replace(/ي/g, "ی")
        .replace(/ك/g, "ک")
        .replace(/\s+/g, " ")
        .trim();

}

// ==========================
// Highlight Match
// ==========================

function highlight(text, query) {

    if (!query) return text;

    const normalizedQuery = normalize(query);

    const regex = new RegExp(`(${normalizedQuery})`, "gi");

    return text.replace(regex, "<mark>$1</mark>");

}

// ==========================
// Render Results
// ==========================

function renderResults(products, query) {

    if (products.length === 0) {

        searchResults.innerHTML = `

        <div class="noResult">

            <div style="font-size:48px">😕</div>

            <h3>محصولی پیدا نشد</h3>

            <p>دوباره امتحان کنید</p>

        </div>

        `;

        return;

    }

    searchResults.innerHTML = products.map(product => `

        <a class="searchItem" href="${product.link}">

            <img src="${product.image}" alt="${product.name}">

            <div class="searchInfo">

                <h3>${highlight(product.name, query)}</h3>

                <p>${product.category}</p>

                <span>${Number(product.price).toLocaleString("fa-IR")} تومان</span>

            </div>

        </a>

    `).join("");

}

// ==========================
// Popular Search
// ==========================

function renderPopular() {

    searchResults.innerHTML = `

    <div style="padding:20px">

        <h4 style="margin-bottom:15px;color:#fff">محبوب‌ترین جستجوها</h4>

        <div style="display:flex;gap:10px;flex-wrap:wrap">

            <button class="popularTag">تیشرت</button>
            <button class="popularTag">شلوار</button>
            <button class="popularTag">کفش</button>
            <button class="popularTag">اکسسوری</button>

        </div>

    </div>

    `;

    document.querySelectorAll(".popularTag").forEach(tag => {

        tag.addEventListener("click", () => {

            searchInput.value = tag.innerText;

            performSearch(tag.innerText);

        });

    });

}

// ==========================
// Search Function
// ==========================

function performSearch(query) {

    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {

        renderPopular();

        return;

    }

    const results = [];

    productCards.forEach(card => {

        const product = {

            name: card.dataset.name || "",
            category: card.dataset.category || "",
            price: card.dataset.price || "0",
            image: card.dataset.image || "",
            link: card.dataset.link || "#",
            color: card.dataset.color || "",
            size: card.dataset.size || "",
            description: card.dataset.description || ""

        };

        const searchable = normalize(
            `${product.name} ${product.category} ${product.color} ${product.size} ${product.description}`
        );

        if (searchable.includes(normalizedQuery)) {

            results.push(product);

        }

    });

    renderResults(results, query);

}

// ==========================
// Debounce
// ==========================

let timer;

searchInput.addEventListener("input", () => {

    clearTimeout(timer);

    timer = setTimeout(() => {

        performSearch(searchInput.value);

    }, 200);

});