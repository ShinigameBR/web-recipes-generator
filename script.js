let searchBtn = document.getElementById("search-button")
let userInput = document.getElementById("user-input").value
let result = document.getElementById("result")
let url= "https://www.themealdb.com/api/json/v1/1/search.php?s="

searchBtn.addEventListener('click', () => {
    let userInput = document.getElementById("user-input").value
    if(userInput.length == 0){
        result.innerHTML =  `<h3>Input Can't be Empty!</h3>`
    }else{
        fetch(url + userInput).then(response => response.json()).then((data) => {
            let myMeal = data.meals[0]
            let count = 1
            let ingredients = []
            for (const i in myMeal) {
                if (i.startsWith("strIngredient") && myMeal[i]) {
                    ingredient = myMeal[i]
                    measure = myMeal[`strMeasure` + count]
                    count++
                    ingredients.push(`${measure} ${ingredient}`)
                }
            }
            result.innerHTML = `
                <img src="${myMeal.strMealThumb}" alt=${myMeal.strMeal}" />
                <div class="details">
                    <h2>${myMeal.strMeal}</h2>
                    <h4>${myMeal.strArea}</h4>
                </div>
                <div id="ingredient-con"></div>
                <div id="recipe">
                    <button id="hide-recipe">X</button>
                    <pre id="instructions">${myMeal.strInstructions}</pre>
                </div>
                <button id="show-recipe">View Recipe</button>
            `
            let ingredientCon = document.getElementById("ingredient-con")
            let parent = document.createElement("ul")
            let recipe = document.getElementById("recipe")
            let hideRecipe = document.getElementById("hide-recipe")
            let showRecipe = document.getElementById("show-recipe")
            ingredients.forEach((i) => {
                let child = document.createElement("li")
                child.innerText = i
                parent.appendChild(child)
                ingredientCon.appendChild(parent)
            })
            hideRecipe.addEventListener('click', () => {
                recipe.style.display = "none"
            })
            showRecipe.addEventListener('click', () => {
                recipe.style.display = "block"
            })
        }).catch(() => {
            result.innerHTML =  `<h3>Invalid Input!</h3>`
        })
    }
})