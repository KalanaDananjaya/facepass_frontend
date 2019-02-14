
    var video = document.getElementById('video');
    url = window.URL || window.webkitURL;

    var snapBtn = document.getElementById('snapBtn');
    var acceptBtn = document.getElementById('acceptBtn');
    var rejectBtn = document.getElementById('rejectBtn');
    var videoDiv =document.getElementById('videoDiv');
    var canvas = document.getElementById('canvas'); // create a canvas

    /* Record video function */
    navigator.mediaDevices.getUserMedia({
        video : true,
        audio:false
    })
    .then (function(videoStream){
        video.srcObject= videoStream;
        video.play();
    })
    .then(function(){
        snapBtn.hidden = false;
    })
    .catch(function (error){
        console.log(error);
    });


    snapBtn.onclick = function (){
        snapBtn.hidden=true;
        acceptBtn.hidden=false;
        rejectBtn.hidden=false;
 
        const ctx = canvas.getContext('2d'); // get its context
        canvas.width = video.videoWidth; // set its size to the one of the video
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0,0); // the video
        video.hidden = true;
        canvas.hidden=false;
    }

    acceptBtn.onclick = function () {
        
        canvas.toBlob(function (blob){

            //save the image to disk from here
            var newImg = document.createElement('img'),
            blobUrl = URL.createObjectURL(blob);
            newImg.onload = function() {
            // no longer need to read the blob so it's revoked
                URL.revokeObjectURL(blobUrl);
            }
            newImg.src = blobUrl;
            document.body.appendChild(newImg);
        },'image/jpeg');
    }

    rejectBtn.onclick = function () {
        video.hidden = false;
        canvas.hidden=true;
        
        snapBtn.hidden = false;
        acceptBtn.hidden = true;
        rejectBtn.hidden = true;
    }



