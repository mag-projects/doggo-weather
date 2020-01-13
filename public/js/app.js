const locationSearch = document.getElementById("location-search");
const searchForm = document.querySelector("form");
let messageOne = document.getElementById("message-one");
let messageTwo = document.getElementById("message-two");
let broughtBy = document.getElementById("brought-by");

const imageArray = ['img/doggy.jpg', 'img/morty.jpg', 'img/panch.jpg'];

const randomizeImage = () => {
    let num = Math.floor(Math.random() * (imageArray.length));
    document.canvas.src = imageArray[num];
};

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchQuery = locationSearch.value;
    messageOne.textContent = "Loading...";
    randomizeImage();
    broughtBy.style.visibility = 'visible';


    fetch(`/weather?address=${searchQuery}`).then(res => {
        res.json().then(data => {
            if (data.error) return messageOne.textContent = data.error;
            messageOne.textContent = data.location;
            messageTwo.textContent = data.weather;

        });
    });
});

