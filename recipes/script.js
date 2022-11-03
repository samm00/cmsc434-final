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
            window.localStorage.setItem('AddToList', window.localStorage['AddToList'] + "," + elem.innerText);
        }
    
        btn.innerText = '\u{2713}';
        btn.classList.add('added-to-list');
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
            x[i].style.display="list-item";                 
        }
    }
}