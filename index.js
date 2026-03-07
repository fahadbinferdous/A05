document.getElementById('sign-In-Btn').addEventListener('click',function(){
    
    const usernameInput=document.getElementById('username-Input')
    const username=usernameInput.value
    
    
    const passwordInput=document.getElementById('password-Input')
    const password=passwordInput.value
    
    
    if(username=='admin' && password=='admin123')
        {
            alert('Sign In Successfull')
            window.location.assign('home.html')
        }
    else
        {alert
            ('Sign In Failed')
        }
    return
 
})