// Selectors
// var email = $("#inputEmail").val().trim();
// var password = $("#inputPassword").val().trim();
// var confPassword = $("#inputConfirmPassword").val().trim();
// var address = $("#inputAddress").val().trim();
// var city = $("#inputCity").val().trim();
// var state = $("#inputState").val().trim();
// var zip = $("#inputZip").val().trim();

// The values below will be pulled from our location query
var originLat = "34.02517";
var originLong = "-118.47488";
var destLat = "34.06877";
var destLong = "-118.44896";


var address = "2029 olympic blvd santa monica, ca 90404"

// This is our API key. Add your own API key between the ""
var weatherAPI = "265a46d65db9c9a8b164aa9180136f67";
var mapsAPI = "OEeXUFJsMGPGX6jvueAh5pJ2YyUCzbay";
var restAPI = "DOF99u8HLWYBY7XS57PcCuQ6aJdh0eWYQVSSRXCj3oWg-OPD8t6QIKTHMkbL-uuJhmVNE-by-DG2tz7bQndWFBjgc_-AF1wbFUD2tLDFQNVrUmAsEHRnJVzA_gZZXHYx";
var cityName = "burbank";

// Here we are building the URL we need to query the weather database
var weatherQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",us&appid=" + weatherAPI;

// AJAX call for weather
$.ajax({
  url: weatherQuery,
  method: "GET"
}).then(function(response) {

  // Create CODE HERE to Log the weatherQuery
  console.log(weatherQuery)
  // Create CODE HERE to log the resulting object
  console.log(response)
})

// Buidling the URL to query the TomTom map search database
var locationQuery = "https://api.tomtom.com/search/2/geocode/" + address + ".JSON?countrySet=us&key=" + mapsAPI;

// AJAX call for location
$.ajax({
    url: locationQuery,
    method: "GET"
  }).then(function(response) {
  
    // Create CODE HERE to Log the locationQuery
    console.log(locationQuery)
    // Create CODE HERE to log the resulting object
    console.log(response)
  })

// Buidling the URL to query the TomTom database for route duration
var durationQuery = "https://api.tomtom.com/routing/1/calculateRoute/" + originLat + "," + originLong + ":" + destLat + "," + destLong +"/json?&key=" + mapsAPI;

// AJAX call for location
$.ajax({
    url: durationQuery,
    method: "GET"
  }).then(function(response) {
  
    // Create CODE HERE to Log the locationQuery
    console.log(durationQuery)
    // Create CODE HERE to log the resulting object
    console.log(response)
  })

// Buidling the URL to query the TomTom database for route duration
var restaurantQuery = "https://api.yelp.com/v3/businesses/search" + originLat + "," + originLong + ":" + destLat + "," + destLong +"/json?&key=" + mapsAPI;

// AJAX call for location
$.ajax({
    url: restaurantQuery,
    method: "GET"
  }).then(function(response) {
  
    // Create CODE HERE to Log the locationQuery
    console.log(durationQuery)
    // Create CODE HERE to log the resulting object
    console.log(response)
  })


$(document).ready(function(){
    $(".sign-in-select").on("click", function(){
        console.log($(this));
        $(this).css("color", "white");
        $(this).css("background-color", "#007bff");
        $(".sign-up-select").css("color", "black");
        $(".sign-up-select").css("background-color", "white");

        $(".exclusive").hide();

        $(".submit-btn").text("Sign In");
    });

    $(".sign-up-select").on("click", function(){
        console.log($(this));
        $(this).css("color", "white");
        $(this).css("background-color", "#007bff");
        $(".sign-in-select").css("color", "black");
        $(".sign-in-select").css("background-color", "white");

        $(".exclusive").show();

        $(".submit-btn").text("Sign Up");
    });
    
    // Hide new address on page load
    // $("#new-address").hide();

    // On click function to show address input for add event
    $("#add-location").change(function(){
        $("#new-address").show();
    });

    // On click function to hide address input for add event
    $("#default-location").change(function(){
      $("#new-address").hide();
  });
});
