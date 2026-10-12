const menuBtn=document.querySelector(".menu-btn");
const nav=document.querySelector("nav");
const navbar=document.querySelector(".navbar");
const sectionLinks=[...document.querySelectorAll('nav a[href^="#"], .nav-order[href^="#"]')];
const sections=sectionLinks
  .map(link=>document.querySelector(link.getAttribute("href")))
  .filter(section=>section instanceof HTMLElement);
const marqueeGroups=[...document.querySelectorAll(".marquee-group")];

menuBtn?.addEventListener("click",()=>{
  const open=nav?.classList.toggle("is-open")??false;
  menuBtn.setAttribute("aria-expanded",String(open));
});

nav?.querySelectorAll("a").forEach(link=>{
  link.addEventListener("click",()=>{
    nav.classList.remove("is-open");
    menuBtn?.setAttribute("aria-expanded","false");
  });
});

if("IntersectionObserver" in window){
  const visibleSections=new Set();
  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) visibleSections.add(entry.target);
      else visibleSections.delete(entry.target);
    });

    const currentSection=[...visibleSections]
      .sort((a,b)=>Math.abs(a.getBoundingClientRect().top-(navbar?.getBoundingClientRect().bottom??82))
        -Math.abs(b.getBoundingClientRect().top-(navbar?.getBoundingClientRect().bottom??82)))[0];

    sectionLinks.forEach(link=>{
      if(link.getAttribute("href")===`#${currentSection?.id}`){
        link.setAttribute("aria-current","location");
      }else{
        link.removeAttribute("aria-current");
      }
    });
  },{rootMargin:"-82px 0px -55% 0px",threshold:0});

  sections.forEach(section=>sectionObserver.observe(section));
}

if(marqueeGroups.length===2){
  const marqueeCycle=marqueeGroups[0].querySelector(".marquee-cycle");
  const cycleWidth=marqueeCycle?.getBoundingClientRect().width??0;
  let cycleCount=0;

  const fillMarquee=()=>{
    if(cycleWidth===0) return;
    const nextCount=Math.ceil(window.innerWidth/cycleWidth)+1;
    if(nextCount===cycleCount) return;
    cycleCount=nextCount;

    marqueeGroups.forEach(group=>{
      group.replaceChildren(...Array.from({length:cycleCount},()=>marqueeCycle.cloneNode(true)));
    });
  };

  fillMarquee();
  window.addEventListener("resize",fillMarquee);
}
