const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const subBotton = document.querySelector(".sub-botton");
const textInputField = document.querySelector("#inlineFormInput");
const cardParent = document.querySelector(".cardparent");

const setup = () => {
  subBotton.addEventListener("click", getCocktail);
};

async function getCocktail() {
  let endpoint = `${API_URL}${textInputField.value.replace(/\s+/g, "&")}`;
  if (endpoint === API_URL) {
    endpoint = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  }
  const response = await fetch(endpoint)
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      response.json().then(function (data) {
        displayCocktail(data);
      });
    })
    .catch(function (err) {
      console.log("Fetch error!", err);
    });
}

function displayCocktail(cocktail) {
  cardParent.innerHTML = "";

  const cardMain = document.createElement("div");
  cardMain.classList.add("card");
  cardMain.classList.add("w-75");
  cardMain.classList.add("mx-auto");
  cardMain.classList.add("text-center");
  cardMain.classList.add("lightgray");

  const cardImage = document.createElement("img");
  cardImage.classList.add("card-img");
  cardImage.classList.add("responseimg");
  cardImage.classList.add("mx-auto");
  cardImage.src = cocktail.drinks[0].strDrinkThumb;
  cardImage.alt = "Cocktail Image";
  cardMain.appendChild(cardImage);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.classList.add("lightgray");
  cardMain.appendChild(cardBody);

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerHTML = cocktail.drinks[0].strDrink;
  cardBody.appendChild(cardTitle);

  cardUl = document.createElement("ul");
  cardUl.classList.add("list-group");
  cardBody.appendChild(cardUl);

  for (let i = 1; i < 16; i++) {
    if (cocktail.drinks[0][`strIngredient${i}`] == null) {
      break;
    }

    let ingredients = document.createElement("li");
    ingredients.classList.add("list-group-item");
    ingredients.classList.add("lightgray");
    ingredients.innerHTML =
      cocktail.drinks[0][`strMeasure${i}`] +
      ": " +
      cocktail.drinks[0][`strIngredient${i}`];
    cardUl.appendChild(ingredients);
  }

  cardParent.appendChild(cardMain);
}
setup();
