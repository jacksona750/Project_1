

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





var weatherAPI = "265a46d65db9c9a8b164aa9180136f67";
var mapsAPI = "OEeXUFJsMGPGX6jvueAh5pJ2YyUCzbay";
var restAPI = "DOF99u8HLWYBY7XS57PcCuQ6aJdh0eWYQVSSRXCj3oWg-OPD8t6QIKTHMkbL-uuJhmVNE-by-DG2tz7bQndWFBjgc_-AF1wbFUD2tLDFQNVrUmAsEHRnJVzA_gZZXHYx";


var eventStreet ;
var eventCity ;
var eventState ;
var eventZip ;
var originStreet;
var originCity;
var originState;
var originZip;
var originLat = "34.00417";
var originLon = "-118.48177";
var eventLat = "34.0252";
var eventLon = "-118.47479";
var eventAddress = "2029 olympic blvd santa monica ca 90404";              
var originAddress = "1358 4th st santa monica ca 90401";
// var originAddress = originStreet + originCity + originState + originZip;
// console.log(originAddress)
// var eventAddress = eventStreet + eventCity + eventState + eventZip;
// console.log(eventAddress)



  // URL to query the TomTom map search database
  var eventQuery = "https://api.tomtom.com/search/2/geocode/" + eventAddress + ".json?countrySet=us&key=OEeXUFJsMGPGX6jvueAh5pJ2YyUCzbay";

  // AJAX call for location
  $.ajax({
      url: eventQuery,
      method: "GET"
  }).then(function(response) {
      console.log(response)
      var data = response.results;
      eventLat = data[0].position.lat;
      eventLon = data[0].position.lon; 
      console.log(eventLat)
      console.log(eventLon)
      var originQuery = "https://api.tomtom.com/search/2/geocode/" + originAddress + ".json?countrySet=us&key=OEeXUFJsMGPGX6jvueAh5pJ2YyUCzbay";
      
      $.ajax({
      url: originQuery,
      method: "GET"
    }).then(function(response) {
        console.log(response)
      var data = response.results;
      originLat = data[0].position.lat;
      originLon = data[0].position.lon; 
      console.log(originLat)
      console.log(originLon)
      
      var durationQuery = "https://api.tomtom.com/routing/1/calculateRoute/" + originLat + "," + originLon + ":" + eventLat + "," + eventLon +"/json?&key=OEeXUFJsMGPGX6jvueAh5pJ2YyUCzbay";
      
      // AJAX call for duration
      $.ajax({
          url: durationQuery,
          method: "GET"
        }).then(function(response) {
            
            // Create CODE HERE to log the resulting object
            var duration = response.routes[0].summary.travelTimeInSeconds;
            console.log(response)
            console.log(response.routes[0].summary.travelTimeInSeconds)
        })
    })
})

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
          $("#error-body").text(errorMessage);
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
          $("#error-body").text(errorMessage);
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
              $("#error-body").html("");
              $("#error-body").append($("<div>").text("There are error(s) with your submission:"));
              errors.forEach(function(value){
                  $("#error-body").append($("<div>").text(value));
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

  function send_event_form(){
      var errors = [];
      console.log($("#event-title"));
      var even_titl = $("#event-title").val().trim();
      console.log(even_titl);
      var str_field_origin_check = true;
      var str_field_dest_check = true;
      var zip_dest_check = true;
      var zip_origin_check = true;
      console.log($("#event-location").val().trim());
      var location_setting_event = $("#event-location").val().trim();
      if (location_setting_event != "default-location"){
          zip_dest_check = location_verification($("#event_loc_inputZip").val().trim());
          str_field_dest_check = city_state_name_verification($("#event_loc_inputCity").val().trim(), $("#event_loc_inputState").val().trim(), even_titl);

      }

      var location_setting_origin = $("#start-location").val().trim()
      if (location_setting_origin != "default-location"){
          zip_origin_check = location_verification($("#event_origin_inputZip").val().trim());
          str_field_origin_check = city_state_name_verification($("#event_origin_inputCity").val().trim(), $("#event_origin_inputState").val().trim(), even_titl);
      }

      if (str_field_origin_check == false || str_field_dest_check == false){
          console.log("str_error");
          errors.push("Please fill in all required fields");
      }

      if (zip_dest_check == false || zip_origin_check == false){
          errors.push("Please enter a valid Zip Code");
      }

      if (moment($("#event-start-date").val().trim(), "YYYY-MM-DD").isValid()){

    }
    else{
        errors.push("Please enter a valid date");
    }

    if(moment($("#event-start-time").val().trim(), "HH:mm").isValid() && moment($("#event-end-time").val().trim(), "HH:mm").isValid() && moment($("#event-start-time").val().trim(), "HH:mm").format("HH:mm") <= moment($("#event-end-time").val().trim(), "HH:mm").format("HH:MM")){

    }
    else{
        errors.push("Please enter valid times");
    }

    if (errors.length == 0){
        var zip_event;
        var zip_origin;

        if ($("#event-location").val().trim() == "default-location"){
            zip_event = sessionStorage.getItem("zip");
        }
        else{
            zip_event = $("#event_loc_inputZip").val().trim();
        }

        if ($("#start-location").val().trim() == "default-location"){
            zip_origin = sessionStorage.getItem("zip");
        }
        else{
            zip_origin = $("#event_origin_inputZip").val().trim();
        }
        console.log(sessionStorage.getItem("uid"));
        console.log(even_titl);
        console.log(moment($("#event-start-time").val().trim(), "HH:mm").format("HH:mm"));
        console.log(moment($("#event-end-time").val().trim(), "HH:mm").format("HH:mm"));
        console.log(moment($("#event-start-date").val().trim(), "YYYY-MM-DD"));
        console.log(zip_origin);
        console.log(zip_event);
        add_event(sessionStorage.getItem("uid"), even_titl, moment($("#event-start-time").val().trim(), "HH:mm").format("HH:mm"), moment($("#event-end-time").val().trim(), "HH:mm").format("HH:mm"), moment($("#event-start-date").val().trim(), "YYYY-MM-DD"), zip_origin, zip_event);
    }
    else{
        $("#error-body").html("");
        $("#error-body").append($("<div>").text("There are error(s) with your submission:"));
        errors.forEach(function(value){
            $("#error-body").append($("<div>").text(value));
        });
        $("#myModal").modal('show');

    }

    // $("#event_origin_inputCity").val("");
    // $("#event_origin_inputState").val("");
    // $("#event_origin_inputAddress").val("");
    // $("#event_loc_inputCity").val("");
    // $("#event_loc_inputState").val("");
    // $("#event_loc_inputAddress").val("");
    // $("#event_title").val("");   
    // $("#event-start-date").val("");     
    // $("#event-end-time").val("");
    // $("#event-start-time").val("");     
    // $("#event_origin_inputZip").val("");
    // $("#event_loc_inputZip").val("");


  }

  function add_event(uid, title, start_time, end_time, start_date, start_loc, end_loc){
      database.ref(uid+"/events/"+start_date.format("MMM")).push({
          event_title: title,
          start_date: start_date.format("YYYY-MM-DD"),
          end_time: end_time,
          start_time: start_time,
          start_loc: start_loc,
          end_loc: end_loc
      });

      load_calendar(moment(), uid);
  }

  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        sessionStorage.setItem("uid", user.uid);
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
      database.ref(uid).once("value").then(function(snapshot){
          database.ref(uid+"/events/"+date.format("MMM")).once("value").then(function(snapshot_event){
            console.log(uid+"/events/"+date.format("MMM"));
            console.log(snapshot_event);
            console.log("working");
            var events = [];
            snapshot_event.forEach(function(value){
                console.log(value);
                console.log(value.val().event_title);
                console.log(value.val().start_date);
                console.log(value.val().start_time);
                console.log(value.val().end_time);
                console.log(value.val().start_loc);
                console.log(value.val().end_loc);
                events.push({
                    event_title: value.val().event_title,
                    start_date: value.val().start_date,
                    end_time: value.val().end_time,
                    start_time: value.val().start_time,
                    start_loc: value.val().start_loc,
                    end_loc: value.val().end_loc
                });
            });
            //   sessionStorage.clear();
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
                        $("#month-caption").text("");
                        $("#month-caption").prepend(date.format('MMMM YYYY'));

                        // $("#name-calendar").text(sessionStorage.getItem("name")+ "'s Calendar");
                        
                        console.log("scrollTop: " + $(".calendar").scrollTop);
                        
                        $("#date-jump-text").val(date.format("YYYY-MM-DD"));

                        $(".sign-in").hide();
                        $(".calendar-container").show();
                        $(".nav-events").show();
                        $(".credit").show();
                
                        $("#myVideo").show();
                        $("tbody").html("");

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
                            if (dt.format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")){
                                var current_date_2 = moment(dt.format('MMM D YYYY'), 'MMM D YYYY');
                                console.log("current date_2: " + current_date_2.format("YYYY-MM-DD"));
                                        var weather_html = "";
                                        console.log(response.weather);
                                        if (response.weather["0"].main == "Snow"){
                                            weather = "Snow";
                                            weather_html = "<i class = 'fas fa-snowflake' style = 'font-size:36px;color:lightblue'></i>";
                                        }
                                        else if (response.weather["0"].main == "Rain" || response.weather["0"].main == "Mist"){
                                            weather = "Rain";
                                            weather_html = "<i class = 'fas fa-cloud-rain' style = 'font-size:36px;color:lightblue'></i>";
                                        }
                                        else if (response.weather["0"].main == "Clouds"){
                                            weather = "Clouds";
                                            weather_html = "<i class = 'fas fa-cloud' style = 'font-size:36px;color:lightblue'></i>";
                                        }
                                        else{
                                            weather = "Clear";
                                            weather_html = "<i class = 'fas fa-sun' style = 'font-size:36px;font-weight:bolder;color:yellow'></i>";
                        
                                        }
                                        sessionStorage.setItem("weather", weather);
                                        if (i == 1){
                                            console.log("day 1 is: " + current_date_2.format("YYYY-MM-DD"));
                                            $("#day-1-date").html("<span class = 'day-display'>"+current_date_2.format('dddd')+"</span><br>"+weather_html+"<br> <span class = 'date-display'>"+current_date_2.format('D')+"</span>");
                                            $("#day-1-date").css("background-color", "#007bff");
                                            $("#day-1-date").css("border-radius", "none !important");
                                            $("#day-1-date > .day-display").css("color", "white");
                                            $("#day-1-date > .date-display").css("color", "white");
                                        }
                            }
                            else if (dt >= moment() && dt <= moment().add(5, 'days')){
                                weather_data.forEach(function(value){
                                    if (dt.format("YYYY-MM-DD") + " 12:00:00" == value.dt_txt){
                                        if (value.weather["0"].main == "Snow"){
                                            weather_html = "<i class = 'fas fa-snowflake' style = 'font-size:36px;color:lightblue'></i>";
                                        }
                                        else if (value.weather["0"].main == "Rain" || value.weather["0"].main == "Mist"){
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
                                        else if (value.weather["0"].main == "Rain" || value.weather["0"].main == "Mist"){
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
                            console.log("current days: "+dt.format("YYYY-MM-DD"));
                            // $("#day-"+i+"-date").attr("data-date", "");
                            $("#day-"+i+"-date").attr("data-date", dt.format("YYYY-MM-DD"));
                            console.log($("#day-"+i+"-date").data("date"));
        
                            $("day-7-date").css("border-right", "none !important");
                            // sessionStorage.setItem("weather", weather);
                            if (sessionStorage.getItem("weather") != "Clear" || moment().format("HH:mm") >= "17:30" || moment().format("HH:mm") <= "06:30"){
                                $(".day-display").css("color", "white");
                                $(".date-display").css("color", "white");
                            }
                        };
                        var calendar_body = $("tbody");

                        for (var i = 0; i < 24; i++){
                            var original_time = moment("2019-01-01 12:00 am", "YYYY-MM-DD h:mm a");
                            var time = original_time.add(i, 'hours');
                            var row = $("<tr>");
                            var time_display = $("<td>");
                            time_display.text(time.format('h:mm a'));
                            time_display.addClass("time-display");
                            row.append(time_display);
                            for (var j = 0; j < 7; j++){
                                var cell = $("<td>");
                                var day = j+1;
                                console.log($("#day-"+day+"-date").attr("data-date"));
                                if (j==6){
                                    cell.css("border-right", "none !important");
                                }
                                else{
                                    cell.css("border-right" ,"solid 1px lightgrey");
                                }
                                // cell.attr("data-datetime", "");
                                cell.attr("data-datetime", $("#day-"+day+"-date").attr("data-date")+ " " + time.format("HH:mm"));
                                cell.data("datetime", $("#day-"+day+"-date").attr("data-date")+ " " + time.format("HH:mm"));
                                console.log(cell.attr("data-datetime"));
                                cell.addClass("event-cell");
                                cell.val(time.format("HH:mm"));
                                cell.attr("data-toggle", "modal");
                                cell.attr("data-target", "#event-modal");
                                row.append(cell);
                            }
                
                            calendar_body.append(row);
                        }
                        $("#scroll-body").append(calendar_body);
                        $("#scroll-body").scrollTop(parseFloat(moment().format("HH"))*116);

                        console.log(events);
                        for(var i = 0; i < events.length; i++){
                            console.log(events[i]);
                            console.log("doing shit");
                            var start_datetime =events[i].start_date + " " +events[i].start_time;
                            console.log(start_datetime);
                            var start_datetime_lookup =events[i].start_date + " " + moment(events[i].start_time, "HH:mm").format("HH")+":00";
                            console.log(start_datetime_lookup);
                            var end_datetime =events[i].start_date + " " +events[i].end_time;
                            console.log(end_datetime);

                            var focused_cell = $("td[data-datetime = '"+start_datetime_lookup+"']");
                            focused_cell.html("");
                            console.log(focused_cell);
                            if (moment(start_datetime, "YYYY-MM-DD HH:mm").diff(moment(start_datetime_lookup, "YYYY-MM-DD HH:mm"), "minutes") >= 30){
                                console.log(":30");
                                if (sessionStorage.getItem("weather") != "Clear"){
                                    focused_cell.css("background", "linear-gradient(to bottom, #212529 0%,#212529 50%,#212529 50%,#007bff 50%,#007bff 100%)");
                                }
                                else{
                                    focused_cell.css("background", "linear-gradient(to bottom, white 0%,white 50%,white 50%,#007bff 50%,#007bff 100%)");

                                }
                                var title_div = $("<div>");
                                title_div.css("position", "absolute");
                                title_div.css("height", "50%");
                                title_div.css("width", "100%");
                                title_div.css("overflow", "hidden");
                                title_div.css("text-overflow", "ellipsis");
                                title_div.css("bottom", "0");
                                title_div.css("left", "0");
                                title_div.css("display", "block");
                                title_div.css("white-space", "nowrap");
                                title_div.css("border-radius", "15px");
                                title_div.attr("data-title", events[i].event_title);
                                title_div.attr("data-startdate", events[i].start_date);
                                title_div.attr("data-starttime", events[i].start_time);
                                title_div.attr("data-endtime", events[i].end_time);
                                title_div.attr("data-ziporigin", events[i].start_loc);
                                title_div.attr("data-ziploc", events[i].end_loc);
                                title_div.attr("data-toggle", "popover");
                                title_div.attr("data-trigger", "hover");
                                title_div.attr("data-html", "true");
                                title_div.attr("data-content", "Event Name: <b>"+events[i].event_title+"</b><br>Date: "+moment(events[i].start_date, "YYYY-MM-DD").format("MMM D, YYYY") + "<br>Start Time: "+moment(events[i].start_time, "HH:mm").format("h:mm a")+"<br>End Time: "+moment(events[i].end_time, "HH:mm").format("h:mm a")+"<br>Coming From: " + events[i].start_loc + "<br>Going to: "+events[i].end_loc+"</div>");
                                
                                title_div.text(events[i].event_title);
                                focused_cell.append(title_div);  
                            }

                            else if (moment(end_datetime, "YYYY-MM-DD HH:mm").diff(moment(start_datetime, "YYYY-MM-DD HH:mm"), "minutes") <= 30){
                                console.log("half hour event");
                                if (sessionStorage.getItem("weather") != "Clear"){
                                    focused_cell.css("background", "linear-gradient(to bottom, #007bff 0%,#007bff 50%,#007bff 50%,#212529 50%,#212529 100%)");
                                }
                                else{
                                    focused_cell.css("background", "linear-gradient(to bottom, #007bff 0%,#007bff 50%,#007bff 50%,white 50%,white 100%)");

                                }
                                var title_div = $("<div>");
                                title_div.css("position", "absolute");
                                title_div.css("height", "50%");
                                title_div.css("width", "100%");
                                title_div.css("overflow", "hidden");
                                title_div.css("text-overflow", "ellipsis");
                                title_div.css("top", "0");
                                title_div.css("left", "0");
                                title_div.css("display", "block");
                                title_div.css("white-space", "nowrap");
                                title_div.css("border-radius", "15px");
                                title_div.attr("data-title", events[i].event_title);
                                title_div.attr("data-startdate", events[i].start_date);
                                title_div.attr("data-starttime", events[i].start_time);
                                title_div.attr("data-endtime", events[i].end_time);
                                title_div.attr("data-ziporigin", events[i].start_loc);
                                title_div.attr("data-ziploc", events[i].end_loc);
                                title_div.attr("data-toggle", "popover");
                                title_div.attr("data-trigger", "hover");
                                title_div.attr("data-html", "true");
                                title_div.attr("data-content", "Event Name: <b>"+events[i].event_title+"</b><br>Date: "+moment(events[i].start_date, "YYYY-MM-DD").format("MMM D, YYYY") + "<br>Start Time: "+moment(events[i].start_time, "HH:mm").format("h:mm a")+"<br>End Time: "+moment(events[i].end_time, "HH:mm").format("h:mm a")+"<br>Coming From: " + events[i].start_loc + "<br>Going to: "+events[i].end_loc+"</div>");
                                
                                title_div.text(events[i].event_title);
                                focused_cell.append(title_div); 
                            }

                            else{
                                console.log("fuck");
                                focused_cell.css("background-color", "#007bff");
                                var title_div = $("<div>");
                                title_div.css("position", "absolute");
                                title_div.css("height", "100%");
                                title_div.css("width", "100%");
                                title_div.css("overflow", "hidden");
                                title_div.css("text-overflow", "ellipsis");
                                title_div.css("top", "0");
                                title_div.css("left", "0");
                                title_div.css("display", "block");
                                title_div.css("white-space", "nowrap");
                                title_div.css("border-radius", "15px");
                                title_div.attr("data-title", events[i].event_title);
                                title_div.attr("data-startdate", events[i].start_date);
                                title_div.attr("data-starttime", events[i].start_time);
                                title_div.attr("data-endtime", events[i].end_time);
                                title_div.attr("data-ziporigin", events[i].start_loc);
                                title_div.attr("data-ziploc", events[i].end_loc);
                                title_div.attr("data-toggle", "popover");
                                title_div.attr("data-trigger", "hover");
                                title_div.attr("data-html", "true");
                                title_div.attr("data-content", "Event Name: <b>"+events[i].event_title+"</b><br>Date: "+moment(events[i].start_date, "YYYY-MM-DD").format("MMM D, YYYY") + "<br>Start Time: "+moment(events[i].start_time, "HH:mm").format("h:mm a")+"<br>End Time: "+moment(events[i].end_time, "HH:mm").format("h:mm a")+"<br>Coming From: " + events[i].start_loc + "<br>Going to: "+events[i].end_loc+"</div>");
                                
                                title_div.text(events[i].event_title);
                                focused_cell.append(title_div); 
                            }


                            var populating_event_cell = true;
                            var j = 1;
                            while (populating_event_cell == true){
                                var focused_time = moment(start_datetime_lookup, "YYYY-MM-DD HH:mm").add(j, "hours").format("YYYY-MM-DD HH:mm");
                                var focused_added_cell = $("td[data-datetime = '"+focused_time+"']");
                                if (moment(end_datetime, "YYYY-MM-DD HH:mm").diff(moment(focused_time, "YYYY-MM-DD HH:mm"), 'minutes') <= 0){
                                    populating_event_cell = false;
                                }
                                else if (moment(end_datetime, "YYYY-MM-DD HH:mm").diff(moment(focused_time, "YYYY-MM-DD HH:mm"), 'minutes') <= 30){
                                    if (sessionStorage.getItem("weather") == "Clear"){
                                        focused_added_cell.css("background", "linear-gradient(to bottom, #007bff 0%,#007bff 50%,#007bff 50%,white 50%,white 100%)");
                                    }
                                    else{
                                        focused_added_cell.css("background", "linear-gradient(to bottom, #007bff 0%,#007bff 50%,#007bff 50%,#212529 50%,#212529 100%)");

                                    }
                                    var title_div = $("<div>");
                                    title_div.css("position", "absolute");
                                    title_div.css("height", "50%");
                                    title_div.css("width", "100%");
                                    title_div.css("overflow", "hidden");
                                    title_div.css("text-overflow", "ellipsis");
                                    title_div.css("top", "0");
                                    title_div.css("left", "0");
                                    title_div.css("display", "block");
                                    title_div.css("white-space", "nowrap");
                                    title_div.css("border-radius", "15px");
                                    title_div.attr("data-title", events[i].event_title);
                                    title_div.attr("data-startdate", events[i].start_date);
                                    title_div.attr("data-starttime", events[i].start_time);
                                    title_div.attr("data-endtime", events[i].end_time);
                                    title_div.attr("data-ziporigin", events[i].start_loc);
                                    title_div.attr("data-ziploc", events[i].end_loc);
                                    title_div.attr("data-toggle", "popover");
                                    title_div.attr("data-trigger", "hover");
                                    title_div.attr("data-html", "true");
                                    title_div.attr("data-content", "Event Name: <b>"+events[i].event_title+"</b><br>Date: "+moment(events[i].start_date, "YYYY-MM-DD").format("MMM D, YYYY") + "<br>Start Time: "+moment(events[i].start_time, "HH:mm").format("h:mm a")+"<br>End Time: "+moment(events[i].end_time, "HH:mm").format("h:mm a")+"<br>Coming From: " + events[i].start_loc + "<br>Going to: "+events[i].end_loc+"</div>");
                                    
                                    title_div.text("");
                                    focused_added_cell.append(title_div);
                                    populating_event_cell = false;
                                }
                                else{
                                    focused_added_cell.css("background-color", "#007bff");
                                    var title_div = $("<div>");
                                    title_div.css("position", "absolute");
                                    title_div.css("height", "100%");
                                    title_div.css("width", "100%");
                                    title_div.css("overflow", "hidden");
                                    title_div.css("text-overflow", "ellipsis");
                                    title_div.css("top", "0");
                                    title_div.css("left", "0");
                                    title_div.css("display", "block");
                                    title_div.css("white-space", "nowrap");
                                    title_div.css("border-radius", "15px");
                                    title_div.attr("data-title", events[i].event_title);
                                    title_div.attr("data-startdate", events[i].start_date);
                                    title_div.attr("data-starttime", events[i].start_time);
                                    title_div.attr("data-endtime", events[i].end_time);
                                    title_div.attr("data-ziporigin", events[i].start_loc);
                                    title_div.attr("data-ziploc", events[i].end_loc);
                                    title_div.attr("data-toggle", "popover");
                                    title_div.attr("data-trigger", "hover");
                                    title_div.attr("data-html", "true");
                                    title_div.attr("data-content", "Event Name: <b>"+events[i].event_title+"</b><br>Date: "+moment(events[i].start_date, "YYYY-MM-DD").format("MMM D, YYYY") + "<br>Start Time: "+moment(events[i].start_time, "HH:mm").format("h:mm a")+"<br>End Time: "+moment(events[i].end_time, "HH:mm").format("h:mm a")+"<br>Coming From: " + events[i].start_loc + "<br>Going to: "+events[i].end_loc+"</div>");

                                    title_div.text("");
                                    focused_added_cell.append(title_div);
                                }
                                console.log(populating_event_cell);
                                j++;
                                
                            }
                        };
                        $('[data-toggle="popover"]').popover();
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

                        $(".date-jump-submit").on("click", function(event){
                            event.preventDefault();
                            if (moment($("#date-jump-text").val(), "YYYY-MM-DD").isValid()){
                                console.log(moment($("#date-jump-text").val(), "YYYY-MM-DD").format("YYYY-MM-DD"));
                                $("tbody").html("");
                                load_calendar(moment($("#date-jump-text").val(), "YYYY-MM-DD"), sessionStorage.getItem("uid"));
                                database.ref(sessionStorage.getItem("uid")).update({
                                    last_login: moment().format("YYYY-MM-DD hh:mm a")
                                });
                            }
                            else{
                                console.log("No");
                            }
                        });
                });

            });

            });
            
        });

  }

    $("#myVideo").hide();
    $(".calendar-container").hide();
    $(".nav-events").hide();
    $(".credit").hide();


    $("#event-address").hide();
    $("#event-location").change(function(){
    if ($("#event-location").val() == "add-location") {
    $("#event-address").show();
    } else {
    $("#event-address").hide();
    }
    });

    $("#start-address").hide();
    $("#start-location").change(function(){
    if ($("#start-location").val() == "add-location") {
    $("#start-address").show();
    } else {
    $("#start-address").hide();
    }
    });
  

  $("#event-submit").on("click", function(event){
      event.preventDefault();
      send_event_form();
  });
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

    $("#add-event-nav").on("click", function(value){
        $("#event-start-time").val("");
        $("#event-start-date").val("");
        $("#event-end-time").val("");
    });


  });



  var someID = ''
  $(document).on("click", ".event-cell", function(){
    // Adds the calendar time selection to the start time input on event form
    $("#event-start-time").val($(this).val());//puts start time in event modal relative to cell selected
    $("#event-end-time").val(moment($(this).val(), "HH:mm").add(1, 'hours').format("HH:mm"));        
    $(this).css("background", "linear-gradient(to bottom, #212529 0%,#212529 50%,#212529 50%,#007bff 50%,#007bff 100%)");
    $("#event-start-date").val($(this).attr("data-datetime").split(" ")[0]);
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
          // Function to show event address input on event form
          $("#event-address").hide();
          $("#event-location").change(function(){
              if ($("#event-location").val() == "add-location") {
              $("#event-address").show();
              } else {
              $("#event-address").hide();
              }
          });
          
          // Function to show starting address input on event form
          $("#start-address").hide();
          $("#start-location").change(function(){
              if ($("#start-location").val() == "add-location") {
              $("#start-address").show();
              } else {
              $("#start-address").hide();
              }
          });

  })


          $("#event-submit").on("click", function(e){
            e.preventDefault();
            var eventTitle = $("#event-title").val();
            eventStreet = $("#event-street").val().trim();
            eventCity = $("#event-city").val().trim();
            eventState = $("#event-state").val().trim();
            eventZip = $("#event-zip").val().trim();
            function location_verification(eventZip){
              queryURL = "http://api.geonames.org/postalCodeSearchJSON?postalcode=" + eventZip + "&maxRows=10&username=charles.glass";
              $.ajax({
                  url: queryURL,
                  method: "GET"
              }).then(function(response){
                  console.log(response)
                  if ((eventZip.length == 5) && (response.postalCodes.length > 0)){
                      return true;
                  }
                  else{
                      return false;
                  }
              });
            }
      
            
            originStreet = $("#origin-street").val().trim();
            originCity = $("#origin-city").val().trim();
            originState = $("#origin-state").val().trim();
            originZip = $("#origin-zip").val().trim();
            function location_verification(originZip){
              queryURL = "http://api.geonames.org/postalCodeSearchJSON?postalcode=" + originZip + "&maxRows=10&username=charles.glass";
              $.ajax({
                  url: queryURL,
                  method: "GET"
              }).then(function(response){
                  console.log(response)
                  if ((originZip.length == 5) && (response.postalCodes.length > 0)){
                      return true;
                  }
                  else{
                      return false;
                  }
              });
          }
      
            var whatwewant = document.getElementById(someID);
            whatwewant.innerHTML = eventTitle;
            $("#event-title").val("");
            $("#event-street").val("");
            $("#event-city").val("");
            $("#event-state").val("");
            $("#event-zip").val("");
            $("#origin-street").val("");
            $("#origin-city").val("");
            $("#origin-state").val("");
            $("#origin-zip").val("");
            $("#event-address").hide();
            $("#start-address").hide();

            
          })
   
    
  
});

