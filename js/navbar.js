// navbar
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');

hamburger.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

// Close the menu when a link is clicked
document.querySelectorAll('.menu ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
    });
});