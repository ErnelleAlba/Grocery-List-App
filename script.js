//  SELECT ITEMS
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// SUBMIT FORM
form.addEventListener("submit", addItem);
// CLEAR LIST
clearBtn.addEventListener("click", clearItems);

// FUNCTIONS

// ADD ITEM
function addItem(obj) {
  obj.preventDefault();
  const value = grocery.value;
  if (value) {
    const element = document.createElement("article");
    element.classList.add("grocery-item");
    element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;

    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);

    // append child
    list.appendChild(element);
    // display alert
    displayAlert("item added to the list", "success");
  } else {
    displayAlert("please enter value", "danger");
  }
  grocery.value = "";
}


// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  displayAlert("empty list", "danger");
  localStorage.removeItem("list");
}

// delete item

function deleteItem(obj) {
  const element = obj.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);

  displayAlert("item removed", "danger");
}


