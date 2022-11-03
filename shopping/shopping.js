let list = {
    1: [{name: "Milk", done: false, id: "task-item-0"}, 
        {name: "Eggs", done: false, id: "task-item-1"}, 
        {name: "Bread", done: false, id: "task-item-2"}]
}

let items = list[1];

let index = items.length;

if (!localStorage.getItem('shoppingList')) {
    localStorage.setItem('shoppingList', JSON.stringify(list));
}

$(document).ready(function(){
    list = JSON.parse(localStorage.getItem('shoppingList'))
    items = list[1]
    index = items.length

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

    items = items.filter(item => item.id !== id);

    parent.remove();

    list[1] = items
    localStorage.setItem('shoppingList', JSON.stringify(list))
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
    list[1] = items
    localStorage.setItem('shoppingList', JSON.stringify(list))
}

function addNew(){
    let input = $("#new-item-name").val();
    let id = "list-item-" + ++index;
    let newItem = {name: input.trim(), done: false, id: id}
    items.push(newItem);

    renderItem(newItem);

    $("#new-item-name").val("");

    list[1] = items
    localStorage.setItem('shoppingList', JSON.stringify(list))
}