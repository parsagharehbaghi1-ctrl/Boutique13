//======================
// Loader
//======================

window.addEventListener("load", () => {

    gsap.to("#loader", {

        opacity: 0,
        duration: 1.2,
        delay: 1,

        onComplete: () => {

            document.getElementById("loader").style.display = "none";

        }

    });

});

//======================
// Hero Animation
//======================

gsap.from(".hero-content span",{

    y:50,
    opacity:0,
    duration:1,
    delay:2

});

gsap.from(".hero-content h1",{

    y:100,
    opacity:0,
    duration:1.2,
    delay:2.2

});

gsap.from(".hero-content p",{

    y:80,
    opacity:0,
    duration:1,
    delay:2.5

});

gsap.from(".hero button",{

    y:60,
    opacity:0,
    duration:1,
    delay:2.8

});

//======================
// Hero Scroll Effect
//======================

gsap.to(".hero",{

    scale:0.92,

    borderRadius:"40px",

    scrollTrigger:{

        trigger:".hero",

        start:"top top",

        end:"bottom top",

        scrub:true

    }

});

//======================
// Categories
//======================

gsap.from(".card",{

    opacity:0,

    y:150,

    duration:1,

    stagger:0.3,

    scrollTrigger:{

        trigger:".categories",

        start:"top 70%"

    }

});

//======================
// Products
//======================

gsap.from(".product",{

    opacity:0,

    y:100,

    duration:1,

    stagger:0.25,

    scrollTrigger:{

        trigger:".products",

        start:"top 70%"

    }

});

//======================
// Header Blur
//======================

window.addEventListener("scroll",()=>{

    const header=document.querySelector("header");

    if(window.scrollY>80){

        header.style.background="rgba(255,255,255,.95)";
        header.style.boxShadow="0 10px 30px rgba(0,0,0,.08)";

    }else{

        header.style.background="rgba(255,255,255,.75)";
        header.style.boxShadow="none";

    }

});
gsap.from(".hero h1",{

    opacity:0,
    y:120,
    duration:1.5,
    ease:"power4.out"

});

gsap.from(".hero p",{

    opacity:0,
    y:80,
    delay:.4,
    duration:1.2

});

gsap.from(".btn",{

    opacity:0,
    scale:.8,
    delay:.8,
    duration:1

});

gsap.to(".hero-content",{

    y:-180,

    opacity:0,

    scrollTrigger:{

        trigger:".hero",

        start:"top top",

        end:"bottom top",

        scrub:true

    }

});
const cursor=document.querySelector(".cursor");

const cursor2=document.querySelector(".cursor2");

window.addEventListener("mousemove",(e)=>{

gsap.to(cursor,{

x:e.clientX-5,

y:e.clientY-5,

duration:.05

});

gsap.to(cursor2,{

x:e.clientX-22,

y:e.clientY-22,

duration:.25

});

});

document.querySelectorAll("a,button,.card,input,textarea")

.forEach(item=>{

item.addEventListener("mouseenter",()=>{

gsap.to(cursor2,{

scale:1.8,

duration:.3

});

});

item.addEventListener("mouseleave",()=>{

gsap.to(cursor2,{

scale:1,

duration:.3

});

});

});