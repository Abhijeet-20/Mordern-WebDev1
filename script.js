const scroll = new LocomotiveScroll({
    el: document.querySelector('#all'),
    smooth: true
});

var timer ;

function mouseskew(){
    var xscale = 1;
    var yscale = 1;
    var xpre = 0;
    var ypre = 0;
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timer);
        var xdiff = dets.clientX - xpre;
        var ydiff = dets.clientY - ypre;

        xscale = gsap.utils.clamp(0.8,1.2,xdiff);
        yscale = gsap.utils.clamp(0.8,1.2,ydiff); 

        xpre = dets.clientX;
        ypre = dets.clientY;
       
        CircleMouseFollow(xscale,yscale);
        timer = setTimeout(function(){
            document.querySelector("#cursorcircle").style.transform =  `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        },100);
    });
}
mouseskew();

function CircleMouseFollow(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
       document.querySelector("#cursorcircle").style.transform =  `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}
CircleMouseFollow();


function firstpageanim(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y: '-10',
        opacity:0,
        duration : 1.5,
        ease: Expo.easeInOut,
    })
    .to(".transele",{
        y: 0,
        ease: Expo.easeInOut,
        duration:2,
        delay:-1,
        stagger:0.2,
    })
    .from("#mainfooter",{
        y: -10,
        opacity:0,
        duration:1.5,
        delay:-1.2,
        ease: Expo.easeInOut,
    })
}
firstpageanim();


document.querySelectorAll(".ele").forEach(function(ele){
    var rotate = 0;
    var difference =0;
    ele.addEventListener("mousemove",function(dets){

        var diff = dets.clientY - ele.getBoundingClientRect().top;

        difference = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(ele.querySelector("img"),{
            opacity : 1,
            ease : Power3,
            top : diff,
            left : dets.clientX,
            rotate:gsap.utils.clamp(-20,20,difference * 0.6),
        }); 
    });

    ele.addEventListener("mouseleave",function(dets){

        gsap.to(ele.querySelector("img"),{
            opacity : 0,
            ease : Power3,
            duration : 0.5, 
        }); 
    });
});