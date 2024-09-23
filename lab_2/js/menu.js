function toggleMenu() {
    const nav = document.querySelector('.header__nav');
    const menuIcon = document.querySelector('.menu-icon');
    const crossIcon = document.querySelector('.cross');

    nav.classList.toggle('open'); 

    if (nav.classList.contains('open')) {
        menuIcon.style.display = 'none';  
        crossIcon.style.display = 'block';  
    } else {
        menuIcon.style.display = 'block'; 
        crossIcon.style.display = 'none'; 
    }
}


    /* машинка*/
    const car = document.querySelector(".hero__car");

    car.addEventListener("click", function () {
        car.classList.add("clicked");

        setTimeout(() => {
            car.classList.remove("clicked");
        }, 3000);
    })
