async function login() {
    let username = document.getElementById('username').value.trim()
    let password = document.getElementById('password').value.trim()
    if (!(username == "" || password == "" || username == undefined || password == undefined)) {
        let data = await fetch("https://node-login-page.herokuapp.com/login", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
        let result = await data.json()
        if (result["code"] == 200) {
            alert("Logged In Successfully");
            localStorage.setItem("username", username);
            location.href = "/home";
        }
        else {
            alert("wrong credentials");
        }
    }
    else {
        alert("All fields are necessary")
    }
}

let auth = () => {
    let user = localStorage.getItem("username")
    if (user != null) {
        location.href = '/home'
    }
}

setTimeout(auth, 100);