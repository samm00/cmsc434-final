//let profiles = [{name:"Lettuce B. Frank", restrict:"Vegetarian", pref:"Greens"},
//               {name:"Kandy Kane", restrict:"Peanut Allergy, Lactose Intolerant", pref:"Sweets"},
//               {name:"Tom A. Tow", restrict:"None", pref:"None"}]

//--------------------- functions to change menus ---------------------
function openHousehold(){
    document.getElementById("title").innerHTML = "Household";
    document.getElementById("bottomhalf").style.display = "none";
    document.getElementById("tophalf").style.display = "none";
    document.getElementById("household").style.display = "block";
    document.getElementById("housebuttons").style.display = "block";
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
    document.getElementById("changebuttons").style.display = "block";
}

function returnToMenu(){
    document.getElementById("title").innerHTML = "Profile";
    document.getElementById("tophalf").style.display = "block";
    document.getElementById("bottomhalf").style.display = "block";
    document.getElementById("change").style.display = "none";
    document.getElementById("settings").style.display = "none";
    document.getElementById("household").style.display = "none";
    document.getElementById("housebuttons").style.display = "none";
    document.getElementById("changebuttons").style.display = "none";
}

function openAdd(){
    document.getElementById("household").style.display = "none";
    document.getElementById("housebuttons").style.display = "none";
    document.getElementById("addMenu").style.display = "block";
}

function closeAdd(){
    document.getElementById("addMenu").style.display = "none";
    document.getElementById("household").style.display = "block";
    document.getElementById("housebuttons").style.display = "block";
}
//--------------------- functions to change menus ---------------------

//adds new member, creates necessary code for innerHTML
function addMember(){
    let newName = document.getElementById("newName").value;
    let newR = document.getElementById("newRestrict").value;
    let newPref = document.getElementById("newPref").value;
    let houseCode = "";
    let accountCode = "";
    let targetID = "";
    if(newName == ""){
        newName = "No Name";
    }
    if(newR == ""){
        newR = "None";
    }
    if(newPref == ""){
        newPref = "None";
    }
    //profiles.push({name: newName, restrict: newR, pref: newPref});
    targetID += newName.replace("/\s+/g", "");
    targetID += newR.replace("/\s+/g", "");
    targetID += newPref.replace("/\s+/g", "");

    houseCode += "<div class=\"member " + targetID + "\"> "
    houseCode += "<img class=\"ppic_house\" src=\"./profile_files/images/Profile_Pic.png\" height=\"50px\" /> ";
    houseCode += "<h2 class=\"member_name\">"+ newName +"</h2> ";
    houseCode += "<p class=\"member_desc\">Allergies/Dietary Restrictions: " + newR + "</p> ";
    houseCode += "<p class=\"member_desc\">Preferences: " + newPref + "</p> ";
    houseCode += "<button class=\"deleteMem\" onclick=\"deleteMember('" + targetID + "', '" + newName + "')\">Delete</button> </div>";
    document.getElementById("household").innerHTML += houseCode;

    accountCode += "<button class=\"buttons " + targetID + "\" onclick=\"changeAccount('" + newName + "')\">" + newName + "</button>";
    document.getElementById("change").innerHTML += accountCode;
    
    document.getElementById("newName").value = "";
    document.getElementById("newRestrict").value = "";
    document.getElementById("newPref").value = "";
    closeAdd();
}

//delete member and everything associated
function deleteMember(targets, name){
    let toDelete = document.getElementsByClassName(targets);

    while(toDelete[0]) {
        toDelete[0].remove();//.parentNode.removeChild(toDelete[0]);
    }

    if(document.getElementById("name").textContent == name){
        document.getElementById("name").innerHTML = "No Account";
    }
}

//simple change account
function changeAccount(name){
    document.getElementById("name").innerHTML = name;
}