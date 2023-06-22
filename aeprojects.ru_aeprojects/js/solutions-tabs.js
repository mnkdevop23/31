let solutionsButton1 = document.getElementById("solutions__button1");
let solutionsButton2 = document.getElementById("solutions__button2");

let solutionsText1 = document.getElementById("solutions__text1");
let solutionsText2 = document.getElementById("solutions__text2");

let solutionsImg = document.getElementById("solutions__img");


function firstSolution(){
    solutionsButton1.classList.add("solutions__button--active")
    solutionsButton2.classList.remove("solutions__button--active")

    solutionsText1.style.display = "block"
    solutionsText2.style.display = "none"

    solutionsImg.setAttribute("src", "img/solutions-img.png")
}

function secondSolution(){
    solutionsButton1.classList.remove("solutions__button--active")
    solutionsButton2.classList.add("solutions__button--active")

    solutionsText1.style.display = "none"
    solutionsText2.style.display = "block"

    solutionsImg.setAttribute("src", "img/solutions-img2.jpg")
}