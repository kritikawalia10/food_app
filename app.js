let parsedData;


function randomFood() {
    const image = document.getElementById("image");
    const dish = document.getElementById("dish");

    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((response) => response.json())
        .then((data) => {
            parsedData = data;
            console.log(parsedData);

            showFood(image, dish);

            if (parsedData.meals && parsedData.meals.length > 0) {
                clickMeal();
            } else {
                console.error("No meal can be displayed");
            }
        })
        .catch((error) => console.error("Error!", error));
}

function showFood(imgEle, dishElement) {
    imgEle.innerHTML = `<img src="${parsedData.meals[0].strMealThumb}" onclick="modalOpens()">`;
    dishElement.innerHTML = `<h3>${parsedData.meals[0].strMeal}</h3>`;
}


function clickMeal() {
    const image = document.getElementById("image");
    image.onclick = modalOpens;
}


function loading() {
    const input = document.getElementById("search");
    const value = input.value.trim();
    const catBox = document.getElementById("list");

    catBox.innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
        .then((response) => response.json())
        .then((dataParsed) => {
            console.log(dataParsed);

            if (dataParsed.meals && dataParsed.meals.length > 0) {
                showResult(dataParsed.meals, catBox);
            } else {
                catBox.innerHTML = "Invalid Search";
            }
        })
        .catch((error) => console.error(error));
}


function showResult(meals, container) {
    for (const meal of meals) {
        const cont = document.createElement("div");
        const imgEle = document.createElement("img");
        const names = document.createElement("h4");

        imgEle.src = meal.strMealThumb;
        names.textContent = meal.strMeal;

        cont.appendChild(imgEle);
        cont.appendChild(names);

        container.appendChild(cont);
    }
}


function modalOpens() {
    const modal = document.getElementById("modal");
    const ingList = document.getElementById("Ilist");

    ingList.innerHTML = "";

    if (parsedData && parsedData.meals && parsedData.meals.length > 0) {
        const meal = parsedData.meals[0];
        const ings = ingArray(meal);

        for (const ingredient of ings) {
            const listItem = document.createElement("li");
            listItem.textContent = ingredient;
            ingList.appendChild(listItem);
        }

        modal.style.display = "block";
    } else {
        console.error("Not Available");
    }
}


function ingArray(meal) {
    const ings = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const level = meal[`strMeasure${i}`];

        if (ingredient && level) {
            ings.push(`${level.trim()} ${ingredient.trim()}`);
        }
    }
    return ings;
}


function modalClose() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}


window.onclick = function (e) {
    const modal = document.getElementById("modal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
};


randomFood();
