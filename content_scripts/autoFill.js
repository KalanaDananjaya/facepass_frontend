console.log("running at doc end");
    var forms = document.getElementsByTagName("form");
    
    var username= localStorage.getItem("username");
    var password= localStorage.getItem("password");
    console.log(username,password);

    for(let form of forms){
        for (let index = 0; index < form.length; index++) {
            const element = form.elements[index];
            console.log(element);
            if(element.type==='password'){
                element.value=password;
                console.log(element.value);
                for (let reverseIndex = index-1; reverseIndex >= 0; reverseIndex--) {
                    console.log("inside third for loop");
                    const element = form.elements[reverseIndex];
                    if(element.type==='text'){
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