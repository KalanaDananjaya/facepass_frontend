/*Listen for changes in URL */
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){

    if(changeInfo.url){
        console.log(changeInfo.url);
        chrome.storage.local.get(null,function(ans){
            console.log("local storage",ans);
         });
        chrome.storage.local.get(['loggedIn'],function(answer){
            console.log('logged in answer is',answer);
            console.log('logged in answer is',answer.loggedIn);
            if(answer.loggedIn===true){
                
                console.log("user logged in")
                /* Check whether the user is logged in and the url is in the user credential urls*/
                chrome.storage.local.get(['urls'],function(result){
                    console.log("stored urls",result.urls,"current url",changeInfo.url);
                    if(result.urls.includes(changeInfo.url)){
                        console.log("matching url");
                        console.log("matching url",changeInfo.url);
                        var urlIndex = result.urls.indexOf(changeInfo.url);
                        console.log('index',urlIndex);

                    

                       console.log("main tab id is",tabId)
                       console.log("tab is",tab);

                       chrome.storage.local.get(['credentials'],function(result){
                            console.log(result);
                            var username = result.credentials[urlIndex].username;
                            var password = result.credentials[urlIndex].password;
                            console.log('username',username,password)

                            var msg = {
                                username : username,
                                password : password
                            }

                            /* Get the credentials for that site and send it to the content script autoFill.js */    

                            chrome.tabs.sendMessage(tabId,{args: msg},function(response) {
                                console.log(tabId,tab.url);
                                console.log(response);
                            });
                        });

                        
                    }
                });
            }
            else{
                console.log("user not logged in");
            }
        });
    }
})