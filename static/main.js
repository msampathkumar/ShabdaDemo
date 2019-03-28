'use strict'


let log = console.log.bind(console),
    id = val => document.getElementById(val),
    ul = id('userRecordingsList'),
    userRecordReq = id('userRecordReq'),
    start = id('start'),
    stop = id('stop'),
    upload = id('upload_recording'),
    stream,
    recorder,
    counter = 1,
    chunks = [],
    media;

userRecordReq.onclick = e => {
    let mv = id('mediaVideo'),
        mediaOptions = {
            video: {
                tag: 'video',
                type: 'video/webm',
                ext: '.mp4',
                gUM: {
                    video: true,
                    audio: true
                }
            },
            audio: {
                tag: 'audio',
                type: 'audio/ogg',
                ext: '.ogg',
                gUM: {
                    audio: true
                }
            }
        };
    media = mv.checked ? mediaOptions.video : mediaOptions.audio;
    //  media = mediaOptions.audio;
    navigator.mediaDevices.getUserMedia(media.gUM).then(_stream => {
        stream = _stream;
        id('gUMArea').style.display = 'none';
        id('btns').style.display = 'inherit';
        start.removeAttribute('disabled');
        recorder = new MediaRecorder(stream);
        recorder.ondataavailable = e => {
            chunks.push(e.data);
            if (recorder.state == 'inactive') makeLink();
        };
        log('got media successfully');
    }).catch(log);
}

start.onclick = e => {
    start.disabled = true;
    stop.removeAttribute('disabled');
    // TODO: Add Timer
    ul.innerHTML = '<img src="./static/loading.gif">'
    chunks = [];
    recorder.start();
}


stop.onclick = e => {
    stop.disabled = true;
    // TODO: Add Timer
    recorder.stop();
    start.removeAttribute('disabled');
}


upload.onclick = e => {
    log('Processing - Upload Request,..');
    uploadAudioChunks(chunks);
    log('Completed  - Upload Request,... !!');
}


function makeLink() {
    let blob = new Blob(chunks, {
            type: media.type
        }),
        url = URL.createObjectURL(blob),
        li = document.createElement('li'),
        mt = document.createElement(media.tag),
        hf = document.createElement('a');
    mt.controls = true;
    mt.src = url;
    hf.href = url;
    hf.download = `${counter++}${media.ext}`;
    //  hf.innerHTML = `download ${hf.download}`;
    hf.id = `recording`;
    li.appendChild(mt);
    li.appendChild(hf);
    ul.innerHTML = ''
    ul.appendChild(li);
}


function uploadAudioChunks(audio_chunks) {
    var form = new FormData(document.getElementById('upload_audio'));
    var blob = new Blob(audio_chunks, {
        type: media.type
    });
    form.append("user_audio_blob", blob);
    var request = new XMLHttpRequest();
    var async = true;
    request.open("POST", "/upload", async);
    request.send(form);
    console.log('Successfully uploaded Audio file!!');
}



function time()
    {
        var date = new Date;
        var h = date.getHours();
        if(h<10)
        {
                h = "0"+h;
        }
        var m = date.getMinutes();
        if(m<10)
        {
                m = "0"+m;
        }
        var s = date.getSeconds();
        if(s<10)
        {
                s = "0"+s;
        }
        var result = h+':'+m+':'+s;
        document.getElementById('timer').innerHTML = result;
        // "setTimeout" call function "time" every 1 second (1000 milliseconds)
        setTimeout('time("timer");', 1000);
        return true;
}

setTimeout(time, 1);