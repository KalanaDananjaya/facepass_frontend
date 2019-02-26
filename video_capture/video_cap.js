
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
        console.log(video.videoWidth,video.videoHeight);
        ctx.drawImage(video, 0,0); // the video
        video.hidden = true;
        canvas.hidden=false;
    }

    acceptBtn.onclick = function () {
        
        canvas.toBlob(function (blob){
            blob.name="your_face.jpg";

            var reader = new FileReader();

            reader.onloadend = function () {
                var base64 = reader.result;
                var link = document.createElement("a");
                
                link.setAttribute("href", base64);
                link.setAttribute("download", blob.name);
                link.click();
            };
            
            reader.readAsDataURL(blob);
        },'image/jpeg');

        self.close();
    }

    rejectBtn.onclick = function () {
        video.hidden = false;
        canvas.hidden=true;
        
        snapBtn.hidden = false;
        acceptBtn.hidden = true;
        rejectBtn.hidden = true;
    }



