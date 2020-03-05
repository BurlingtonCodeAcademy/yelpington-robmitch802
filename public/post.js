let path = window.location.pathname

let pathArray = path.split('/')

let id = pathArray.pop()

let postContent = document.getElementById('entryInfo')


async function getResto(){
    let content = await fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants${id}`)
    .then((response) => {
        return response.json()
    }).then((jsonObj) => {
       return jsonObj;
    })

    let title = content.name
    let address = content.address
    let phone = content.phone
    let website = content.website
    let hours = content.hours
    let notes = content.notes[0]

    articleContent.innerHTML += `<li><h4>${title}</h4></li><li>${address}</li><li><p>${phone}</p></li><li><p><a href="${website}">${website}</a></p></li><li><p>${hours}</p></li><li><p>${notes}</p></li>`
}

getResto(); 