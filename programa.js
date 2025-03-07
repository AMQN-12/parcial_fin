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