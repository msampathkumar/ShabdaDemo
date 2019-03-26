'use strict'


//
//  REST API CALL FOR follow URL
//        /rest/refresh_uploaded
//        /rest/refresh_download
//



let log = console.log.bind(console),
  id = val => document.getElementById(val),
  refresh_uploaded = id('refresh_uploaded'),
  refresh_download = id('refresh_download'),
  userShabdaRecorderingList = id('userShabdaRecorderingList'),
  userEmotionPredictionList = id('userEmotionPredictionList');



refresh_uploaded.onclick = e => fns_refresh_uploaded()
refresh_download.onclick = e => fns_refresh_download()


function fns_refresh_uploaded() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
               var data = eval(request.response);
               // console.log(data);
               var html_data = "";
               for (var key in data){
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
               for (var key in data){
                    html_data += "<li><audio controls='' src='" + data[key] + "'></audio> <li>\n"
               }
               // console.log(html_data);
               userEmotionPredictionList.innerHTML = html_data;
         }
    };
    request.open("GET", "/rest/refresh_download", true);
    request.send();
}
