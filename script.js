let clearBtn = document.getElementById("clear");
let items = document.getElementById("items");
let submitBtn = document.getElementById("submit");
let input = document.getElementById("input");

window.addEventListener("DOMContentLoaded", () => {
  clearBtn.style.display = "none";
});

submitBtn.addEventListener("click", () => {
  clearBtn.style.display = "block";
  let value = input.value;
  return (items.innerHTML += `<ul><li>
        <span class="text">${value}</span>
        <div class="buttons">
        <button><i class="fa fa-edit"></i></button>
        <button><i class="fa fa-trash"></i></button>
        </div>
        </li>
        </ul>`);
});

clearBtn.addEventListener("click", () => {
  items.innerHTML = "";
});
