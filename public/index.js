let myMap = L.map('mainMap').setView([44.475883, -73.212074], 13);

L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap)

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
        let address = post.address;
        let website = `/post/${id}`
        placeMarker(address, title, website)
    })
}

getPosts();

function placeMarker(address, title, website) {
    let urlAddress = encodeURIComponent(address)
    let latLong = {}
    fetch(
        `https://nominatim.openstreetmap.org/search/?q=${urlAddress}&format=json`
    )
        .then(res => res.json())
        .then(jsonObj => {
            let info = jsonObj[0]
            let lat = info.lat
            let lon = info.lon
            latLong.lat = lat
            latLong.long = lon
            console.log(latLong)
            console.log("latitude: " + latLong.lat)
            console.log("longitude: " + latLong.long)
            let marker = L.marker([latLong.lat, latLong.long]).addTo(myMap)
            marker.bindPopup(`<strong><a href="${website}">${title}</a></strong><br />${address}`)
        })
    
}