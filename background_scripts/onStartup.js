chrome.runtime.onStartup.addListener(function(){
    chrome.tabs.create({
      'url': chrome.extension.getURL('/login_form/login.html'),
      'active':true
   },
   function(){
      console.log("verify tab opened");
   });
  });