window.onload = () => {
    let user = localStorage.getItem("username")
    if(user == null){
        location.href = '/'
    }
    let name = document.getElementById("name")
    name.innerText = user;
}

function logout() {
    localStorage.clear();
    location.href = '/'
}
let details = document.getElementById("details");
let getData = async()=>{
    await fetch("https://randomuser.me/api/")
    .then(e=>e.json())
    .then(e=>{
        let data = e.results[0]
        details.innerHTML = `
        <h3>Random User Details</h3>
        <img src="${data.picture.medium}"><br/>
        <p>Name: ${data.name.first} ${data.name.last}</p>
        <p>Gender: ${data.gender}</p>
        <p>Age: ${data.dob.age}</p>
        <p>D.O.B: ${data.dob.date}</p>
        <p>Phone No: ${data.phone}</p>
        <p>Email: ${data.cell}</p>
        <p>City: ${data.location.city}</p>
        <p>State: ${data.location.state}</p>
        <p>Country: ${data.location.country}</p>
        `
    })
}
setTimeout(getData,200);