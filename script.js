/*
The array is used to store the user's favorite meals.
*/
if (localStorage.getItem("myFavMeals") == null) {
  localStorage.setItem("myFavMeals", JSON.stringify([]));
}
showMealList();
/* This code fetches meals from an API and returns them */
async function fetchMealsFromApi(url, value) {
  const response = await fetch(`${url + value}`);
  const meals = await response.json();
  return meals;
}
// This displays meal items in the display area.
function showMealList() {
  let name = document.getElementById('name');
  let inputValue = document.getElementById("inputhere").value;
  let arr = JSON.parse(localStorage.getItem("myFavMeals"));
  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  let html = "";
  let meals = fetchMealsFromApi(url, inputValue);
  console.log(meals)
  meals.then(data => {
    if (data.meals) {
      data.meals.forEach((element) => {
        let isFav = false;
        for (let index = 0; index < arr.length; index++) {
          if (arr[index] == element.idMeal) {
            isFav = true;
          }
        }
        if (isFav) {
          html += `
                    <div id="cards">
                        <img id="card-img" src="${element.strMealThumb}" alt="">
                        <h3>${element.strMeal}</h3>
                            <div id="details-like">
                                <button onclick="showMealDetails(${element.idMeal})">more details</button>
                                <span id="${element.idMeal}"><img src="Assets/heart-solid.svg" id='like-img' alt=""  onclick="addRemoveToFavList(${element.idMeal})"></span>
                            </div>      
                    </div> 
                  `;
        } else {
          html += `
                    <div id="cards">
                    <img id="card-img" src="${element.strMealThumb}" alt="">
                    <h3>${element.strMeal}</h3>
                        <div id="details-like">
                            <button onclick="showMealDetails(${element.idMeal})">more details</button>
                            <span id="${element.idMeal}"><img src="Assets/heart-regular.svg" id='like-img' alt="" onclick="addRemoveToFavList(${element.idMeal})" onclick="changeIcon()"></span>
                        </div>      
                </div> 
                  `;
        }
      });
    } else {
      html += `

              <div id="moreDetails">
                <div id="about">
                  <h3>The meal you are looking for was not found.</h3>
                </div>
              </div>
              `;
    }
    document.getElementById("display").innerHTML = html;
  });
}

function changeIcon() {
  var image = document.getElementById('like-img')
  if (image.src = 'Assets/heart-regular.svg') {
    image.src = 'Assets/heart-solid.svg';
  }
  else {
    image.src = 'Assets/heart-regular.svg';
  }
}

// This function fetches and displays meal details
async function showMealDetails(id) {
  let name = document.getElementById('name');
  let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  let html = "";
  name.innerHTML = 'More Details:'
  await fetchMealsFromApi(url, id).then(data => {
    html += `
      <div id="moreDetails">
        <div id='moreDetails-1'>
          <div id="meal-img"><img src="${data.meals[0].strMealThumb}"></div>
          <div id="meal-headings">
          <h2>${data.meals[0].strMeal}</h2>
          <h4>Category : ${data.meals[0].strCategory}</h4>
          <h4>Area : ${data.meals[0].strArea}</h4>
          <div id='details-like'>
          <button id='wide-button'><a href="${data.meals[0].strYoutube}" target="_blank" ;">Watch Video</a></button>
          </div>
          
          </div>
        </div>
        <div id="discription">
        <h3>Instruction :</h3>
        <p>${data.meals[0].strInstructions}</p>
        </div>
      </div>
          `;
  });
  document.getElementById("display").innerHTML = html;
}


// This displays all the favorite meals
async function showFavMealList() {
  let arr = JSON.parse(localStorage.getItem("myFavMeals"));
  let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  let html = "";
  let name = document.getElementById('name');
  if (arr.length == 0) {
    html += `
              <div id="moreDetails">
                  <div id="about">
                    <h3>Not added any Favourite meal.</h3>
                  </div>
              </div>
              `;
  } else {
    for (let index = 0; index < arr.length; index++) {
      await fetchMealsFromApi(url, arr[index]).then(element => {
        html += `
                    <div id="cards">
                        <img id="card-img" src="${element.meals[0].strMealThumb}" alt="">
                        <h3>${element.meals[0].strMeal}</h3>
                            <div id="details-like">
                                <button onclick="showMealDetails(${element.meals[0].idMeal})">more details</button>
                                <span id="${element.meals[0].idMeal}"><img src="Assets/heart-solid.svg" id='like-img' alt=""  onclick="addRemoveToFavList(${element.meals[0].idMeal})"></span>
                            </div>      
                    </div> 
                  `;
      });
    }
  }
  document.getElementById("display").innerHTML = html;
}

// This function allows users to add and remove meals to/from their favorites list
async function addRemoveToFavList(id) {
  let arr = JSON.parse(localStorage.getItem("myFavMeals"));
  let contain = false;
  for (let index = 0; index < arr.length; index++) {
    if (id == arr[index]) {
      contain = true;
    }
  }
  if (contain) {
    let number = arr.indexOf(id);
    arr.splice(number, 1);
    alert("your meal removed from your favourites list");

  } else {
    arr.push(id);
    alert("your meal add your favourites list");


  }
  localStorage.setItem("myFavMeals", JSON.stringify(arr));
  showMealList();
  showFavMealList();

}

