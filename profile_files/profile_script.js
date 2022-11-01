let profiles = [{name:"Lettuce B. Frank", restrict:"Vegetarian", pref:"Greens" }]

function openHousehold(){
    document.getElementById("title").innerHTML = "Household";
    document.getElementById("bottomhalf").style.display = "none";
    document.getElementById("tophalf").style.display = "none";
    document.getElementById("household").style.display = "block";
}

function openSettings(){
    document.getElementById("title").innerHTML = "Settings";
    document.getElementById("bottomhalf").style.display = "none";
    document.getElementById("tophalf").style.display = "none";
    document.getElementById("settings").style.display = "block";
}

function openChangeAccounts(){
    document.getElementById("bottomhalf").style.display = "none";
    document.getElementById("change").style.display = "block";
}

function returnToMenu(){
    document.getElementById("title").innerHTML = "Profile";
    document.getElementById("tophalf").style.display = "block";
    document.getElementById("bottomhalf").style.display = "block";
    document.getElementById("change").style.display = "none";
    document.getElementById("settings").style.display = "none";
    document.getElementById("household").style.display = "none";
}