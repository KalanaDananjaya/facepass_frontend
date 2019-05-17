
console.log("form submission script running");
console.log("forms",document.forms,document.forms.length);
for (var i = 0; i < document.forms.length; i++) {
    document.forms[i].addEventListener("submit", function(){
       

        for (let index = 0; index < this.length; index++) {
            const element = this.elements[index];
            if(element.type==="password"){
                var confirmSaving = confirm('Do you want to save the password?');
            }
        }

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
                        if(newElement.type==="text" || newElement.type==="email" ){
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
            
            // contact with the background page and send the form data.
           
            chrome.runtime.sendMessage({action:'form_submit', 'data':data}, function(response){
                if(response.success===false){
                    alert(response.msg);
                }    
            });
                
        }
        
});

}