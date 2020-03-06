//*****setting restaurant content ******/
let path = window.location.pathname

let pathArray = path.split('/')

let id = pathArray.pop()

let postContent = document.getElementById('entryInfo')

async function getResto() {
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
    document.title = `Rutlandia | ${title}`

    function getCoord(address) {
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
                marker.bindPopup("This restaurant")
            })
        
    }
    getCoord(address);
} //end getResto function
getResto();

/*****map and map-point call */
let myMap = L.map('restoMap').setView([44.475883, -73.212074], 13);

L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap)

