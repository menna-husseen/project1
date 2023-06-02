$(document).ready(function () {
    $(".spinner").fadeOut(500, function () {
      $("#loading").fadeOut(500, function () {
        $("body").css("overflow", "auto");
      });
    });
  });


async function demo(){
  var data =await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772')

var result =await data.json()
console.log(result);
}
demo()



  // $(".open-close-icon").click(function () {
  //   let sideBarInnerWidth = $(".side-nav-menu").innerWidth();
    
  //   if (  $(".side-nav-menu").css('left')=='0px') {
  //     console.log(true) }
  //   //  $("#slideBar").animate({ left:-sideBarInnerWidth }, 1000);
  
  //   // } else {
  //   //   $("#slideBar").animate({ left:0}, 1000);
  //   // }
  // });

  function openSideNav() {
    $(".side-nav-menu").animate({
      left: 0
    }, 500)
  
    $(".side-nav-menu").css("backgroundColor",'black');
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
  
  
    for (let i = 0; i < 5; i++) {
      $(".links li").eq(i).animate({
        top: 0
      }, (i + 5) * 100)
    }
  }
  
function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
  $(".side-nav-menu").animate({
    left: -boxWidth
  }, 500)

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");


  $(".links li").animate({
    top: 300
  }, 500)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav()
  } else {
    openSideNav()
  }
})


function getAllCategory() {
  var settings = {
    "url": "https://www.themealdb.com/api/json/v1/1/categories.php",
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    drowCategory(response.categories)
  });
}

function drowCategory(array) {
  rowData.innerHTML = ""
  $(".inner-loading-screen").fadeIn(300)
  searchContainer.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    let div = ` <div class="col-md-3">
                  <div onclick="getCategoryMeals('${element.strCategory}')" 
                  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                      <img class="w-100" src="${element.strCategoryThumb}" alt="" srcset="">
                      <div class="meal-layer position-absolute text-center text-black p-2">
                          <h3>${element.strCategory}</h3>
                          <p>${element.strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                      </div>
                  </div>
              </div>`
    rowData.innerHTML += div
  }
  $(".inner-loading-screen").fadeOut(300)
}
function getAllAreas() {
  var settings = {
    "url": "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    drowArea(response.meals)
  });
}

function drowArea(array) {
  rowData.innerHTML = ""
  $(".inner-loading-screen").fadeIn(300)
  searchContainer.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    let div = `<div class = "col-md-3">
                  <div  class="meal position-relative overflow-hidden rounded-2 cursor-pointer"  onclick="getAreaMeals('${element.strArea}')"> 
                  <i class = "fa-solid fa-house-laptop fa-4x"></i>
                      <h3>${element.strArea}</h3>
                  </div> 
              </div>`
    rowData.innerHTML += div
  }
  $(".inner-loading-screen").fadeOut(300)
}

function getAllIngredients() {
  var settings = {
    "url": "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    drowIngredient(response.meals.slice(0, 20))
  });
}

function drowIngredient(array) {
  rowData.innerHTML = ""
  $(".inner-loading-screen").fadeIn(300)
  searchContainer.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    let div = "<div class = 'col-3'> <h3>" + element.strIngredient + "</h3> <p>" + element.strDescription.split(" ").slice(0, 20).join(" ") + "</p> </div>"
    rowData.innerHTML += div
  }
  $(".inner-loading-screen").fadeOut(300)
}

function searchByName(value) {
  var settings = {
    "url": "https://www.themealdb.com/api/json/v1/1/search.php?s=" + value,
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    drowMeals(response.meals)

    $(".loading-screen").fadeOut(500)
    $("body").css("overflow", "visible")
  });
}
function searchByFLetter(value) {
  var settings = {
    "url": "https://www.themealdb.com/api/json/v1/1/search.php?f=" + value,
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    drowMeals(response.meals)
  });
}


function displayInputSearch() {
  rowData.innerHTML = ""
  searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

  rowData.innerHTML = ""
}


function drowMeals(array) {
  rowData.innerHTML = ""
  $(".inner-loading-screen").fadeIn(300)
  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    let div = `<div class='col-3'>
               <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer" onclick="getDetails('${element.idMeal}')">
               <img class="w-100" src="${element.strMealThumb}" alt="" class='img-thumbnail'>
               <div class="meal-layer position-absolute text-center text-black p-2">
                  <h3>${element.strMeal}</h3>
                 </div>
            </div>`
    rowData.innerHTML += div
  }
  $(".inner-loading-screen").fadeOut(300)
}

function getCategoryMeals(value) {
  var settings = {
    "url": "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + value,
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    drowMeals(response.meals)
  });
}

function getAreaMeals(value) {
  var settings = {
    "url": "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + value,
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    drowMeals(response.meals)
  });
}

function getDetails(value) {
  var settings = {
    "url": "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + value,
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response.meals);
    drowDetails(response.meals)
  });
}

function drowDetails(array) {
  rowData.innerHTML = ""
  $(".inner-loading-screen").fadeIn(300)
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    let listStrang = ""
    for (let i = 1; i <= 20; i++) {
      if (element['strMeasure' + i] && element['strIngredient' + i]) {
        listStrang += `<li class="alert alert-info m-2 p-1">${element['strMeasure' + i]} ${element['strIngredient' + i]} </li>`
      }
    }
    debugger;
    let arrTags = element.strTags.split(',')
    let listStrangTags = ""

    for (let i = 0; i < arrTags.length; i++) {
      const elementTag = arrTags[i];
      if (elementTag) {
        listStrangTags += `<li class="alert alert-danger m-2 p-1">${elementTag} </li>`
      }
    }
    let div = ` <div class="col-4">
  <img class="rounded" src="${element.strMealThumb}" alt="" width="100%">
  <h3>${element.strMeal}</h3>
</div>
<div class="col-8">
  <h3>Instructions</h3>
  <p>${element.strInstructions}</p>
  <h3>Area : ${element.strArea}</h3>
  <h3>Category : ${element.strCategory}</h3>
  <h3>Recipes : </h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">
   ${listStrang}
  </ul>
  <h3>Tags : </h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${listStrangTags}
  </ul>
  <a target="_blank" href="${element.strSource}" class="btn btn-success">Source</a>
  <a target="_blank" href="${element.strYoutube}" class="btn btn-danger">Youtube</a>
</div> `
    rowData.innerHTML += div
  }
  $(".inner-loading-screen").fadeOut(300)

}