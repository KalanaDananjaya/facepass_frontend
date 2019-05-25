
    var video = document.getElementById('video');
    url = window.URL || window.webkitURL;

    var snapBtn = document.getElementById('snapBtn');
    var acceptBtn = document.getElementById('acceptBtn');
    var rejectBtn = document.getElementById('rejectBtn');
    var videoDiv =document.getElementById('videoDiv');
    var canvas = document.getElementById('canvas'); // create a canvas
    var emailDiv = document.getElementById('emailDiv');
    

    snapBtn.style.display = "flex";
    acceptBtn.style.display = "none";
    rejectBtn.style.display = "none";
    
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
        snapBtn.style.display="flex";
    })
    .catch(function (error){
        console.log(error);
    });

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
            return (true);
        }
        alert("You have entered an invalid email address!");
        return (false);
    }



    snapBtn.onclick = function (){
        snapBtn.style.display="none";
        acceptBtn.style.display="flex";
        rejectBtn.style.display="flex";
        emailDiv.style.display="inline-block";
        
        const ctx = canvas.getContext('2d'); // get its context
        canvas.width = video.videoWidth; // set its size to the one of the video
        canvas.height = video.videoHeight;
        console.log(video.videoWidth,video.videoHeight);
        ctx.drawImage(video, 0,0); // the video
        canvas.style.display ="flex";
        canvas.style.margin = "auto";
        video.style.display = "none";
        
    }

    acceptBtn.onclick = function () {
        var email = document.getElementById('email').value;
        if(ValidateEmail(email)===true){
            canvas.toBlob(function (blob){
           
                var formData = new FormData();
                
                var email = document.getElementById('email').value;
                formData.append('file',blob);
                formData.append('email',email) 
                
                $.ajax({
                    type: 'POST',
                    url: 'http://35.209.163.57:3000/verify',
                    data: formData,
                    processData: false,
                    contentType: false
                }).done(function(response) {
                    console.log("new response is" , response);
                       if(response.data<0.4 && response.data>0){
                           console.log("verified");
                           chrome.runtime.sendMessage({
                            action: 'saveCredentials',
                            data:response
                          },
                          function(credentials) {
                            console.log(credentials);
                          });
                          self.close();
                       }
                       else if(response.data==-1){
                          alert("Email not recognized.Please Try again");
                       }
                       else{
                           alert("Face not recognized.Please Try again");
                       } 
                       console.log(response.data);
                });
            },'image/jpeg');
    
        }
    }

    rejectBtn.onclick = function () {
        video.style.display = "flex";
        canvas.style.display="none";
        emailDiv.style.display="none";
        
        snapBtn.style.display = "flex";
        acceptBtn.style.display = "none";
        rejectBtn.style.display = "none";
    }



