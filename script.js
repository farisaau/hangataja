const menuBtn=document.querySelector(".menu-btn");
const nav=document.querySelector("nav");
menuBtn?.addEventListener("click",()=>{
  const open=nav.style.display==="flex";
  nav.style.display=open?"none":"flex";
  nav.style.position="absolute";
  nav.style.top="70px";
  nav.style.left="0";
  nav.style.right="0";
  nav.style.background="var(--cream)";
  nav.style.padding="25px 7vw";
  nav.style.flexDirection="column";
  nav.style.gap="20px";
});
