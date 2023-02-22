// JavaScript code to change header and navigation link colors on scroll

window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    var navLinks = document.querySelectorAll("nav a");
    var scrollPos = window.scrollY;
    
    if (scrollPos > 50) {
      header.style.backgroundColor = "white";
      navLinks.forEach(function(link) {
        link.style.color = "black";
      });
    } else {
      header.style.backgroundColor = "#5ca1d0";
      navLinks.forEach(function(link) {
        link.style.color = "white";
      });
    }
  });
  