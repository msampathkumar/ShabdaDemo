'use strict'

//  Code Formatter
// https://beautifier.io/



let my_log = console.log.bind(console),
    get_id = val => document.getElementById(val),
    refresh_uploaded = get_id('refresh_uploaded'),
    refresh_download = get_id('refresh_download'),
    userShabdaRecorderingList = get_id('userShabdaRecorderingList'),
    userEmotionPredictionList = get_id('userEmotionPredictionList');



refresh_uploaded.onclick = e => fns_refresh_uploaded()
refresh_download.onclick = e => fns_refresh_download()


function fns_refresh_uploaded() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = eval(request.response);
            // console.log(data);
            var html_data = "";
            for (var key in data) {
                html_data += "<li><audio controls='' src='" + data[key] + "'></audio> <li>\n"
            }
            // console.log(html_data);
            userShabdaRecorderingList.innerHTML = html_data;
        }
    };
    request.open("GET", "/rest/refresh_uploaded", true);
    request.send();
}

function fns_refresh_download() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = eval(request.response);
            // console.log(data);
            var html_data = "";
            for (var key in data) {
                html_data += "<li><audio controls='' src='" + data[key] + "'></audio> <li>\n"
            }
            // console.log(html_data);
            userEmotionPredictionList.innerHTML = html_data;
        }
    };
    request.open("GET", "/rest/refresh_download", true);
    request.send();
}



var lastUpdatedTime = new Date().getTime();


function refresh() {
    if (new Date().getTime() - lastUpdatedTime >= 60) {
        lastUpdatedTime = new Date().getTime();
        fns_refresh_download();
        fns_refresh_uploaded();
        console.log('Updated Download & Uploads !!');
    } else {
        setTimeout(refresh, 70);
        console.log('Not Updated');
    }
}

setTimeout(refresh, 70);