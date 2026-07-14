/* ══════════════════════════════════════════════════
   VALIDO FOODS — UX ENHANCEMENT JS
   Scroll Reveal · Parallax · Cursor Glow · Ambient
   ══════════════════════════════════════════════════ */

(function(){
  'use strict';

  // ─── INJECT AMBIENT ORBS ───
  function createOrbs(){
    var orbs=['orb-1','orb-2','orb-3'];
    orbs.forEach(function(cls){
      var el=document.createElement('div');
      el.className='ambient-orb '+cls;
      el.setAttribute('aria-hidden','true');
      document.body.appendChild(el);
    });
  }

  // ─── SCROLL REVEAL (enhanced) ───
  function initScrollReveal(){
    // Tag sections that don't have .reveal yet
    var selectors=[
      '.section','.page-head','.page-hero',
      '.recipe-list','.filters','.stats-bar',
      '.values-header','.vp-grid','.brand-quote',
      '.location-section','.chefs-grid',
      '.story-grid','.find-grid',
      '.wholesale-banner','.newsletter'
    ];
    selectors.forEach(function(sel){
      document.querySelectorAll(sel).forEach(function(el){
        if(!el.classList.contains('reveal')&&!el.closest('.reveal')){
          el.classList.add('reveal');
        }
      });
    });

    // Tag grids for stagger
    var grids=[
      '.product-grid','.chef-grid','.chefs-grid',
      '.values-grid','.recipe-list','.vp-grid',
      '.stats-bar','.footer-grid'
    ];
    grids.forEach(function(sel){
      document.querySelectorAll(sel).forEach(function(el){
        el.classList.add('stagger-children');
        if(!el.classList.contains('reveal')){
          el.classList.add('reveal');
        }
      });
    });

    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          // Don't unobserve stagger-children so re-entry works
          if(!entry.target.classList.contains('stagger-children')){
            observer.unobserve(entry.target);
          }
        }
      });
    },{threshold:0.08,rootMargin:'0px 0px -40px 0px'});

    document.querySelectorAll('.reveal').forEach(function(el){
      observer.observe(el);
    });
  }

  // ─── CURSOR GLOW (desktop only) ───
  function initCursorGlow(){
    if(window.matchMedia('(hover:none)').matches)return;
    if(window.innerWidth<769)return;

    var glow=document.createElement('div');
    glow.className='cursor-glow';
    glow.setAttribute('aria-hidden','true');
    document.body.appendChild(glow);

    var mx=0,my=0,gx=0,gy=0;
    var speed=0.08;

    document.addEventListener('mousemove',function(e){
      mx=e.clientX;
      my=e.clientY;
    },{passive:true});

    function lerp(){
      gx+=(mx-gx)*speed;
      gy+=(my-gy)*speed;
      glow.style.left=gx+'px';
      glow.style.top=gy+'px';
      requestAnimationFrame(lerp);
    }
    lerp();

    // Intensify near interactive elements
    document.addEventListener('mouseover',function(e){
      var target=e.target.closest('a,button,.product-card,.chef-card,.recipe-item,.value-card');
      if(target){
        glow.style.width='400px';
        glow.style.height='400px';
        glow.style.background='radial-gradient(circle,rgba(212,162,78,0.07),transparent 70%)';
      }
    },{passive:true});
    document.addEventListener('mouseout',function(e){
      var target=e.target.closest('a,button,.product-card,.chef-card,.recipe-item,.value-card');
      if(target){
        glow.style.width='300px';
        glow.style.height='300px';
        glow.style.background='radial-gradient(circle,rgba(212,162,78,0.04),transparent 70%)';
      }
    },{passive:true});
  }

  // ─── PARALLAX SCROLL ───
  function initParallax(){
    var hero=document.querySelector('.hero,.page-hero');
    var heroImg=document.querySelector('.hero-img,.story-image img');
    if(!hero)return;

    var ticking=false;
    window.addEventListener('scroll',function(){
      if(!ticking){
        requestAnimationFrame(function(){
          var scrollY=window.pageYOffset;
          // Subtle parallax on hero
          if(hero&&scrollY<window.innerHeight){
            var offset=scrollY*0.15;
            hero.style.transform='translateY('+offset+'px)';
          }
          // Parallax on hero image if exists
          if(heroImg&&scrollY<window.innerHeight*1.5){
            heroImg.style.transform='translateY('+(scrollY*0.08)+'px) scale(1)';
          }
          ticking=false;
        });
        ticking=true;
      }
    },{passive:true});
  }

  // ─── NAV SCROLL EFFECT ───
  function initNavScroll(){
    var nav=document.querySelector('nav');
    if(!nav)return;
    // Ensure nav has the scroll class logic
    window.addEventListener('scroll',function(){
      nav.classList.toggle('scrolled',window.scrollY>40);
    },{passive:true});
  }

  // ─── SMOOTH SECTION ANCHOR SCROLL ───
  function initSmoothAnchors(){
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click',function(e){
        var id=this.getAttribute('href');
        if(id.length<2)return;
        var target=document.querySelector(id);
        if(target){
          e.preventDefault();
          var top=target.getBoundingClientRect().top+window.pageYOffset-80;
          window.scrollTo({top:top,behavior:'smooth'});
        }
      });
    });
  }

  // ─── TILT EFFECT ON CARDS (desktop) ───
  function initTilt(){
    if(window.matchMedia('(hover:none)').matches)return;
    if(window.innerWidth<769)return;

    var cards=document.querySelectorAll('.product-card,.chef-card,.value-card,.vp-card');
    cards.forEach(function(card){
      card.addEventListener('mousemove',function(e){
        var rect=card.getBoundingClientRect();
        var x=(e.clientX-rect.left)/rect.width;
        var y=(e.clientY-rect.top)/rect.height;
        var tiltX=(y-0.5)*6; // degrees
        var tiltY=(x-0.5)*-6;
        card.style.transform='perspective(600px) rotateX('+tiltX+'deg) rotateY('+tiltY+'deg) translateY(-4px)';
      },{passive:true});

      card.addEventListener('mouseleave',function(){
        card.style.transform='perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      },{passive:true});
    });
  }

  // ─── INIT ALL ───
  function init(){
    createOrbs();
    initScrollReveal();
    initCursorGlow();
    initParallax();
    initNavScroll();
    initSmoothAnchors();
    initTilt();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  }else{
    init();
  }
})();
