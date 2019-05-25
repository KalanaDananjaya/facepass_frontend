chrome.windows.onRemoved.addListener(function(windowid) {
    chrome.storage.local.remove(['loggedIn','credentials','urls','uid']);
   });