window.onload = () => {
    let user = localStorage.getItem("username")
    if (user == null) {
        location.href = 'https://node-login-page.herokuapp.com/'
    }
    let name = document.getElementById("myname")
    name.innerText = user;
}

function logout() {
    localStorage.clear();
    location.href = 'https://node-login-page.herokuapp.com/'
}
// let details = document.getElementById("details");
// let getData = async()=>{
//     await fetch("https://randomuser.me/api/")
//     .then(e=>e.json())
//     .then(e=>{
//         let data = e.results[0]
//         details.innerHTML = `
//         <h3>Random User Details</h3>
//         <img src="${data.picture.medium}"><br/>
//         <p>Name: ${data.name.first} ${data.name.last}</p>
//         <p>Gender: ${data.gender}</p>
//         <p>Age: ${data.dob.age}</p>
//         <p>D.O.B: ${data.dob.date}</p>
//         <p>Phone No: ${data.phone}</p>
//         <p>Email: ${data.cell}</p>
//         <p>City: ${data.location.city}</p>
//         <p>State: ${data.location.state}</p>
//         <p>Country: ${data.location.country}</p>
//         `
//     })
// }
// setTimeout(getData,200);

//NEW UPDATE
let myData = []
const getData = async () => {
    const data = await fetch('https://ashok-api.herokuapp.com/')
    return await data.json()
}
const mytable = document.getElementById('mytable')
const setData = () => {
    getData().then(data => {
        if (data.length === 0)
            mytable.innerHTML += `<tr>No Data</tr>`
        else {
            myData = data
            data.map((data) => {
                const tr = document.createElement('tr')
                tr.innerHTML = `<td>${data._id}</td> 
        <td>${data.name}</td> 
        <td>${data.email}</td> 
        <td>${data.phone}</td> 
        <td>${data.userType}</td>
        <td><button class="btn btn-info m-2 bg-info" onclick=editAction("${data._id}")>Edit</button>
        <button class="btn btn-warning m-2 bg-warning" onclick=deleteAction("${data._id}")>Delete</button></td>`
                mytable.appendChild(tr)
            })
        }
    })
}
setInterval(() => {
    getData().then(data => {
        if (myData.length !== data.length) {
            refreshData()
        }
    })
}, 500);
window.onload = setData
const refreshData = () => {
    window.location.reload()
}

async function editAction(id) {

    const editContainer = document.querySelector('.edit-container');
    editContainer.style.display = 'block'
    mytable.style.display = 'none'
    const name = document.querySelector('#name')
    const email = document.querySelector('#email')
    const phone = document.querySelector('#phone')
    const userType = document.querySelector('#userType')

    let user = myData.filter(data => data._id === id)[0]
    name.value = user.name
    email.value = user.email
    phone.value = user.phone
    userType.value = user.userType

    const update = document.querySelector('#update')
    const cancel = document.querySelector('#cancel')
    cancel.addEventListener('click', () => {
        refreshData()
    })

    update.addEventListener('click', async () => {
        await fetch(`https://ashok-api.herokuapp.com/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newUser: {
                    name: name.value,
                    email: email.value,
                    phone: phone.value,
                    userType: userType.value
                }
            })
        })

        editContainer.style.display = 'none'
        mytable.style.display = 'flex'
        refreshData()
    })
}

const newBtn = document.querySelector("#new")
newBtn.addEventListener('click', () => {
    const newContainer = document.querySelector('.new-container');
    newContainer.style.display = 'block'
    mytable.style.display = 'none'
    const name = document.querySelector('#newname')
    const email = document.querySelector('#newemail')
    const phone = document.querySelector('#newphone')
    const userType = document.querySelector('#newuserType')

    const create = document.querySelector('#create')
    const cancel = document.querySelector('#newcancel')
    cancel.addEventListener('click', () => {
        refreshData()
    })

    create.addEventListener('click', async () => {
        await fetch(`https://ashok-api.herokuapp.com/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newUser: {
                    name: name.value,
                    email: email.value,
                    phone: phone.value,
                    userType: userType.value
                }
            })
        })

        newContainer.style.display = 'none'
        mytable.style.display = 'block'
        refreshData()
    })
})
async function deleteAction(id) {
    const result = confirm("Do you want to delete")
    if (result) {
        await fetch(`https://ashok-api.herokuapp.com/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
}