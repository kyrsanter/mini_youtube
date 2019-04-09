let more = document.querySelector(".more");
let night = false;
let switcher = document.querySelector("#cbx");
switcher.disabled = true;
switcher.addEventListener("change", () => {
    if (switcher.disabled === true) {
        alert("You shoul add any videos first!!!");
    };
    if (night === false) {
        night = true;
    getElement(".hamburger > line", "all").forEach(item => {
        item.setAttribute("stroke", "white");
    });
    colorsChangerInNightMode(getElement(".logo > img", "1"), "2", 'logo/youtube_night.svg');
    colorsChangerInNightMode(getElement(".header__item-descr", "1"), "1", '#fff');
    colorsChangerInNightMode(getElement(".videos__item-views", "all"), "1", '#fff');
    colorsChangerInNightMode(getElement(".videos__item-descr", "all"), "1", '#fff');
    colorsChangerInNightMode(getElement("body", "1"), "0", '#000'); //  if u want to change bg - put "0" in the second param, else if color - put "1";
    }
    else {
        night = false;
    getElement(".hamburger > line", "all").forEach(item => {
        item.setAttribute("stroke", "black");
    });
    colorsChangerInNightMode(getElement(".logo > img", "1"), "2", 'logo/youtube.svg');
    colorsChangerInNightMode(getElement(".header__item-descr", "1"), "1", '#000');
    colorsChangerInNightMode(getElement(".videos__item-views", "all"), "1", '#000');
    colorsChangerInNightMode(getElement(".videos__item-descr", "all"), "1", '#000');
    colorsChangerInNightMode(getElement("body", "1"), "0", '#fff'); //  if u want to change bg - put "0" in the second param, else if color - put "1";
    }
    
});

function menuInitn() {
    let menuWrapper = document.querySelector("[data-slide='nav']");
    let hamburgerBtn = document.querySelector(".hamburger").addEventListener("click", () => {
        menuWrapper.classList.toggle("slide-active");
    });
}
menuInitn();

function getElement(selector, count) {
    if (count === "all") {
        return document.querySelectorAll(selector);
    }
    else {
        return document.querySelector(selector);
    }
}

function colorsChangerInNightMode(element, num, colour) {
    let elem = element;
    if (elem.length > 1) {
        elem.forEach(item => {
            if (num == "0") {
                item.style.background = colour;
            }
            else {
                item.style.color = colour;
            }
        })
    }
    else {
        if (num == "0") {
            elem.style.background = colour;
        }
        else if (num == "2") {
            elem.src = colour;
        }
        else {
            elem.style.color = colour;
        }
    }
}

more.addEventListener("click", () => {
    switcher.disabled = false;
    let videoWrapper = document.querySelector(".videos__wrapper");
    more.remove();

    const data = [ 
        ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'], 
        ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов', 
            '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки Урок 2', 
            '#1 Верстка реального заказа landing Page | Марафон вёрстки | Артём Исламов'],
        ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
        ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM'] 
    ];

    for (let i = 0; i < data[0].length; i++) {
            let link = document.createElement("a");
            link.setAttribute("data-url", data[3][i]);
            link.classList.add("videos__item", "videos__item-active");
            link.innerHTML = `
                <img src="${data[0][i]}" alt="thumb">
                <div class="videos__item-descr">\
                    ${data[1][i]}
                </div>
                <div class="videos__item-views">
                    ${data[2][i]}
                </div>
            `;
            videoWrapper.appendChild(link);
            setTimeout(() => {
                link.classList.remove("videos__item-active");
            },50);
    }
});