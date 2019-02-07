// // Selectors
// // var email = $("#inputEmail").val().trim();
// // var password = $("#inputPassword").val().trim();
// // var confPassword = $("#inputConfirmPassword").val().trim();
// // var address = $("#inputAddress").val().trim();
// // var city = $("#inputCity").val().trim();
// // var state = $("#inputState").val().trim();
// // var zip = $("#inputZip").val().trim();

// // The values below will be pulled from our location query
// var originLat = "34.02517";
// var originLong = "-118.47488";
// var destLat = "34.06877";
// var destLong = "-118.44896";


// var address = "2029 olympic blvd santa monica, ca 90404"

// This is our API key. Add your own API key between the ""
// var weatherAPI = "265a46d65db9c9a8b164aa9180136f67";
// var mapsAPI = "OEeXUFJsMGPGX6jvueAh5pJ2YyUCzbay";
// var restAPI = "DOF99u8HLWYBY7XS57PcCuQ6aJdh0eWYQVSSRXCj3oWg-OPD8t6QIKTHMkbL-uuJhmVNE-by-DG2tz7bQndWFBjgc_-AF1wbFUD2tLDFQNVrUmAsEHRnJVzA_gZZXHYx";
// var cityName = "burbank";

// // // Here we are building the URL we need to query the weather database
// var weatherQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",us&appid=" + weatherAPI;

// // AJAX call for weather
// $.ajax({
//   url: weatherQuery,
//   method: "GET"
// }).then(function(response) {

//   // Create CODE HERE to Log the weatherQuery
//   console.log(weatherQuery);
//   // Create CODE HERE to log the resulting object
//   console.log(response);
//   response.list.forEach(function(value){
//     //   console.log(value.weather["0"].main);
//     console.log(moment(value.dt_txt, "YYYY-MM-DD hh:mm:ss").format("YYYY-MM-DD hh:mm:ss"));
//   })
    
// })


// // Buidling the URL to query the TomTom map search database
// var locationQuery = "https://api.tomtom.com/search/2/geocode/" + address + ".JSON?countrySet=us&key=" + mapsAPI;

// // AJAX call for location
// $.ajax({
//     url: locationQuery,
//     method: "GET"
//   }).then(function(response) {
  
//     // Create CODE HERE to Log the locationQuery
//     console.log(locationQuery)
//     // Create CODE HERE to log the resulting object
//     console.log(response)
//   })

// // Buidling the URL to query the TomTom database for route duration
// var durationQuery = "https://api.tomtom.com/routing/1/calculateRoute/" + originLat + "," + originLong + ":" + destLat + "," + destLong +"/json?&key=" + mapsAPI;

// // AJAX call for location
// $.ajax({
//     url: durationQuery,
//     method: "GET"
//   }).then(function(response) {
  
//     // Create CODE HERE to Log the locationQuery
//     console.log(durationQuery)
//     // Create CODE HERE to log the resulting object
//     console.log(response)
//   })

// // Buidling the URL to query the TomTom database for route duration
// var restaurantQuery = "https://api.yelp.com/v3/businesses/search" + "/json?&key=" + mapsAPI;

// // AJAX call for location
// $.ajax({
//     url: restaurantQuery,
//     method: "GET"
//   }).then(function(response) {
  
//     // Create CODE HERE to Log the locationQuery
//     console.log(durationQuery)
//     // Create CODE HERE to log the resulting object
//     console.log(response)
//   })


