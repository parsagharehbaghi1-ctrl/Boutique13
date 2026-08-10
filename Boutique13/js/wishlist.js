/*==========================================
            Boutique13 Wishlist
==========================================*/

class Wishlist {

    constructor(){

        this.storageKey = "wishlist";

        this.items = JSON.parse(

            localStorage.getItem(this.storageKey)

        ) || [];

        this.badge = document.getElementById("wishCount");

        this.buttons = document.querySelectorAll(".favorite");

        this.init();

    }

    init(){

        this.updateBadge();

        this.buttons.forEach(btn=>{

            btn.addEventListener("click",()=>{

                this.toggle(btn);

            });

        });

    }

    toggle(button){

        const product = {

            id:1,

            name:"تیشرت اورسایز Premium",

            image:document.getElementById("mainImage").src,

            price:1490000

        };

        const index = this.items.findIndex(item=>item.id===product.id);

        if(index>-1){

            this.items.splice(index,1);

            button.classList.remove("liked");

            this.toast("از علاقه‌مندی حذف شد.");

        }

        else{

            this.items.push(product);

            button.classList.add("liked");

            this.toast("به علاقه‌مندی اضافه شد.");

        }

        this.save();

        this.updateBadge();

    }

    save(){

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(this.items)

        );

    }

    updateBadge(){

        this.badge.textContent=this.items.length;

    }

    toast(text){

        let toast=document.querySelector(".toast");

        if(!toast){

            toast=document.createElement("div");

            toast.className="toast";

            document.body.appendChild(toast);

        }

        toast.innerText=text;

        toast.classList.add("show");

        setTimeout(()=>{

            toast.classList.remove("show");

        },1800);

    }

}

const wishlist=new Wishlist();