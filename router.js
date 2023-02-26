// (c) Ralph Doncaster 2023

const routeServer = "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve?f=json&"
const TOKEN = "token=AAPK0d25c979218a4ea6840130bb585d979dlrnPEWKq4BOkymhQJiwLnpM8r3uoGeatR4g4Grija1KvKLFuH48RvCRRrtM0P8Ij&";

// fetch JSON query & perform action on response data
function fetchjd(query, action) {
    console.log(query);
    fetch(query)
        .then(response => response.json())
        .then(data => {
            console.log(JSON.stringify(data));
            action(data);
        });
}

// get postal code & weather station for given AAN JSON data from thedatazone.ca
function getLocationData(d) {
    const ae = aanq.elements;
    ae.aanData.value = JSON.stringify(d);
    const SA = d.address_num + " " + d.address_street;
    const WKID4326 = d.x_coord + "," + d.y_coord;
    console.log(aanq);

    var q = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?&f=json&SingleLine=" + SA + "&location=" + WKID4326 + "&maxLocations=1";
    fetchjd(q, d => [ae._Street.value, ae._City.value, , ae._Postal.value] =
            data.candidates[0].address.split(", "));

    q =  "https://maps-cartes.services.geo.ca/server_serveur/rest/services/NRCan/Carte_climatique_HOT2000_Climate_Map_EN/MapServer/1/query?geometry=" + WKID4326 + "&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&f=json";
    fetchjd(q, d => ae.weather.value = d.features[0].attributes.Name); 
}

async function distance() {
    console.log("distance()");
    const re = routes.elements;
    const q2 = fetch(routeServer + TOKEN + `stops=${re.wkid1.value};${re.wkid2.value}`);
    const q3 = fetch(routeServer + TOKEN + `stops=${re.wkid1.value};${re.wkid3.value}`);
    rq2 = await q2;
    rq3 = await q3;

    jrd = (await rq2.json()).routes.features[0].attributes;
    re.dist2.value = `${jrd.Total_Kilometers.toFixed(1)} km, ${jrd.Total_TravelTime.toFixed()} min`;
    jrd = (await rq3.json()).routes.features[0].attributes;
    re.dist3.value = `${jrd.Total_Kilometers.toFixed(1)} km, ${jrd.Total_TravelTime.toFixed()} min`;
}

// get NS assessment account (AAN) lat/long 
async function aanWKID(aanInput) {
    const dz = await fetch("https://www.thedatazone.ca/resource/a859-xvcs.json?aan=" + aanInput.value);
    jd = (await dz.json())[0];
    console.log(jd);

    // coords output come after AAN in form
    aanInput.nextSibling.textContent = ` ${jd.address_num} ${jd.address_street}, ${jd.address_city}: `;
    aanInput.nextElementSibling.value = `${jd.x_coord},${jd.y_coord}`;
}
