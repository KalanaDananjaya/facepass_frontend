
console.log("form submission script running");
console.log("forms",document.forms,document.forms.length);
for (var i = 0; i < document.forms.length; i++) {
    console.log('inside loop');
    document.forms[i].addEventListener("submit", function(){
        var confirmSaving = confirm('Do you want to save the password?');
        
        if( confirmSaving===true ){
            
            var password;
            var username;
            var url=window.location.href;
           
            for (let index = 0; index < this.length; index++) {
                const element = this.elements[index];
                if(element.type==="password"){
                    password= element.value;
                    console.log(password);
                    for (let reverseIndex = 0; reverseIndex < this.length; reverseIndex++) {
                        const newElement = this.elements[reverseIndex];
                        if(newElement.type==="text"){
                            username = newElement.value;
                            console.log(username);
                        }
                    }
                }
                
            }
            
            var data = {
                username: username,
                password : password,
                website : url
            };
            
            // contact with your background page and send the form data.
           
            chrome.runtime.sendMessage({action:'form_submit', 'data':data}, function(){
                /* my callback if needed */ 
                alert("form submitted");
                });
                
        }
        
});

}