$(document).ready(function(){
    // Initialize Firebase
  var config = {
      apiKey: "AIzaSyCxFLkeQbYJRU5z5b2nOBCIgz3-XeJpA_4",
      authDomain: "calendar-app-47185.firebaseapp.com",
      databaseURL: "https://calendar-app-47185.firebaseio.com",
      projectId: "calendar-app-47185",
      storageBucket: "calendar-app-47185.appspot.com",
      messagingSenderId: "753398671721"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // database.ref('charlieglass').set({
  //     msg: 'Hello'
  // });

  // database.ref('charlieglass').on("value", function(snapshot){
  //     console.log(snapshot.val().msg);
  // });


  // function create_user(email, password){
  //     firebase.auth().createUserWithEmailAndPassword(email, password).catch(onResolve, onReject) {
  //         // Handle Errors here.
  //         ;
  //     };

  // }
  function create_user(email, password){
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          $(".modal-body").text(errorMessage);
          $("#myModal").modal('show');
          $("#myModal").modal('show');
          
          $("#inputName").val("");
          $("#inputEmail").text("");
          $("#inputPassword").val("");
          $("#inputConfirmPassword").val("");
          $("#inputAddress").val("");
          $("#inputCity").val("");
          $("#inputState").val("");
          $("#inputZip").val("");


        });
  }

  function sign_in(email, password){
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          $(".modal-body").text(errorMessage);
          $("#myModal").modal('show');
          $("#myModal").modal('show');
          
          $("#inputEmail").text("");
          $("#inputPassword").val("");

        });
  }


  function location_verification(zip){
      var len = "hello";
      queryURL = "http://api.geonames.org/postalCodeSearchJSON?postalcode=" + zip + "&maxRows=10&username=charles.glass";
      $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
              console.log(response);
              localStorage.clear();
              localStorage.setItem("len", response.postalCodes.length);
      });
      console.log(zip.length);
      console.log(len);
      if ((zip.length == 5) && (localStorage.getItem("len")> 0)){
          console.log("The length is definitely 5");
          return true;
      }
      else{
          console.log("no it's not");
          return false;
      }
  }

  function city_state_name_verification(city, state, name){
      if ((city.length > 0) && (state.length > 0) && (name.length > 0)){
          return true;
      }
      else{
          return false;
      }
  }


  function confirm_password(pass, confirm){
      if (pass == confirm){
          return true;
      }
      else{
          return false;
      }
  }


  function which_form(){
      return $(".submit-btn").text();
  }

  function send_sign_form(){
      var form = which_form();
      if (form == "Sign Up"){
          var errors = [];
          console.log($("#inputState").val().trim());
          console.log($("#inputName").val().trim());
          var str_field_check = city_state_name_verification($("#inputCity").val().trim(), $("#inputState").val().trim(), $("#inputName").val().trim());
          var location_check = location_verification($("#inputZip").val().trim());
          var confirm_check = confirm_password($("#inputPassword").val(), $("#inputConfirmPassword").val());
          console.log(location_check);
          if (str_field_check == false){
              console.log("str_error");
              errors.push("Please fill in all required fields");
          }
          if (location_check == false){
              console.log("loc_error");
              errors.push("Please enter a valid Zip Code");
          }
          if (confirm_check == false){
              console.log("confirm_error");
              errors.push("Your password confirmation failed");
          };
          console.log(errors);
          if (errors.length == 0){
              create_user($("#inputEmail").val().trim(), $("#inputPassword").val());
          }
          else{
              console.log("There were errors");
              $(".modal-body").html("");
              $(".modal-body").append($("<div>").text("There are error(s) with your submission:"));
              errors.forEach(function(value){
                  $(".modal-body").append($("<div>").text(value));
              });
              $("#myModal").modal('show');
              
              $("#inputName").val("");
              $("#inputEmail").val("");
              $("#inputPassword").val("");
              $("#inputConfirmPassword").val("");
              $("#inputAddress").val("");
              $("#inputCity").val("");
              $("#inputState").val("");
              $("#inputZip").val("");

  
          }
      }
      else{
          sign_in($("#inputEmail").val().trim(), $("#inputPassword").val().trim());
      }
  }

  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        if(which_form() == "Sign Up" && $("#inputName").val().trim() != ""){
          database.ref(user.uid).set({
              name: $("#inputName").val().trim(),
              last_login: moment().format("YYYY-MM-DD hh:mm a"),
              email: $("#inputEmail").val().trim(),
              address: $("#inputAddress").val().trim(),
              city: $("#inputCity").val().trim(),
              state: $("#inputState").val().trim(),
              zip: $("#inputZip").val().trim(),
              });
          }
          else{
              database.ref(user.uid).update({
                  last_login: moment().format("YYYY-MM-DD hh:mm a")
              });
          }
      sessionStorage.setItem("uid", user.uid);
      // database.ref(user.uid).on("value", function(snapshot){
      //     console.log("working");
      //     sessionStorage.clear();
      //     sessionStorage.setItem("name", snapshot.val().name);
      //     console.log("name in storage");
      //     sessionStorage.setItem("zip", snapshot.val().zip);
          // $("#name-calendar").text(sessionStorage.getItem("name")+ "'s Calendar");
          
        load_calendar(moment(), user.uid);
        $("#inputName").val("");
        $("#inputtEmail").val("");
        $("#inputPassword").val("");
        $("#inputConfirmPassword").val("");
        $("#inputAddress").val("");
        $("#inputCity").val("");
        $("#inputState").val("");
        $("#inputZip").val("");
      }
    });

    

  function load_calendar(date, uid){
      database.ref(uid).on("value", function(snapshot){
          console.log("working");
          sessionStorage.clear();
          sessionStorage.setItem("name", snapshot.val().name);
          console.log("name in storage");
          sessionStorage.setItem("zip", snapshot.val().zip);
          var zip = sessionStorage.getItem("zip");
          var weather_data;
          var weather_api = "265a46d65db9c9a8b164aa9180136f67";
          var weatherQuery = "https://api.openweathermap.org/data/2.5/forecast?zip="+sessionStorage.getItem("zip")+",us&appid="+weather_api;
          
          var weather = "";
          $.ajax({
              url: weatherQuery,
              method: "GET"
          }).then(function(response_main) {
              var weather_api = "265a46d65db9c9a8b164aa9180136f67";
              var weatherQuery = "https://api.openweathermap.org/data/2.5/weather?zip="+zip+",us&appid="+weather_api;
              $.ajax({
                  url: weatherQuery,
                  method: "GET"
                }).then(function(response) {
                      $("#month-caption").text(date.format('MMMM YYYY'));

                      // $("#name-calendar").text(sessionStorage.getItem("name")+ "'s Calendar");
                      
                      $("nav").css("background-color", "#32383e");
                      console.log("scrollTop: " + $(".calendar").scrollTop);
              
                      $(".sign-in").hide();
                      $(".calendar-container").show();
                      $(".nav-events").show();
              
                      $("#myVideo").show();

                      $("#name-calendar").text(sessionStorage.getItem("name")+ "'s Calendar");
                      var current_weather = sessionStorage.getItem("weather");
                      console.log("name on screen");
                      console.log(response_main);
                      console.log(response_main.list);
                      weather_data = response_main.list;
                      for (var i = 1; i < 8; i++){
                          var current_date = moment(date.format('MMM D YYYY'), 'MMM D YYYY');
                          console.log(date.format('MMM Do'));
                          var dt = current_date.add(i-1, 'days');
                          console.log(i-1+": "+dt.format('MMM Do'));
                          var weather_html = "";
                          if (i == 1){
                              var current_date_2 = moment(date.format('MMM D YYYY'), 'MMM D YYYY');
                              console.log("current date_2: " + current_date_2.format("YYYY-MM-DD"));
                                      var weather_html = "";
                                      console.log(response);
                                      if (response.weather.main == "Snow"){
                                          weather = "Snow";
                                          weather_html = "<i class = 'fas fa-snowflake' style = 'font-size:36px;color:lightblue'></i>";
                                      }
                                      else if (response.weather.main == "Rain"){
                                          weather = "Rain";
                                          weather_html = "<i class = 'fas fa-cloud-rain' style = 'font-size:36px;color:lightblue'></i>";
                                      }
                                      else if (response.weather.main == "Clouds"){
                                          weather = "Clouds";
                                          weather_html = "<i class = 'fas fa-cloud' style = 'font-size:36px;color:lightblue'></i>";
                                      }
                                      else{
                                          weather = "Clear";
                                          weather_html = "<i class = 'fas fa-sun' style = 'font-size:36px;font-weight:bolder;color:yellow'></i>";
                      
                                      }
                                      sessionStorage.setItem("weather", weather);
                                      console.log("day 1 is: " + current_date_2.format("YYYY-MM-DD"));
                                      $("#day-1-date").html("<span class = 'day-display'>"+current_date_2.format('dddd')+"</span><br>"+weather_html+"<br> <span class = 'date-display'>"+current_date_2.format('D')+"</span>");
                                      $("#day-1-date").css("background-color", "#007bff");
                                      $("#day-1-date").css("border-radius", "none !important");
                                      $("#day-1-date > .day-display").css("color", "white");
                                      $("#day-1-date > .date-display").css("color", "white");
                          }
                          else if (dt >= moment() && dt <= moment().add(5, 'days')){
                              weather_data.forEach(function(value){
                                  if (dt.format("YYYY-MM-DD") + " 12:00:00" == value.dt_txt){
                                      if (value.weather["0"].main == "Snow"){
                                          weather_html = "<i class = 'fas fa-snowflake' style = 'font-size:36px;color:lightblue'></i>";
                                      }
                                      else if (value.weather["0"].main == "Rain"){
                                          console.log(dt.format('MMM Do') + " rain");
                                          weather_html = "<i class = 'fas fa-cloud-rain' style = 'font-size:36px;color:lightblue'></i>";
                                      }
                                      else if (value.weather["0"].main == "Clouds"){
                                          weather_html = "<i class = 'fas fa-cloud' style = 'font-size:36px;color:lightblue'></i>";
                                      }
                                      else{
                                          weather_html = "<i class = 'fas fa-sun' style = 'font-size:36px;color:yellow'></i>";

                                      }
                                  }
                                  else if (dt.format("YYYY-MM-DD") + " 00:00:00" == value.dt_txt && moment(value.dt_txt, "YYYY-MM-DD HH:mm:ss") >= moment().add(4, 'days')){
                                      if (value.weather["0"].main == "Snow"){
                                          weather_html = "<i class = 'fas fa-snowflake' style = 'font-size:36px;color:lightblue'></i>";
                                      }
                                      else if (value.weather["0"].main == "Rain"){
                                          console.log(dt.format('MMM Do') + " rain");
                                          weather_html = "<i class = 'fas fa-cloud-rain' style = 'font-size:36px;color:lightblue'></i>";
                                      }
                                      else if (value.weather["0"].main == "Clouds"){
                                          weather_html = "<i class = 'fas fa-cloud' style = 'font-size:36px;color:lightblue'></i>";
                                      }
                                      else{
                                          weather_html = "<i class = 'fas fa-sun' style = 'font-size:36px;color:yellow'></i>";

                                      }
                                  }
                              });
                          }
                          else{
                              weather = "Unknown";
                              weather_html = "<i class = 'fas fa-sun' style = 'font-size:36px;color:transparent;'></i>";
                          }

                          $("#day-"+i+"-date").html("<span class = 'day-display'>"+dt.format('dddd')+"</span><br>"+weather_html+"<br> <span class = 'date-display'>"+dt.format('D')+"</span>");
                          $("#day-"+i+"-date").attr("data-date", dt.format("YYYY-MM-DD"));
                          
                          $("day-7-date").css("border-right", "none !important");
                          if (sessionStorage.getItem("weather") != "Clear" || moment().format("HH:mm") >= "17:30" || moment().format("HH:mm") <= "06:30"){
                              $(".day-display").css("color", "white");
                              $(".date-display").css("color", "white");
                          }
                      };
                      var calendar_body = $("tbody");

                      for (var i = 0; i < 24; i++){
                          var original_time = moment("2019-01-01 12:00 am", "YYYY-mm-dd h:mm a");
                          var time = original_time.add(i, 'hours');
                          var row = $("<tr>");
                          var time_display = $("<td>");
                          time_display.text(time.format('h:mm a'));
                          time_display.addClass("time-display");
                          row.append(time_display);
                          for (var j = 0; j < 7; j++){
                              var cell = $("<td>");
                              var day = j+1;
                              console.log($("#day-"+day+"-date").data("data-date"));
                              if (j==6){
                                  cell.css("border-right", "none !important");
                              }
                              else{
                                  cell.css("border-right" ,"solid 1px lightgrey");
                              }
                              cell.attr("data-datetime", $("#day-"+day+"-date").attr("data-date")+ " " + time.format("h:mm a"));
                              cell.addClass("event-cell");
                              cell.val(time.format("HH:mm"))
                              cell.val(time.format("HH:mm"))
                              cell.attr("data-toggle", "modal");
                              cell.attr("data-target", "#event-modal");
                              row.append(cell);
                          }
              
                          calendar_body.append(row);
                      }
                      $("#scroll-body").append(calendar_body);
                      $("#scroll-body").scrollTop(parseFloat(moment().format("HH"))*116);

                      current_weather = sessionStorage.getItem("weather");
                      if (current_weather == "Clouds"){
                          $("#myVideo").attr("src", "assets/images/storm_clouds_timelapse.mp4");
                      }
                      else if (current_weather == "Snow"){
                          $("#myVideo").attr("src", "assets/images/snow.mp4");
                          $("#myVideo").css("min-width", "100%");
                      }
                      else if (current_weather == "Rain"){
                          $("#myVideo").attr("src", "assets/images/storm_raindrops_on_window.mp4");
                      }
                      else if (moment().format("HH:mm") >= "17:30" || moment().format("HH:mm") <= "06:30"){
                          $("#myVideo").attr("src", "assets/images/Rainbow_Nebula_4K_Motion_Background.mp4");
                      }
                      else if (current_weather == "Clear"){
                          $("#myVideo").attr("src", "assets/images/beach_wide.mp4");
                          $("#myVideo").css("height", "120%");
                          $("table").removeClass("table-dark");
                          $("table").css("background-color", "white");
                          $("table").css("border-color", "black");
                          $("table").css("color", "black");
                          $("#day-1-date").css("background-color", "#007bff");
                          $("#day-1-date").css("color", "white");
                      }

              });

          });

  
          
      });


      // var current_weather = sessionStorage.getItem("weather");
      // if (current_weather == "Clouds"){
      //     $("#myVideo").attr("src", "assets/images/storm_clouds_timelapse.mp4");
      // }
      // else if (current_weather == "Snow"){
      //     $("#myVideo").attr("src", "assets/images/snow.mp4");
      //     $("#myVideo").css("min-width", "100%");
      // }
      // else if (current_weather == "Rain"){
      //     $("#myVideo").attr("src", "assets/images/storm_raindrops_on_window.mp4");
      // }
      // else if (moment().format("HH:mm") >= "17:30" || moment().format("HH:mm") <= "06:30"){
      //     $("#myVideo").attr("src", "assets/images/Stars.mp4");
      // }
      // else if (current_weather == "Clear"){
      //     $("#myVideo").attr("src", "assets/images/beach_wide.mp4");
      //     $("#myVideo").css("height", "120%");
      //     $("table").removeClass("table-dark");
      //     $("table").css("background-color", "white");
      //     $("table").css("border-color", "black");
      //     $("table").css("color", "black");
      //     $("#day-1-date").css("background-color", "#007bff");
      //     $("#day-1-date").css("color", "white");
      // }


      // var calendar_body = $("tbody");

      // for (var i = 0; i < 24; i++){
      //     var original_time = moment("2019-01-01 12:00 am", "YYYY-mm-dd h:mm a");
      //     var time = original_time.add(i, 'hours');
      //     var row = $("<tr>");
      //     var time_display = $("<td>");
      //     time_display.text(time.format('h:mm a'));
      //     time_display.addClass("time-display");
      //     row.append(time_display);
      //     for (var j = 0; j < 7; j++){
      //         var cell = $("<td>");
      //         var day = j+1;
      //         console.log($("#day-"+day+"-date").data("data-date"));
      //         if (j==6){
      //             cell.css("border-right", "none !important");
      //         }
      //         else{
      //             cell.css("border-right" ,"solid 1px lightgrey");
      //         }
      //         cell.attr("data-datetime", $("#day-"+day+"-date").attr("data-date")+ " " + time.format("h:mm a"));
      //         cell.addClass("event-cell");
      //         row.append(cell);
      //     }

      //     calendar_body.append(row);
      // }
      // $("#scroll-body").append(calendar_body);
  }

  $("#myVideo").hide();
  $(".calendar-container").hide();
  $(".nav-events").hide();
  

  $(".submit-btn").on("click", function(event){
      event.preventDefault();
      send_sign_form();
  });
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

  $("#sign-out").on("click", function(){
      firebase.auth().signOut().then(function() {
          // Sign-out successful.
          $("#myVideo").hide();
          $(".calendar-container").hide();
          $(".nav-events").hide();
          $(".sign-in").show();
          
          $("#inputName").val("");
          $("#inputtEmail").val("");
          $("#inputPassword").val("");
          $("#inputConfirmPassword").val("");
          $("#inputAddress").val("");
          $("#inputCity").val("");
          $("#inputState").val("");
          $("#inputZip").val("");

        }).catch(function(error) {
          // An error happened.
        });
    });
  });

  var someID = ''
  $(document).on("click", ".event-cell", function(){
            // Adds the calendar time selection to the start time input on event form
            $("#event-start-time").val($(this).val());//puts start time in event modal relative to cell selected
            $(this).css("background", "linear-gradient(to bottom, #212529 0%,#212529 50%,#212529 50%,#007bff 50%,#007bff 100%)");
            someID = $(this).attr("data-datetime").split(' ').join('');
            var span = $("<div>");
            span.attr('id', someID)
            span.css("position", "absolute");
            span.css("height", "50%");
            span.css("width", "100%");
            span.css("overflow", "hidden");
            span.css("text-overflow", "ellipsis");
            span.css("bottom", "0");
            span.css("left", "0");
            span.css("display", "block");
            span.css("white-space", "nowrap");
            $(this).append(span);  
            // Adds event title to calendar

          $("#event-submit").on("click", function(e){
            e.preventDefault();
            var eventTitle = $("#event-title").val();
            var eventAddress = $("#event-address").val();
            var eventCity = $("#event-city").val();
            var eventState = $("#event-state").val();
            var eventZip = $("#event-zip").val();
            var whatwewant = document.getElementById(someID);
            whatwewant.innerHTML = eventTitle;
            $("#event-title").val("");
            $("#event-address").val("");
            $("#event-city").val("");
            $("#event-state").val("");
            $("#event-zip").val("");
            showNavEnd();
            showNavStart();
        })

      // Function to show event address input on event form
      $(function(showNavEnd){
        $("#event-address").hide();
        $("#event-location").change(function(){
          if ($("#event-location").val() == "add-location") {
            $("#event-address").show();
          } else {
            $("#event-address").hide();
            }
        });
      });
        
      // Function to show starting address input on event form
      $(function(showNavStart){
        $("#start-address").hide();
        $("#start-location").change(function(){
          if ($("#start-location").val() == "add-location") {
            $("#start-address").show();
          } else {
            $("#start-address").hide();
            }
        });
      });
});
