'use strict'

console.log('wikiTube');

function initPage() {
    renderVideoList(axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyAPWt5en9aRuSf0-PemBjx6Du1anWQ5kb8'))
}


function renderVideoList(prm) {
    var elVideoList = document.querySelector('.video-list')
    var strHtmls = '';

    prm.then(function (res) {
        // console.log('res:', res.data.items);
        res.data.items.forEach((video, idx) => {
            strHtmls += `
                <div class="video-${idx}">
                    <img src=${video.snippet.thumbnails.default.url} onclick="playVideo('${video.id.videoId}')" />
                    <h4>${video.snippet.title}</h4>
                </div>
            `
            // console.log(video.id.videoId)
        });
        elVideoList.innerHTML = strHtmls;
        })
}

function playVideo(videoId) {
    var elVideoPlayer = document.querySelector('#video-player')
    console.log(elVideoPlayer)
    elVideoPlayer.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
}


function searchYouTube() {
    var searchInput = document.querySelector('.user-input').value;
    renderVideoList(axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q="' + searchInput + '&order=viewCount&key=AIzaSyAPWt5en9aRuSf0-PemBjx6Du1anWQ5kb8'));
    renderWikiData(searchInput);
}

function renderWikiData(searchTerm) {
    var elWikiData = document.querySelector('.wiki-data')
    var strHtml;
    axios.get('https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=' + searchTerm + '&limit=5')
        .then(function (res) {
            console.log(res.data);
            if (res.data[2].length > 0) {
                strHtml = `
                <h2>${res.data[0]}</h2>
                <br>
                <span>${res.data[2].join()}</span>
                `
            } else {
                strHtml = `
                <h2>${res.data[0]}</h2>
                <br>
                <span>No data to display, please try different search term.</span>
                `    
            }
            elWikiData.innerHTML = strHtml;
            });
}




// function initPage() {
//     var elVideoList = document.querySelector('.video-list')
//     var strHtmls = '';

//     axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyAPWt5en9aRuSf0-PemBjx6Du1anWQ5kb8')
//     .then(function (res) {
//         console.log('res:', res.data.items);
//         res.data.items.forEach((video, idx) => {
//             strHtmls += `
//                 <div class="video-${idx}">
//                     <img src=${video.snippet.thumbnails.default.url} onclick="playVideo('${video.id.videoId}')" />
//                     <h4>${video.snippet.title}</h4>
//                 </div>
//             `
//             // console.log(video.id.videoId)
//         });
//         elVideoList.innerHTML = strHtmls;
//         })
// }
