console.log("running at doc end");
    var forms = document.getElementsByTagName("form");
    
    var username= localStorage.getItem("username");
    var password= localStorage.getItem("password");
    console.log(username);

    for(let form of forms){
        for (let index = 0; index < form.length; index++) {
            const element = form.elements[index];
            if(element.type==='password'){
                element.value=password;
                for (let reverseIndex = index-1; reverseIndex >= 0; reverseIndex--) {
                    const element = form.elements[reverseIndex];
                    if(element.type==='text' || element.type==='email'){
                        element.value=username;
                        break;
                    }
                }
            }
            else{
                continue;
            }
        }
    }