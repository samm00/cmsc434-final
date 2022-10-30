let items = [{name: "Milk", done: false, id: "task-item-0"}, 
             {name: "Eggs", done: false, id: "task-item-1"}, 
             {name: "Bread", done: false, id: "task-item-2"}];

let index = items.length;

$(document).ready(function(){
    populateList();

    $("#add").click(addNew);

    $("#new-item-name").on('keypress', function(e) {
        if(e.keyCode == 13){
        addNew()
        }
    })
});

function populateList() {
    items.forEach((item) => {
        renderItem(item)
    })
}

function renderItem(item) {
    let list = $("#shopping-list-1")
    let checkbox = '<input type="checkbox" class="check" style="margin-right: 10px"></input>'
    let close = '<button class="btn-close" style="float: right">'

    let li = '<li id="'+ item.id + '" class="list-group-item" contenteditable>'+ checkbox + item.name + close +'</li>'

    list.append(li)

    $("#" + item.id + " .check").on('change', updateItem)
    $("#" + item.id + " .btn-close").on('click', deleteItem)
}

function deleteItem(){
    let parent = $(this).parent()
    let id = parent[0].id;

    item = items.filter(item => item.id !== id);

    parent.remove();
}

function updateItem() {
    let parent = $(this).parent()
    let id = parent[0].id;
    let item = items.find(item => item.id === id);
    item.done = !item.done;
    if (item.done) {
        parent.addClass(["completed", "list-group-item-light"])
    } else {
        parent.removeClass(["completed", "list-group-item-light"])
    }
}

function addNew(){
    let input = $("#new-item-name").val();
    let id = "list-item-" + ++index;
    let newItem = {name: input.trim(), done: false, id: id}
    tasks.push(newItem);

    renderItem(newItem);

    $("#new-task-name").val("");
}