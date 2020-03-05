//*****setting restaurant content ******/
let path = window.location.pathname

let pathArray = path.split('/')

let id = pathArray.pop()

let postContent = document.getElementById('entryInfo')

async function getResto(){
    let content = await fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${id}`)
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
    let notes = content.notes

    postContent.innerHTML += `<li><h4>${title}</h4></li><li>${address}</li><li><p>${phone}</p></li><li><p><a href="${website}">${website}</a></p></li><li><p>${hours}</p></li><li><p>${notes}</p></li>`
}

getResto(); 

/*****map and map-point call */
let myMap = L.map('restoMap').setView([44.475883, -73.212074], 12);

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