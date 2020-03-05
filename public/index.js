let myMap = L.map('mainMap').setView([44.475883, -73.212074], 12);

L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
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
    let postList = await fetch('/api/restaurants.json')
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



async function placeMarkers() {

}

let marker = L.marker([44.475994, -73.212140]).addTo(myMap)