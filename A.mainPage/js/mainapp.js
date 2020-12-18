const homeBtn = document.querySelector('.home-btn');
const popup = document.getElementById('popup');
const popupHome = document.getElementById('popup-home');

homeBtn.addEventListener('click', e =>{
    console.log('click')
    popup.style.display = 'flex';

    setTimeout(() =>{
        popup.style.display = 'none';
        window.location.replace("/InsideIphone/insidePhone.html");

    }, 2000);
})