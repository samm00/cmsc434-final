let lists = [
    {
        name: "Default List",
        items: [{name: "Milk", done: false, id: "task-item-0-0", qty: "1"}, 
                {name: "Eggs", done: false, id: "task-item-0-1", qty: "1"}, 
                {name: "Bread", done: false, id: "task-item-0-2", qty: "2"}],
        index: 3,
        deleted: false
    },
    {
        name: "List 2",
        items: [{name: "Apples", done: true, id: "task-item-1-0", qty: "5"},
                {name: "Oranges", done: true, id: "task-item-1-1", qty: "3"},
                {name: "Pomegranate", done: false, id: "task-item-1-2", qty: "1"}],
        index: 3,
        deleted: false
    }
]

function updateStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(lists))
}

function openKeyboard(event) {
    document.getElementById("fake-keyboard").style.display = "block";
    ypos = event.target.getBoundingClientRect().bottom;
    console.log(ypos)
    if (640 - ypos < 250) {
        window.scroll(0, ypos-390, 0)
    }
}

if (!localStorage.getItem('shoppingList')) {
    updateStorage()
} else {
    lists = JSON.parse(localStorage.getItem('shoppingList'))
}

if (localStorage.getItem('AddToList')) {
    getRecipeItems()
}

$(document).ready(function(){
    populateList();

    $("#new-list-btn").click(addList);
});



function populateList() {
    lists = JSON.parse(localStorage.getItem('shoppingList'))

    lists.forEach(renderList)
}

function getRecipeItems() {
    let recipeList = localStorage.getItem("AddToList")
    let list = lists.length
    let newItems = recipeList.split(';').map((item, index) => {
        return {
            name: item,
            done: false,
            id: "task-item-" + list + "-" + index
        }
    })

    newList = {name: "From Recipes", items: newItems, index: newItems.length, deleted: false}
    lists.push(newList)

    localStorage.setItem("AddToList", "")
    updateStorage()
}

function renderList(list, index) {
    if (list.deleted) {
        return
    }
    let container = $('#list-container')
    container.append(`<div class="mt-2 list-heading">
          <input id="list-name-` + index + `" type="text" class="list-name" value="` + list.name + `"disabled></input>
          <div class="list-btn-holder">
            <button id="btn-edit-` + index + `" class="edit-list">Edit</button>
            <button id="btn-done-` + index + `" class="edit-list">Done</button>
            <button id="btn-del-` + index + `" class="delete-list">Delete</button>
          </div>
        </div>`)
    container.append(`<div class="input-group mt-2">
        <input type="text" class="form-control new-item" id="new-item-name-` + index + `" placeholder="Add new item...">
        <button id="add-` + index + `" class="input-group-text new-item btn-add input-group-append">
          <img id ="iconadd-` + index +`" src=".\\static\\icons\\plus.svg">
        </button>
      </div>`)
    container.append('<ul id="shopping-list-' + index + '" class="shopping-list list-group"></ul>')
    $("#btn-done-" + index).hide();
    list['items'].forEach((item) => renderItem(item, index))

    $("#btn-edit-" + index).on('click', () => {
        $("#list-name-" + index).prop("disabled", false)
        $("#list-name-" + index).trigger("focusin");
        $("#btn-edit-" + index).hide();
        $("#btn-done-" + index).show();
    })
    $("#btn-done-" + index).on('click', () => {
        $("#list-name-" + index).prop("disabled", true)
        $("#btn-done-" + index).hide();
        $("#btn-edit-" + index).show();
        list.name = $("#list-name-" + index).val()
        console.log(lists)
    })
    $("#btn-del-" + index).on('click', () => {
        alert("This will permantently delete " + list.name + ".\n Are you sure? (Confirmation Functionality Not Implemented Yet.)")
        lists[index].deleted = true;
        updateStorage()
        location.reload()
    })


    $("#list-name-" + index).on('focusin', (event) => {
        openKeyboard(event)
    })
    $("#list-name-" + index).on('focusout', () => 
        document.getElementById("fake-keyboard").style.display = "none"
    )
    $("#list-name-" + index).on('keypress', function(e) {
        if(e.keyCode == 13){
            document.getElementById("fake-keyboard").style.display = "none"
        } else {
            openKeyboard(e)
        }
    })
    $("#new-item-name-" + index).on('focusin', (event) => {
        openKeyboard(event)
    })
    $("#new-item-name-" + index).on('focusout', () => 
        document.getElementById("fake-keyboard").style.display = "none"
    )
    $("#new-item-name-" + index).on('keypress', function(e) {
        if(e.keyCode == 13){
            addNew(e.target)
            e.target.value = ""
            $("#new-item-name-" + index).trigger("focusout")
        } else {
            document.getElementById("fake-keyboard").style.display = "block"
        }
    })

    $("#add-" + index).click(e => addNew(e.target));
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
        openKeyboard(event)
    })
    $("#" + item.id + "-name").on('focusout', () => 
        document.getElementById("fake-keyboard").style.display = "none"
    )
    $("#" + item.id + "-name").on('keypress', function(e) {
        if(e.keyCode == 13){
            document.getElementById("fake-keyboard").style.display = "none"
        } else {
            document.getElementById("fake-keyboard").style.display = "block"
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
        listIndex = $(target)[0].id.split('-')[1]
        input = $("#new-item-name-" + listIndex).val();
    }

    if (input.trim() === "") {
        return;
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
        index: 0,
        deleted: false
    }
    let index = lists.length;
    lists.push(list)
    renderList(list, index)
}