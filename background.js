chrome.runtime.onInstalled.addListener(function (){
   chrome.tabs.create({
       'url': chrome.extension.getURL('/signup_form/index.html'),
       'active':true
    },
    function(){
       console.log("register tab opened");
   });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
   if (request && request.action === 'createWindow' && request.url) {
     chrome.windows.create({url: request.url}, function (win) {
       sendResponse(win);
     });
   }
 });

 chrome.runtime.onStartup.addListener(function(){
  chrome.tabs.create({
    'url': chrome.extension.getURL('/login_form/login.html'),
    'active':true
 },
 function(){
    console.log("verify tab opened");
});
 })