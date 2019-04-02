console.log("content script is running");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("message recieved");
    console.log(request.args);
    var args=request.args;
    localStorage.setItem("username",args.username);
    localStorage.setItem("password",args.password);
    console.log('args',args);
    
});