let lists = [
    {
        name: "Default List",
        items: [{name: "Milk", done: false, id: "task-item-0-0", qty: "1"}, 
                {name: "Eggs", done: false, id: "task-item-0-1", qty: "1"}, 
                {name: "Bread", done: false, id: "task-item-0-2", qty: "2"}],
        index: 3
    },
    {
        name: "List 2",
        items: [{name: "Apples", done: true, id: "task-item-1-0", qty: "5"},
                {name: "Oranges", done: true, id: "task-item-1-1", qty: "3"},
                {name: "Pomegranate", done: false, id: "task-item-1-2", qty: "1"}],
        index: 3
    }
        
]

if (!localStorage.getItem('shoppingList')) {
    localStorage.setItem('shoppingList', JSON.stringify({lists}));
} else {
    lists = JSON.parse(localStorage.getItem('shoppingList'))
}

if (localStorage.getItem('AddToList')) {
    getRecipeItems()
}

$(document).ready(function(){
    populateList();

    $(".add-btn").click(e => addNew(e.target));

    $(".new-item").on('keypress', function(e) {
        if(e.keyCode == 13){
            addNew(e.target)
        }
    })

    $("#new-list-btn").click(addList);
});

function updateStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(lists))
}

function populateList() {
    lists = JSON.parse(localStorage.getItem('shoppingList'))

    lists.forEach(renderList)
}

function getRecipeItems() {
    let recipeList = localStorage.getItem("AddToList")
    let list = lists.length
    let newItems = recipeList.split(',').map((item, index) => {
        return {
            name: item,
            done: false,
            id: "task-item-" + list + "-" + index
        }
    })

    newList = {name: "From Recipes", items: newItems}
    lists.push(newList)

    localStorage.setItem("AddToList", "")
    updateStorage()
}

function renderList(list, index) {
    let container = $('#list-container')
    container.append('<h2 class="mt-2"><input id="list-name-' + index + '" type="text" class="list-name" value="' + list.name + '"></input></h2>')
    container.append(`<div class="input-group mt-2">
        <input type="text" class="form-control new-item" id="new-item-name-` + index + `" placeholder="Add new item...">
        <button id="add-` + index + `" class="input-group-text new-item btn-add input-group-append">
          <img src=".\\static\\icons\\plus.svg">
        </button>
      </div>`)
    container.append('<ul id="shopping-list-' + index + '" class="shopping-list list-group"></ul>')
    list['items'].forEach((item) => renderItem(item, index))
}

function renderItem(item, listIndex) {
    let list = $("#shopping-list-" + listIndex)

    let close = '<button class="btn-close">'
    let text = '<input id="' + item.id + '-name"type="text" class="list-item-label" value="' + item.name + '"></input>'

    let checkbox = ""
    let li = ""

    if (item.done) {
        checkbox = '<input type="checkbox" class="check completed" style="margin-right: 10px" checked></input>'
        li = '<li id="'+ item.id + '" class="list-group-item completed">'+ checkbox + text + close +'</li>'
    } else {
        checkbox = '<input type="checkbox" class="check" style="margin-right: 10px"></input>'
        li = '<li id="'+ item.id + '" class="list-group-item">'+ checkbox + text + close +'</li>'
    }
    
    list.append(li)


    $("#" + item.id + " .check").on('change', updateItem)
    $("#" + item.id + " .btn-close").on('click', deleteItem)
    $("#" + item.id + "-name").on('focusin', (event) => {
        document.getElementById("fake-keyboard").style.display = "block";
    })
    $("#" + item.id + "-name").on('focusout', () => 
        document.getElementById("fake-keyboard").style.display = "none"
    )
    $("#" + item.id + "-name").on('keypress', function(e) {
        if(e.keyCode == 13){
            document.getElementById("fake-keyboard").style.display = "none"
        }
    })
}

function deleteItem(){
    let parent = $(this).parent()
    let id = parent[0].id;
    let list = parseInt($(parent).parent()[0].id.split('-')[2])

    let items = lists[list]['items'].filter(item => item.id !== id);

    lists[list]['items'] = items
    parent.remove();

    updateStorage()
}

function updateItem() {
    let parent = $(this).parent()
    let id = parent[0].id;
    let list = parseInt($(parent).parent()[0].id.split('-')[2])

    let item = lists[list]['items'].find(item => item.id === id);

    item.done = !item.done;
    if (item.done) {
        parent.addClass(["completed"])
    } else {
        parent.removeClass(["completed"])
    }

    updateStorage()
}

function addNew(target){
    let input = ""
    let listIndex = 0
    if (target.nodeName == "INPUT") {
        input = $(target).val();
        listIndex = $(target)[0].id.split('-')[3]
    } else {
        listIndex = $(target)[0].id
        input = $("#new-item-name-" + listIndex).val();
    }

    let id = "list-item-" + ++lists[listIndex].index;
    let newItem = {name: input.trim(), done: false, id: id}

    lists[listIndex]['items'].push(newItem);

    renderItem(newItem, listIndex);

    $("#new-item-name" + listIndex).val("");

    updateStorage()
}

function addList() {
    let list = {
        name: "New List",
        items: [],
        index: 0
    }
    let index = lists.length;
    renderList(list, index)
}