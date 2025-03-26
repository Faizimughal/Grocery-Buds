let clearBtn = document.getElementById("clear");
let items = document.getElementById("items");
let submitBtn = document.getElementById("submit");
let input = document.getElementById("input");

// Initialize from localStorage if available
let groceryList = JSON.parse(localStorage.getItem("groceryList")) || [];

// Display existing items on load
function displayItems() {
  items.innerHTML = groceryList
    .map(
      (item, index) => `
    <ul>
      <li class="item" data-id="${index}">
        <span class="text">${item}</span>
        <div class="buttons">
          <button class="edit-btn"><i class="fa fa-edit"></i></button>
          <button class="delete-btn"><i class="fa fa-trash"></i></button>
        </div>
      </li>
    </ul>
  `
    )
    .join("");

  clearBtn.style.display = groceryList.length ? "block" : "none";
}

// Add new item
function addItem() {
  const value = input.value.trim();
  if (!value) return; // Don't add empty items

  groceryList.push(value);
  localStorage.setItem("groceryList", JSON.stringify(groceryList));
  input.value = "";
  displayItems();
}

// Event delegation for dynamic buttons
items.addEventListener("click", (e) => {
  const itemEl = e.target.closest(".item");
  if (!itemEl) return;

  const index = itemEl.dataset.id;

  // Delete button
  if (e.target.closest(".delete-btn")) {
    groceryList.splice(index, 1);
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
    displayItems();
  }

  // Edit button
  if (e.target.closest(".edit-btn")) {
    const newValue = prompt("Edit item:", groceryList[index]);
    if (newValue !== null) {
      groceryList[index] = newValue.trim();
      localStorage.setItem("groceryList", JSON.stringify(groceryList));
      displayItems();
    }
  }
});

// Submit handler
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addItem();
});

// Clear all items
clearBtn.addEventListener("click", () => {
  groceryList = [];
  localStorage.removeItem("groceryList");
  displayItems();
});

// Allow Enter key to submit
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addItem();
  }
});

// Initial display
displayItems();
