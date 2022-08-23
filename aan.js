"use strict";

const AAN76 = "07880782";
const AAN126 = "03298671"

// get first element by name
function gFEBN(name) {
    return document.getElementsByName(name)[0];
}

// get postal code & weather station for given AAN JSON data from thedatazone.ca
function getLocationData(d) {
    //console.log(JSON.stringify(d));
    gFEBN("aanData").innerHTML = JSON.stringify(d);
    const SA = d["address_num"] + " " + d["address_street"] + " " + d["address_suffix"];
    document.getElementById("street").innerHTML = SA;
    const WKID4326 = d["x_coord"] + "," + d["y_coord"];

    var q = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?&f=json&SingleLine=" + SA + "&location=" + WKID4326 + "&maxLocations=1";
    console.log(q);
    fetch(q)
        .then(response => response.json())
        //.then(data => Id_addr.innerHTML += "<br>" + JSON.stringify(data));
        .then(data => {
            console.log(JSON.stringify(data));
            // postal code is after the 3rd comma in address
            gFEBN("postal").value = data["candidates"][0]["address"].split(",")[3].trim();
            });

    q =  "https://maps-cartes.services.geo.ca/server_serveur/rest/services/NRCan/Carte_climatique_HOT2000_Climate_Map_EN/MapServer/1/query?geometry=" + WKID4326 + "&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&f=json";
    console.log(q);
    fetch(q)
        .then(response => response.json())
        .then(data => gFEBN("weather").value = data["features"][0]["attributes"]["Name"]); 
}

// get NS assessment account (AAN) data
function findAAN(aan) {
    fetch("https://www.thedatazone.ca/resource/a859-xvcs.json?aan=" + aan)
        .then(response => response.json())
        .then(data => getLocationData(data[0]));
        //.then(data => document.getElementById("addr").innerHTML = "data: " + JSON.stringify(data[0]));
        //.then(data => document.getElementById("addr").value = JSON.stringify(data[0]));
        //.then(data => console.log(data[0]["address_street"]));
}

