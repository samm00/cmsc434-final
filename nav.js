$(document).ready(function(){
    $(".nav-item").click(function(e) {
        link = e.currentTarget.lastElementChild
        console.log($(link))
    });

});