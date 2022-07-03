// Random Integer generator
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Click event
document.querySelector('button').addEventListener('click', getRecipes)

const API_KEY = 'apiKey=24c0bd5bb375442eaea2d723edbec123'
const API_URL = `https://api.spoonacular.com/recipes/findByIngredients?${API_KEY}`


// Function making two requests
function getRecipes(){
  const protein = document.querySelector('#protein').value
  let veggies = document.getElementById('veggies').value
  const url = API_URL + '&ingredients=' + protein + ',+' + veggies + '&number=20'


  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        // Use random integer generator to produce 3 numbers between 1 and 19
        let recipe0 = getRandomInt(19)
        let recipe1 = getRandomInt(19)
        let recipe2 = getRandomInt(19)

        // Add recipe titles to h2 using random value variables for index array
        document.querySelector('#recipe0').innerText = data[recipe0].title
        document.querySelector('#recipe1').innerText = data[recipe1].title
        document.querySelector('#recipe2').innerText = data[recipe2].title

        // For loop that creates hyperlinks for returned recipes
        for (let i = 0; i <= 2; i++){

          // Assign recipe ID's to function-wide variables
          let recipeID = data[i].id

          // Fetch Recipe URLs 
          fetch(`https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=24c0bd5bb375442eaea2d723edbec123`)
            .then(res => res.json())
            .then(data => {
              let recipeURL = data.sourceUrl

              // Add recipe URL to title
              document.getElementById(`recipe${i}Link`).href = recipeURL
            })
            .catch(err => {
              console.log(err)
            })
        }    
      }) 
      .catch(err => {
          console.log(`error ${err}`)
      })
}

getRecipes()