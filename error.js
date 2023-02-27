const returnbtn = document.querySelector(".return");
const gif = document.querySelector(".sad-icon");
returnbtn.addEventListener("mouseenter", function () {
  console.log(gif.getAttribute("src"));

  gif.setAttribute("src", "./gif/giphy.gif");
  //   gif.style.height = "8rem";
  //   console.log(this.getAttribute("src"));
});

returnbtn.addEventListener("mouseleave", function () {
  console.log(gif.getAttribute("src"));

  gif.setAttribute("src", "./gif/giphy2.gif");
  //   gif.style.margin = "0 0 1.5rem 0";
  //   console.log(this.getAttribute("src"));
});
