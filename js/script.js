/*Ребятки, если кто то это читает -  я прекрасно понимаю, что нужно наводть тут порядок, но сон побеждает меня)*/


let videoWrapper = document.querySelector(".videos__wrapper");
let more = document.querySelector(".more");
let modal = document.querySelector(".modal");
let night = false;
let switcher = document.querySelector("#cbx");
let player;
let searchEvt = false;

window.onscroll = function scrollCounter() {
    let winHeight = window.innerHeight;
    let scrolled = window.pageYOffset;
    let pageHeight = clientHeight();
    if (scrolled + winHeight == pageHeight) {
        if (searchEvt) {
            gapi.load("client", () => {
                search(document.querySelector(".search > input").value);
             });
        }
        else {
            gapi.load("client", start);
        }
    }
    if (scrolled === 0) {
        document.querySelector(".button").style.display = "none";
    }
    else {
        document.querySelector(".button").style.display = "flex";
    }
   
}

let clientHeight = function() {
let h = document.querySelector("body").clientHeight;
return h;
}

document.querySelector(".button").addEventListener("click", () => {
    window.scrollTo(0,0);
})




switcher.addEventListener("change", () => {
    if (night === false) {
        night = true;
    getElement(".hamburger > line", "all").forEach(item => {
        item.setAttribute("stroke", "white");
    });
    colorsChangerInNightMode(getElement(".logo > img", "1"), "2", 'logo/youtube_night.svg');
    colorsChangerInNightMode(getElement(".header__item-descr", "1"), "1", '#fff');
    colorsChangerInNightMode(getElement(".button", "1"), "1", '#fff');
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
    colorsChangerInNightMode(getElement(".button", "1"), "1", '#000');
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

function sliceTitle(selector, count) {
    let title = document.querySelectorAll(selector).forEach(item => {
        if (item.querySelectorAll(selector) > 100) { 
        item.textContent.trim();
        let str = item.textContent.slice(0, count) + "...";
        item.textContent = str;
        }
    });
}
sliceTitle(".videos__item-descr", 100);

function modalInit() {
    /*Код нуждается в жестком рефакторинге, но я уже очень хочу спать, честно)))*/
    document.querySelectorAll(".videos__item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            let id = item.getAttribute("data-url");
            loadVideo(id);
            showModal();
        })
    });
    
    document.querySelector(".modal").addEventListener("click", (e) => {
        if (!e.target.classList.contains(".modal__body")) {
            closeModal();
        }
    });
}
modalInit();

function showModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
    player.pauseVideo();
}

function createVideoPlayer() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
       setTimeout(() => {
        player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: 'M7lc1UVf-VE',
          });
       }, 300);

}
createVideoPlayer();

function loadVideo(id) {
    player.loadVideoById({'videoId': `${id}`});
}

function start() {
   
    initApi("AIzaSyBkcRX_saE4R_yEE4g5TEwgTzpgoPE12js", ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]).then(function() {
        return  gapi.client.youtube.playlistItems.list({
            "part": "snippet,contentDetails",
            "maxResults": 12,
            "playlistId": "PL6aY2Z-7cCR4lWhm3f-f9tTWDDvtEclJW"
          }).then(function (response){
            response.result.items.forEach(item => {
                showResult(item.contentDetails.videoId, item.snippet.thumbnails.high.url, item.snippet.title, videoWrapper);
                clientHeight();
                sliceTitle(".videos__item-descr", 100);
            });
        });
    });
    
}

more.addEventListener("click", () => {
    document.querySelector(".button").style.display = "flex";
    more.remove();
    removeChild(videoWrapper);
    gapi.load("client", start);
});

function search(inputss) {
    searchEvt = true;
    initApi("AIzaSyBkcRX_saE4R_yEE4g5TEwgTzpgoPE12js", ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]).then(function() {
        return gapi.client.youtube.search.list({
            "part": "snippet",
            "maxResults": 12,
            "q": `${inputss}`,
            "type": ""
        });
    }).then(function(response) {
        response.result.items.forEach(item => {
            showResult(item.id, item.snippet.thumbnails.high.url, item.snippet.title, videoWrapper);
            sliceTitle(".videos__item-descr", 100);
        })
    });
}

document.querySelector(".search").addEventListener("submit", (e) => {
    document.querySelector(".button").style.display = "flex";
    e.preventDefault();
    removeChild(videoWrapper);
    gapi.load("client", () => {
        search(document.querySelector(".search > input").value);
     });
})

// ************************REFACTORING******************************

function removeChild(element) {
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

function initApi(apiKey, discoveryDocs) {
    return gapi.client.init({
        "apiKey": apiKey,
        "discoveryDocs": discoveryDocs
    });
}

function showResult(itemAttr, imgSrc, itemTitle, parrent) {
    let link = document.createElement("a");
    link.setAttribute("data-url", itemAttr);
    link.classList.add("videos__item", "videos__item-active");
    link.innerHTML = `
        <img src="${imgSrc}" alt="thumb">
        <div class="videos__item-descr">
            ${itemTitle}
        </div>
        <div class="videos__item-views">
            2500000000
        </div>
        `;
    parrent.appendChild(link);
    setTimeout(() => {
        link.classList.remove("videos__item-active");
    },50);
    modalInit();
    if (night === true) {
        link.querySelector(".videos__item-descr").style.color = "#fff";
        link.querySelector(".videos__item-views").style.color = "#fff";
    }
}

