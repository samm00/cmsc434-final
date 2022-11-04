function todoChecked(id){
    console.log(id)
    if (document.getElementById(id).checked){
        var elem = document.getElementById(id+"-text")
        elem.innerHTML = "<del>" + elem.innerHTML + "</del>"
        elem.style = "color: gray;"
    } else {
        var elem = document.getElementById(id+"-text")
        elem.innerHTML = elem.innerHTML.replace("<del>","")
        elem.innerHTML = elem.innerHTML.replace("</del>","")
        elem.style = "color: black;"
    }
}

function addToLocalStorage(id){
    console.log(id)
    var elem = document.getElementById(id+"-text")
    var btn = document.getElementById(id+"-plus")

    if (!btn.classList.contains('added-to-list')){
        if (window.localStorage.getItem('AddToList') == null || window.localStorage.getItem('AddToList') == "") {
            window.localStorage.setItem('AddToList', elem.innerText);
        } else {
            window.localStorage.setItem('AddToList', window.localStorage['AddToList'] + ";" + elem.innerText);
        }
    
        btn.innerText = '\u{2713}';
        btn.classList.add('added-to-list');
        btn.style.width = '100%';
    } 
}

function crossOut(id){
    var elem = document.getElementById(id);
    if (elem.innerHTML.includes("<del>")){
        elem.innerHTML = elem.innerHTML.replace("<del>","")
        elem.innerHTML = elem.innerHTML.replace("</del>","")
        elem.style = "color: black;"
    } else {
        elem.innerHTML = "<del>" + elem.innerHTML + "</del>"
        elem.style = "color: gray;"
    }
}

function search() {
    let input = document.getElementById('recipe-searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('recipe-option');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="block";                 
        }
    }
}

function test(){
    document.getElementById("fake-keyboard").style.display = "block"; 
}

const element = document.getElementById("recipe-searchbar");
console.log(element)
if (element != null){
    element.addEventListener("focusin", function() {
        document.getElementById("fake-keyboard").style.display = "block";
    }); 
    element.addEventListener("focusout", function() {
        document.getElementById("fake-keyboard").style.display = "none";
    }); 
    element.addEventListener("select", function() {
        document.getElementById("fake-keyboard").style.display = "none";
    }); 


}

var count = 1

function addNote(recipe, note, b){
    if (note == null){
        note = document.getElementById("notes-input").value
        document.getElementById("notes-input").value = ""
    } 
    var list = document.getElementsByClassName("notes-list")[0]

    newRow = document.createElement('li')
    newRow.className = "list-group-item"
    newRow.id = "note-"+count
    newRow.innerText = note

    closeButton = document.createElement('button')
    closeButton.className = "btn-close"
    closeButton.style.float = "right"
    closeButton.setAttribute('onclick', "deleteNote('"+recipe+"',this)")

    newRow.appendChild(closeButton)
    list.appendChild(newRow)

    count = count + 1
    if (b == null){
        if (window.localStorage['notes-'+recipe] == null || window.localStorage['notes-'+recipe] == "") {
            window.localStorage['notes-'+recipe] = note
        } else {
            window.localStorage['notes-'+recipe] += ";"+note
        }
    }
}

function deleteNote(recipe, r){
    var text = r.parentNode.innerText
    if (window.localStorage['notes-'+recipe].indexOf(text) == 0){
        window.localStorage['notes-'+recipe] = window.localStorage['notes-'+recipe].replace(text+";", "")
        window.localStorage['notes-'+recipe] = window.localStorage['notes-'+recipe].replace(text, "")
    } else {
        window.localStorage['notes-'+recipe] = window.localStorage['notes-'+recipe].replace(";"+text, "")
    }
    r.parentNode.parentNode.removeChild(r.parentNode);
}
