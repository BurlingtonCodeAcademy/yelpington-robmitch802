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
    document.title = `Rutlandia | ${title}`
    
    function placeMarker(spot){
        fetch(`https://nominatim.openstreetmap.org/search/?q=${spot}&format=json`)
        .then((data) => {
            return data.json()
        }).then((latLong) =>{ 
            spot.lat = latLong[0].lat;
            spot.lon = latLong[0].lon;
            return spot
        })
        }
        placeMarker('189 Bank St. Burlington, VT 05401');
    }
    
getResto(); 

let latLong = async function getLatLon(address) {
    let latLon = {}
    fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
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



/*****map and map-point call */
let myMap = L.map('restoMap').setView([44.475883, -73.212074], 12);

let marker = L.marker([44.475994, -73.212140]).addTo(myMap)

L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap)

