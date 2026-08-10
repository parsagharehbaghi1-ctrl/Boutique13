//==============================
// Register Plugin
//==============================

gsap.registerPlugin(ScrollTrigger);

//==============================
// Hero Animation
//==============================

const heroTl = gsap.timeline();

heroTl
.from(".content span",{

    y:40,
    opacity:0,
    duration:1

})

.from(".content h1",{

    y:80,
    opacity:0,
    duration:1

},"-=.6")

.from(".content p",{

    y:40,
    opacity:0,
    duration:.8

},"-=.5");


//==============================
// Contact Form
//==============================

gsap.from(".rightSide",{

    x:120,
    opacity:0,

    duration:1.2,

    scrollTrigger:{

        trigger:".rightSide",

        start:"top 75%"

    }

});


//==============================
// Left Image
//==============================

gsap.from(".leftSide",{

    x:-120,

    opacity:0,

    duration:1.2,

    scrollTrigger:{

        trigger:".leftSide",

        start:"top 75%"

    }

});


//==============================
// Cards
//==============================

gsap.from(".card",{

    y:80,

    opacity:0,

    duration:1,

    stagger:.25,

    scrollTrigger:{

        trigger:".infoCards",

        start:"top 80%"

    }

});


//==============================
// Footer
//==============================

gsap.from("footer h2",{

    y:60,

    opacity:0,

    duration:1,

    scrollTrigger:{

        trigger:"footer",

        start:"top 85%"

    }

});


//==============================
// Floating Inputs
//==============================

document.querySelectorAll(".inputBox input,.inputBox textarea")

.forEach(input=>{

input.addEventListener("focus",()=>{

gsap.to(input,{

borderBottomColor:"#d4af37",

duration:.3

});

});

input.addEventListener("blur",()=>{

if(input.value===""){

gsap.to(input,{

borderBottomColor:"#555",

duration:.3

});

}

});

});


//==============================
// Button Hover
//==============================

const btn=document.querySelector("button");

btn.addEventListener("mouseenter",()=>{

gsap.to(btn,{

scale:1.05,

duration:.3

});

});

btn.addEventListener("mouseleave",()=>{

gsap.to(btn,{

scale:1,

duration:.3

});

});


//==============================
// Fake Success Animation
//==============================

document.querySelector("form")

.addEventListener("submit",(e)=>{

e.preventDefault();

btn.innerHTML="✔ پیام ارسال شد";

btn.style.background="#16a34a";

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
function toggleCallCard(){

document
.getElementById("callCard")
.classList
.toggle("active");

}