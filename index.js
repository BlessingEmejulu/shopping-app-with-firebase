import {initializeApp}  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue}  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopping-cat-7984d-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

const shoppingListInDB = ref(database, "shopping-list")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
     
    push(shoppingListInDB, inputValue)

    clearInputFieldEl()
  })

    onValue(shoppingListInDB, function(snapshot) {
      clearShoppingListEl()
      let itemArray = Object.values(snapshot.val())
      
    
      for (let i = 0; i < itemArray.length; i++) {
        appendItemToShoppingListEl(itemArray[i])
      }
    })


    function clearShoppingListEl() {
      shoppingListEl.innerHTML = ""
  }
  
function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}