//*****setting restaurant content ******/
let path = window.location.pathname

let pathArray = path.split('/')

let id = pathArray.pop()

let postContent = document.getElementById('entryInfo')

let commentsContent = document.getElementById('commentsBox')

/***comments posting and storage **********/
// let myStorage = window.localStorage

// commentsContent.addEventListener('submit', (event) => {
//     let commentArray = myStorage.getItem('comments') || []

//     commentArray.push({name: event.target.body.author, comment: event.target.body.comment})
// })

// myStorage.getItem('comments') ? myStorage.removeItem('comments') : null

// myStorage.setItem('comments', commentArray)

/*****restaurant details *****************/
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

    postContent.innerHTML += `<li><h2>${title}</h2></li><li>${address}</li><li><p>${phone}</p></li><li><p><a href="${website}">${website}</a></p></li><li><p>${hours}</p>`
    document.title = `Rutlandia | ${title}`
    notes.forEach((note) => {
        commentsBox.innerHTML += `<li class="comments"><p><strong>"</strong>${note}<strong>"</strong><p></li>`
    })


    function placeMarker(address, title) {
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
                //set map focus based on restaurant; increase zoom
                let myMap = L.map('restoMap').setView([latLong.lat, latLong.long], 16); 
                //set marker coordinates
                let marker = L.marker([latLong.lat, latLong.long]).addTo(myMap)
                //popup text
                marker.bindPopup(`<strong>${title}</strong><br />${address}`)
                //add the map tiles
                L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
                    maxZoom: 20,
                    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                }).addTo(myMap)
            })

    }
    placeMarker(address, title);
} //end getResto function
getResto();

document.getElementById('submitButton').addEventListener('click', () => {
    let comment = document.getElementById('newComment').value;
    let author = document.getElementById('newAuthor').value;
    let commentBox = document.getElementById('commentsBox')
    commentBox.innerHTML += `<li><p><strong>"</strong>${comment}<strong>"</strong></p></li><li class="right"><p> -<strong> ${author}</strong></p></li>`
})

