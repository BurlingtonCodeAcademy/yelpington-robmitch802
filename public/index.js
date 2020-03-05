let myMap = L.map('mainMap').setView([44.475883, -73.212074], 12);

let marker = L.marker([44.475994, -73.212140]).addTo(myMap)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)

let latLong = async function getLatLon(address) {
    let latLon = {}
    fetch(
        `https://nominatim.openstreetmap.org/search/?q=${address}&format=json`
    )
    .then((data) => {
        return data.json()
    })
    .then((locInfo) => {
        console.log(locInfo[0])
        let info = locInfo[0]
        let lat = info.lat
        let lon = info.lon
        latLon.lat = lat
        latLon.lon = lon
        let marker = L.marker([lat, lon]).addTo(myMap)
        marker.bindPopup(`This is ${address}`).openPopup()
    })
    return latLon
}

//let home = getLatLon('182 Main Street, Burlington, VT')

//****************resto-list code ****************/
let listContainer = document.getElementById('restoList')

async function getPosts() {
    let postList = await fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
        .then((response) => {
            return response.json() //turn readable stream into a json object
        }).then((jsonObj) => { //then return that object as a variable
            return jsonObj;
        })
    postList.forEach((post) => {
        let title = post.name;
        let id = post.id;
        console.log('id: ' + id + 'title: ' + title)
        listContainer.innerHTML += `<li><a href='/post/${id}'>${title}</a></li>`    
    })
}

getPosts();