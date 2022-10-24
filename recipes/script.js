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