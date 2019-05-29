chrome.windows.onRemoved.addListener(function(windowid) {
    chrome.storage.local.remove(['loggedIn','credentials','urls','uid']);
    chrome.storage.local.clear();
    console.log("Closed window: " + windowid);
    
    chrome.storage.local.get(null,function(ans){
        console.log("local storage after closing the window",ans);
     });
   });

   chrome.windows.onCreated.addListener(function(windowid) {
    chrome.storage.local.remove(['loggedIn','credentials','urls','uid']);
    chrome.storage.local.clear();
    
    chrome.storage.local.get(null,function(ans){
        console.log("local storage after opening the window",ans);
     });
   });