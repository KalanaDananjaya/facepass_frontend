chrome.runtime.onInstalled.addListener(function (){
   chrome.tabs.create({
       'url': chrome.extension.getURL('/login_form/index.html'),
       'active':true
    },
    function(){
       console.log("register tab opened");
   });
});