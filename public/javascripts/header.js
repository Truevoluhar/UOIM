let menu = document.querySelector(".menu");
let list = document.querySelector("#list");
let prijavaosebe = document.querySelector(".prijavaosebe");

console.log(window.location.href);

menu.addEventListener("click", () => {
  if (list.classList.contains("visible")) {
    list.classList.remove("visible");
  } else {
    list.classList.add("visible");
  }
})

prijavaosebe.addEventListener("click", () => {
  window.location.href = "/newperson";
})

document.querySelector(".seznamvseh").addEventListener("click", () => {
  window.location.href = "/personlist";
});

document.querySelector(".domov").addEventListener("click", () => {
  window.location.href = "/";
});

document.querySelector(".prehrana-header").addEventListener("click", () => {
  window.location.href = "/prehrana";
});

document.querySelector(".qrskener-header").addEventListener("click", () => {
  window.location.href = "/qrcamera";
});

document.querySelector(".logout-header").addEventListener("click", () => {
  window.location.href = "/logout";
});