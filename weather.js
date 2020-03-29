
var APIkey = "26380ee9716d4fdb6448189dec7b87c1" //for weather forecast

//global varaible for city local storage
var cityStorage= [];


function weatherAPI(cityname){  //...YOUR CODE HERE... 
var queryURL= "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + APIkey; //cityname

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
    //lat 
    var lat= (response.coord.lat);
    //lon
    var lon= (response.coord.lon);
    // Log the queryURL
    console.log(queryURL);

    $(".uv").empty();
    uvIndex(lat,lon);
    

    //transfer to HTML
    $(".city").text(" "+ response.name + " Weather Details");
    $(".wind").text("Wind Speed: " + response.wind.speed + " mph");
    $(".humidity").text("Humidity: " + response.main.humidity + "%");

     // Convert the temp to fahrenheit
     var tempF = (response.main.temp - 273.15) * 1.80 + 32;

     // add temp content to html
     $(".temp").text("Temperature (K) " + response.main.temp + " K");
     $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

     // Log the data in the console as well
     console.log("Wind Speed: " + response.wind.speed);
     console.log("Humidity: " + response.main.humidity);
     console.log("Temperature (F): " + tempF);
   });

}

function forecastAPI(cityname){
   var APIkey = "afab4ed2090fc1662f70339948775475";
   var queryURL= "http://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=" + APIkey;

   
   $.ajax({
       url: queryURL,
       method: "GET"
    }).then(function(response){


        //transfer to HTML
        //$(".dt_txt").text("Date: " + response.dt_txt);
        //$(".maintemp").text("Temperature: " + response.main.temp);
        //$(".mainhumidity").text("Humidity: " + response.main.humidity);



        $(".FiveDay").empty();
        //console.log(response.list);
        $(".FiveDay").html("<div class='row'>") //adding a row before the loop
        for(i=0; i<response.list.length; i++) {
            if(response.list[i].dt_txt.indexOf("12:00:00")!== -1) { //had 40 items, finding the text that has "12:00:00"
            console.log(response.list[i].dt_txt)/
            console.log(response.list[i]);
            console.log(response.list[i].main.temp);
            console.log(response.list[i].main.humidity);

            //var weathericon
            //var iconCode = data.weather[0].icon
            //$(".icon").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>");

            //creating variables for divs, creating the HTML elements where the info will be added to
            var card= $("<div>").addClass("card text-black"); //bootstrap classes
            var cardBody= $("<div>").addClass("card-body p-2"); //bootstrap classes
            var column= $("<div>").addClass("col-md-2"); 

            var tdate= new Date(response.list[i].dt_txt);
            console.log(tdate);
            var date= $("<h5>").addClass("card-title").text("Date: " + tdate.toLocaleDateString());
            //$(".dt_txt").append("Date: ", response.list[i].dt_txt);

            //var maintemp= (response.list[i].main.temp);
            //$(".maintemp").append("Temperature: ", response.list[i].main.temp);

            var tempFaren = (response.list[i].main.temp - 273.15) * 1.80 + 32;
            //console.log("Temperature (F): " + tempFaren);
            var temperature=$("<p>").addClass("card-text").text("Temperature (F) " + tempFaren.toFixed(2));
            

            var humidity= (response.list[i].main.humidity);
            var humid= $("<p>").addClass("card-text").text("Humidity: " + humidity);

            //weather icons
            var myicon= (response.list[i].weather[0].icon)  //list[i] is used because we're in a loop. we're finidng where the index is, we're trying to find the position in the array.
            console.log(myicon);
            var iconsrc = `http://openweathermap.org/img/wn/${myicon}@2x.png`
            var weatherIcon= $("<img>").attr("src", iconsrc);

            //$(".mainhumidity").append("Humidity: ", response.list[i].main.humidity);
            column.append(card.append(cardBody.append(date, temperature, humid, weatherIcon)));
            $(".FiveDay .row").append(column); //row-column grid system
            
            }

        }

      

    
        
    });

}

$(".btn").click(function(){
    var city = $("#city").val().trim() // input field : period= class, #= ID, (nothing)= html element i.e. button
    weatherAPI(city); //calling the function: weather & forecast 
    forecastAPI(city);
    var cityLocal= JSON.parse(window.localStorage.getItem("cities"))||[];
    //local to citystorage
    cityStorage= [];
    cityLocal.push(city);
    

    //cityStorage.push(cityLocal);
    window.localStorage.setItem("cities", JSON.stringify(cityLocal));
    //selector of the input field .valtrim
    var cityLocal= JSON.parse(window.localStorage.getItem("cities"));
    for (i=0; i<savedCities.length; i++){
        var savedCities= $("<li>").text(cityLocal[i]);
    $(".savedCities").append(savedCities);
    }
});
//creating function for cities when the page loads
function load(){
    var loadedCities= JSON.parse(window.localStorage.getItem("cities"));
        console.log(loadedCities);
    for (i=0; i<loadedCities.length; i++){
            console.log(loadedCities[i]);
        var p= $("<li>");
    //append to ul(Parent), set the inside of the <li> to be the name of the city
        p.text(loadedCities[i]);
        //append to ul(parent)

    }
}
load();


function uvIndex(lat,lon){
    var queryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${APIkey}&lat=${lat}&lon=${lon}` //this is a string literal (characters are called "graves mark");
    $.ajax({
        url: queryURL,
        method: "GET"
     }).then(function(response){
    console.log(response.value);
    
    $(".uv").append("UVIndex ",response.value);
    });

}


