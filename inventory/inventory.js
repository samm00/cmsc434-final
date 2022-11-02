function new_card() {
    document.getElementById('new_item').style.display = 'block';
  }
  
  function add_listen(item, index) {
    item.onclick = new_card;
  }
  
  document.querySelectorAll('.add').forEach(add_listen);
  
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function (e) {
        document.getElementById('old_img').src = e.target.result;
        document.getElementById('old_img').style.width = '100%';
        document.getElementById('old_img').style.objectFit = 'cover';
      };
  
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  function upload() {
    document.getElementById('new_img').click();
    //document.getElementById('old_img').style.display = 'none';
  }
  
  let items = [];
  
  function done() {
    let new_item = {
      food_name: document.getElementById('new_food').value,
      img_src: document.getElementById('old_img').src,
      labs: Array.from(document.querySelectorAll('.diet_tag')).map(
        (item) => item.checked
      ),
      qty: document.getElementById('new_qty').value,
      qty_unit: document.getElementById('new_qty_unit').value,
      notes: document.getElementById('notes').value,
      categories: Array.from(
        document.querySelectorAll('.cat_tag')
      ).map((item) => [item.value, item.checked])
    };
  
    console.log(new_item);
  
    document.getElementById('new_item').style.display = 'none';
    document.getElementById('new_food').value = '';
    document.getElementById('new_qty').value = '';
    document.getElementById('new_qty_unit').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('old_img').src = 'inventory/no_img.png';
    document.getElementById('old_img').style.width = '100px';
    document.querySelectorAll('.diet_tag').forEach(function (item, index) {
      item.checked = false;
    });
    document.querySelectorAll('.cat_tag').forEach(function (item, index) {
      item.checked = false;
    });
  
    // add element
    var child = document.createElement('li');
    child.innerHTML =
      '<div class="card"> <img src=' +
      new_item.img_src +
      ' alt="Avatar" /> <div class="container"> <h4><b>' +
      new_item.food_name +
      '</b></h4> </div> </div>';
    new_item.categories.forEach(function (category) {
      if (category[1]) {
        var lst = document.getElementById(category[0]);
        lst.insertBefore(child, lst.lastElementChild);
      }
    });
  
    items.appendChild(new_item);
  }
  
  function add_listen_remove(item, index) {
    item.onclick = done;
  }
  
  document.querySelectorAll('.done').forEach(add_listen_remove);
  
  function cancel() {
    document.getElementById('new_item').style.display = 'none';
    document.getElementById('new_food').value = '';
    document.getElementById('new_qty').value = '';
    document.getElementById('new_qty_unit').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('old_img').src = 'inventory/no_img.png';
    document.getElementById('old_img').style.width = '100px';
    document.querySelectorAll('.diet_tag').forEach(function (item, index) {
      item.checked = false;
    });
    document.querySelectorAll('.cat_tag').forEach(function (item, index) {
      item.checked = false;
    });
  }
  
  function add_listen_cancel(item, index) {
    item.onclick = cancel;
  }
  
  document.querySelectorAll('.cancel').forEach(add_listen_cancel);
  