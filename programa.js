// Función para mostrar el contenido de una pestaña
function mostrarContenido(id) {
    // Ocultar todos los contenidos
    var contenidos = document.querySelectorAll('.contenido');
    contenidos.forEach(function(contenido) {
        contenido.style.display = 'none';
    });

    // Mostrar el contenido seleccionado
    var contenidoMostrar = document.getElementById(id);
    contenidoMostrar.style.display = 'block';
};

var map = L.map('map').setView([4.676854, -74.079599], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let btnTrees = document.getElementById('btnTrees');

btnTrees.addEventListener('click', 
     async ()=>{
        let response= await fetch("arboles_sb.geojson");
        let datos= await response.json();

        L.geoJSON(
            datos,
            {
                pointToLayer: (feature, latlng)=>{               
                    return L.circleMarker(latlng,{
                        radius:5,
                        fillColor:'green',
                        weight:0,
                        opacity:1,
                        fillOpacity: 0.7,
                    })                           
                }
            }

        ).addTo(map)
    }
)

let btnDistance = document.getElementById('btnDistance');

btnDistance.addEventListener('click', 
     async ()=>{
        let response= await fetch("arboles_sb.geojson");
        let datos= await response.json();
        let trees = datos.features.map((MyElement, index)=>({
            id: index+1,
            coordinates: MyElement.geometry.coordinates
        }));


        let distances =[];
        trees.forEach( (treeA)=>{trees.forEach(
            
                (treeB)=>{
                    if(treeA.id != treeB.id){
                        let distance = turf.distance(
                            turf.point(treeA.coordinates),
                            turf.point(treeB.coordinates),
                        );            
                        distances.push(
                            [
                                `Arbol ${treeA.id}`,
                                `Arbol ${treeB.id}`,
                                distance.toFixed(3)
                            ]
                         )

                    }
                }
                )
        }
        )
        generatePDF(distances, trees.lenght);                  
    }
)

function generatePDF(distances, totalTrees){

    let {jsPDF} = window.jspdf;
    let documentPDF= new jsPDF();

    documentPDF.text("REPORTE DE ARBOLES EN EL BARRIO SIMON BOLIVAR", 10,10)
    //documentPDF.text("EL BARRIO TIENE" + totalTress,+ "ARBOLES", 10,30)

    documentPDF.autoTable(
        {
        head: [['Arbol 1','Arbol 2', 'Distance']],
        body: distances
        }    
    );
    documentPDF.save("simon_bolivar.pdf")
}


var map2 = L.map('map2').setView([4.676854, -74.079599], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map2);


let map2_1;
let markers = [];
let images = {
    "CosturerasUnidas": [
        "costureras1.jpg",
        "costureras2.jpg",
        "costureras3.jpg",
    ],
    "RioNeuque": [
        "rio_neuque.jpg",
    ]
};

// Inicializa el mapa
function initMap() {
    // Crear un mapa centrado en una ubicación específica
    map2_1 = new google.maps.Map(document.getElementById("mapa2"), {
        center: { lat: 4.676854, lng:-74.079599 }, // Coordenadas para centrar el mapa
        zoom: 12,
    });

    // Definir algunos puntos de interés
    let locations = [
        { name: "CosturerasUnidas", lat: 4.679766852285482, lng: -74.07978190419054 },
        { name: "RioNeuque", lat: 44.679903146803628, lng: -74.07709213554533 }
     
    ];

    // Crear un marcador para cada punto de interés
    locations.forEach(location => {
        let marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map2,
            title: location.name,
        });

        // Al hacer clic en un marcador, actualizamos las imágenes
        google.maps.event.addListener(marker, "click", () => {
            updateImages(location.name);
        });

        markers.push(marker);
    });
}

// Función para actualizar las imágenes cuando se selecciona un punto en el mapa
function updateImages(pointName) {
    let container = document.getElementById("imagenes-container");
    container.innerHTML = ""; // Limpiar imágenes anteriores

    if (images[pointName]) {
        images[pointName].forEach(imgSrc => {
            let imgElement = document.createElement("img");
            imgElement.src = imgSrc;
            imgElement.alt = pointName;
            container.appendChild(imgElement);
        });
    }
}
