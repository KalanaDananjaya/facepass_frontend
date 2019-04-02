chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
   if (request && request.action === 'createWindow' && request.url) {
     chrome.windows.create({url: request.url}, function (win) {
       sendResponse(win);
     });
   }
   if(request && request.action==='saveCredentials'){
      chrome.storage.local.set({credentials:request.data},function(){
         chrome.storage.local.get(['credentials'],function(result){
            var urlArray=[];
            result.credentials.forEach(element => {
                urlArray.push(element.url);
            });
            console.log("urls are",urlArray);
            chrome.storage.local.set({urls:urlArray});
           });
         chrome.storage.local.set({loggedIn:true});
         chrome.storage.local.get(['loggedIn'],function(ans){
            console.log(ans);
         })
      });
      sendResponse("success");
   }
 return true;
});




