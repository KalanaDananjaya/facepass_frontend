
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
   console.log(request);
   if (request && request.action === 'createWindow' && request.url) {
     chrome.windows.create({url: request.url}, function (win) {
       sendResponse(win);
     });
   }
   if(request && request.action==='saveCredentials'){
      chrome.storage.local.set({credentials:request.data.credentials},function(){
         console.log("sadddddd",request.data)
         chrome.storage.local.get(['credentials'],function(result){
            console.log('sadsadsa',result);
            var urlArray=[];
            result.credentials.forEach(element => {
                urlArray.push(element.website);
            });
            console.log("urls are",urlArray);
            chrome.storage.local.set({urls:urlArray});
           });
         chrome.storage.local.set({loggedIn:true});
         
         chrome.storage.local.set({uid:request.data.uid});
         console.log("uid",request.data.uid);
         chrome.storage.local.get(['loggedIn'],function(ans){
            console.log(ans);
         })
         
         
      });
      sendResponse("success");
   }

   if(request && request.action ==='form_submit'){
      console.log(request.data);
      chrome.storage.local.get(['uid'],function(uid){
         let msg = {
            uid:uid.uid,
            website:request.data.website,
            username:request.data.username,
            password:request.data.password
         }
         console.log("msg",msg)

         var xhr = new XMLHttpRequest();

         xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               console.log("respponse text",this.responseText);
               sendResponse(this.responseText);
            }
        };

         xhr.open('POST', 'http://localhost:3000/addaccount');
         xhr.withCredentials = true;
         xhr.setRequestHeader('Content-Type', 'application/json');
         xhr.send(JSON.stringify(msg));
         });

      
   }
 return true;
});




