function time() {
    var date = new Date;
    var h = date.getHours();
    if (h < 10) {
        h = "0" + h;
    }
    var m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    var s = date.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }
    var result = h + ':' + m + ':' + s;
    document.getElementById('timer').innerHTML = result;
    // "setTimeout" call function "time" every 1 second (1000 milliseconds)
    setTimeout('time("timer");', 1000);
    return true;
}

setTimeout(time, 1);
console.log('Started Timer');