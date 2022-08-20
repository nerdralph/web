"use strict";

const AAN76 = "07880782";
const AAN126 = "03298671"

// get postal code for given aan JSON data from thedatazone.ca
function fetchPC(d) {
    //document.getElementById("addr").innerHTML = "data: " + JSON.stringify(d);
    const Id_addr = document.getElementById("addr");
    console.log(JSON.stringify(d));
    const sa = d["address_num"] + " " + d["address_street"] + " " + d["address_suffix"];
    const city = d["address_city"];
    const x = d["x_coord"];
    const y = d["y_coord"];
    Id_addr.innerHTML = "address: " + sa + ", " + city;

    const q = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?&f=json&SingleLine=" + sa + "&location=" + x + "," + y + "&maxLocations=1";
    console.log(q);
    fetch(q)
        .then(response => response.json())
        //.then(data => Id_addr.innerHTML += "<br>" + JSON.stringify(data));
        .then(data => {
            console.log(JSON.stringify(data));
            Id_addr.innerHTML += ", " + data["candidates"][0]["address"].split(",")[3];
            });
}

// get NS assessment account (AAN) data
function fetchAAN(aan) {
    fetch("https://www.thedatazone.ca/resource/a859-xvcs.json?aan=" + aan)
        .then(response => response.json())
        .then(data => fetchPC(data[0]));
        //.then(data => document.getElementById("addr").innerHTML = "data: " + JSON.stringify(data[0]));
        //.then(data => document.getElementById("addr").value = JSON.stringify(data[0]));
        //.then(data => console.log(data[0]["address_street"]));
}

function fillAddr(e) {
    //document.getElementById("addr").value = "123 MAIN ST";
    fetchAAN(e.value);
}
