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

function show(name) {
  document.getElementById('info').style.display = 'block';
  var food = items[name];

  document.getElementById('exst_food').value = food.food_name;
  document.getElementById('exst_qty').value = food.qty;
  document.getElementById('exst_qty_unit').value = food.qty_unit;
  document.getElementById('exst_notes').value = food.notes;
  document.getElementById('exst_old_img').src = food.img_src;
  document.getElementById('exst_old_img').style.width = '100%';

  var i = 0;
  labs = Array.from(document.querySelectorAll('.exst_diet_tag'));
  labs.forEach(function (item, index) {
    item.checked = food.labs[i];
    i++;
  });
  i = 0;
  cats = Array.from(document.querySelectorAll('.exst_cat_tag'));
  cats.forEach(function (item, index) {
    item.checked = food.categories[i];
    i++;
  });

  document.getElementById('exst_food').readOnly=true;

  function edit_info(item, index) {
    item.addEventListener('click', (event) =>
      ((arg) => {
        edit(arg);
      })(food.food_name)
    );
  }
  
  edit_info(document.getElementById('change'));
}

function show_info(item, index) {
  var food_name = item.children[1].children[0].children[0].innerText;
  item.addEventListener('click', (event) =>
    ((arg) => {
      show(arg);
    })(food_name)
  );
}

document.querySelectorAll('.small').forEach(show_info);

function close_box() {
  document.getElementById('info').style.display = 'none';
  cancel();
}

document.getElementById('close').onclick = close_box;


function upload() {
  document.getElementById('new_img').click();
  //document.getElementById('old_img').style.display = 'none';
}

let items = {
  Eggs: {
    food_name: 'Eggs',
    img_src: 'inventory/eggs.jpg',
    labs: [true, false, true, true, true, true, true],
    qty: 0,
    qty_unit: 'cnt',
    notes: '',
    categories: [true, false]
  },
  Milk: {
    food_name: 'Milk',
    img_src: 'inventory/milk.png',
    labs: [true, false, true, true, true, true, true],
    qty: 0,
    qty_unit: 'gal',
    notes: '',
    categories: [true, false]
  },
  Yoghurt: {
    food_name: 'Yoghurt',
    img_src: 'inventory/yoghurt.png',
    labs: [true, false, true, true, true, true, true],
    qty: 0,
    qty_unit: 'oz',
    notes: '',
    categories: [false, true]
  }
};

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
    categories: Array.from(document.querySelectorAll('.cat_tag')).map(
      (item) => [item.value, item.checked]
    )
  };

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
  new_item.categories.forEach(function (category) {
    if (category[1]) {
      var child = document.createElement('li');
      child.innerHTML =
        '<div class="card small"> <img src=' +
        new_item.img_src +
        ' alt="Avatar" /> <div class="container"> <h4><b>' +
        new_item.food_name +
        '</b></h4> </div> </div>';
      document.getElementById(category[0]).appendChild(child);
      show_info(child.children[0]);
    }
  });

  items[new_item.food_name] = new_item;
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

function edit(name) {
  let changed_item = {
    food_name: name,
    img_src: document.getElementById('exst_old_img').src,
    labs: Array.from(document.querySelectorAll('.exst_diet_tag')).map(
      (item) => item.checked
    ),
    qty: document.getElementById('exst_qty').value,
    qty_unit: document.getElementById('exst_qty_unit').value,
    notes: document.getElementById('exst_notes').value,
    categories: Array.from(document.querySelectorAll('.exst_cat_tag')).map(
      (item) => [item.value, item.checked]
    )
  };

  document.getElementById('info').style.display = 'none';

  console.log(changed_item);

  items[name] = changed_item;
}

function search(){
  alert("not yet implemented");
}

const element = document.querySelectorAll("input[type=text], textarea");
console.log(element)

function pop_up(element, idx) {
  element.addEventListener("focusin", function() {
    document.getElementById("fake-keyboard").style.display = "block";
  }); 
element.addEventListener("focusout", function() {
    document.getElementById("fake-keyboard").style.display = "none";
  }); 
}
element.forEach(pop_up)