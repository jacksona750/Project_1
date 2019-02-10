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

  $("#movieInputZip").keyup(function(e) {
    
    if (e.keyCode == 13) { //triggers when a user presses enter after filling out a valid zip
      var apikey = "8me7ng6utpessays6nzfdsut";
      var baseUrl = "http://data.tmsapi.com/v1.1/movies/showings?startDate=";
      var zipCode = $("#movieInputZip").val();
      sessionStorage.setItem("movie_zip", zipCode);
      var movieDate = $("#start-input").val().trim();
      var userDate = new Date(movieDate);
      var today =
        userDate.getFullYear() +
        "-" +
        (userDate.getMonth() + 1) +
        "-" +
        (userDate.getDate() + 1);

        //Gets movie info and displays it
      $.ajax({
        url: baseUrl+today+"&zip="+zipCode+"&api_key="+apikey,
        method: "GET"
      }).then(function(response){
            if (response == null) {
              return;
            }
            response.forEach(function(movie) {
              var movieTitle = movie.title;
              var nearest_time = false;
              var i = 0;
              while(nearest_time == false){
                var movieDate = movie.showtimes[i].dateTime.slice(0,-6);
                var movieTime = moment(movie.showtimes[i].dateTime.slice(-6), "THH:mm").format("h:mm A");
                var movieTheatre = movie.showtimes[i].theatre.name;
                if (movieDate+" "+movieTime >= moment().format("YYYY-MM-DD h:mm A") || i == movie.showtimes.length - 1){
                    nearest_time = true;
                }
                i++;
              }
              var movieCard = $(`
                  <div class="col-sm-3"></div>
                  <div class="col-sm-9">
                      <div class="card justify-content-center" style="width: 17rem; margin-top: 10px">
                          <ul class="list-group list-group-flush">
                              <li class="list-group-item">${movieTitle}</li>
                              <li class="list-group-item">${movieDate}</li>
                              <li class="list-group-item">${movieTime}</li>
                              <li class="list-group-item">${movieTheatre}</li>
                              <a href="#" id=button-view class="btn btn-primary">Add to Calendar</a>
                          </ul>
                      </div>
                  </div>
              `);
              $("#movieContent").append(movieCard);
            });
            $("#movieContent").on("click", "#button-view", function() {
                $(this).attr("data-toggle", "modal");
                $(this).attr("data-target", "#movie-modal");
              var movieBtn = $(this).siblings();
              //adds the specific movie as an event
              add_event(sessionStorage.getItem("uid"), movieBtn[0].innerText+" (Movie)", moment(movieBtn[2].innerText, "hh:mm A").format("HH:mm"), moment(movieBtn[2].innerText, "hh:mm A").add(2, 'hours').format("HH:mm"), moment(movieBtn[1].innerText, "YYYY-MM-DD"), sessionStorage.getItem("zip"), sessionStorage.getItem("movie_zip"));
              $("#movieContent").html("");
              $("#start-input").val("");
              $("#movieInputZip").val("");
            });
          
      });
    }
  });

  //This function checks if the signup forms are valid. If they are, a new user is created with Firebase Authentication
  function create_user(email, password){
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
    
          $("#error-body").text(errorMessage);
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

  //This function checks if sign in credentials are valid, and displays an error message if they are not
  function sign_in(email, password){
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        
          $("#error-body").text(errorMessage);
          $("#myModal").modal('show');
          $("#myModal").modal('show');
          
          $("#inputEmail").text("");
          $("#inputPassword").val("");

        });
  }

  //This function verifies that a zip is valid based on finding results in the Geonames API
  function location_verification(zip){
      var len = "hello";
      queryURL = "http://api.geonames.org/postalCodeSearchJSON?postalcode=" + zip + "&maxRows=10&username=charles.glass";
      $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
              localStorage.clear();
              localStorage.setItem("len", response.postalCodes.length);
      });

      if ((zip.length == 5) && (localStorage.getItem("len")> 0)){
          return true;
      }
      else{
          return false;
      }
  }

  //Function verifies that city, state, name, and other str fields are more than 0 characters long
  function city_state_name_verification(city, state, name){
      if ((city.length > 0) && (state.length > 0) && (name.length > 0)){
          return true;
      }
      else{
          return false;
      }
  }

  //This function checks if the user retyped their password correctly
  function confirm_password(pass, confirm){
      if (pass == confirm){
          return true;
      }
      else{
          return false;
      }
  }

  //This function returns whether the form submitted is the Sign-In or Sign-Up form
  function which_form(){
      return $(".submit-btn").text();
  }

  //This function checks the sign form for valid entries in required fields and submits it if everything is indeed valid
  function send_sign_form(){
      var form = which_form();
      if (form == "Sign Up"){
          var errors = [];
          var str_field_check = city_state_name_verification($("#inputCity").val().trim(), $("#inputState").val().trim(), $("#inputName").val().trim());
          var location_check = location_verification($("#inputZip").val().trim());
          var confirm_check = confirm_password($("#inputPassword").val(), $("#inputConfirmPassword").val());
          if (str_field_check == false){
              errors.push("Please fill in all required fields");
          }
          if (location_check == false){
              errors.push("Please enter a valid Zip Code");
          }
          if (confirm_check == false){
              errors.push("Your password confirmation failed");
          };
          if (errors.length == 0){
              //Create the user if there are no errors
              create_user($("#inputEmail").val().trim(), $("#inputPassword").val());
          }
          else{
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
          //signs the user in if the sign in form was submitted
          sign_in($("#inputEmail").val().trim(), $("#inputPassword").val().trim());
      }
  }

  //This function checks if the event form entries are valid, and creates the event in Firebase if they all were
  function send_event_form(){
      var errors = [];
      var even_titl = $("#event-title").val().trim();
      var str_field_origin_check = true;
      var str_field_dest_check = true;
      var zip_dest_check = true;
      var zip_origin_check = true;
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
        //adds the event if no errors
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


  }

  //This function adds the event information to firebase in a user/events/month path
  function add_event(uid, title, start_time, end_time, start_date, start_loc, end_loc){
      database.ref(uid+"/events/"+start_date.format("MMM")).push({
          event_title: title,
          start_date: start_date.format("YYYY-MM-DD"),
          end_time: end_time,
          start_time: start_time,
          start_loc: start_loc,
          end_loc: end_loc
      });
      //loads the calendar again after the event is added
      load_calendar(moment(), uid);
  }

  //This Firebase function occurs when a user signs in or signs out, extracts the user's unique id, and sets Firebase values based on given inputs
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        sessionStorage.setItem("uid", user.uid);
        //Checks that the user just signed up
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

    
    //This function retrieves user and event info from Firebase, and dynamically creates the calendar with current week dates, the user's events, and current and forecasted weather conditions, including the dynamic background
  function load_calendar(date, uid){
      database.ref(uid).once("value").then(function(snapshot){
          database.ref(uid+"/events/"+date.format("MMM")).once("value").then(function(snapshot_event){
            var events = [];
            snapshot_event.forEach(function(value){
                events.push({
                    event_title: value.val().event_title,
                    start_date: value.val().start_date,
                    end_time: value.val().end_time,
                    start_time: value.val().start_time,
                    start_loc: value.val().start_loc,
                    end_loc: value.val().end_loc
                });
            });
            sessionStorage.setItem("name", snapshot.val().name);
            sessionStorage.setItem("zip", snapshot.val().zip);
            var zip = sessionStorage.getItem("zip");
            var weather_data;
            var weather_api = "265a46d65db9c9a8b164aa9180136f67";
            var weatherQuery = "https://api.openweathermap.org/data/2.5/forecast?zip="+sessionStorage.getItem("zip")+",us&appid="+weather_api;
            
            //Gets current weather and future weather with API call
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
                        //Creates Month Year caption for calendar
                        $("#month-caption").text("");
                        $("#month-caption").prepend(date.format('MMMM YYYY'));
                        
                        //Shows inputted date as the default date jump text
                        $("#date-jump-text").val(date.format("YYYY-MM-DD"));

                        //Hides sign-in/sign-up forms
                        $(".sign-in").hide();
                        $(".calendar-container").show();
                        $(".nav-events").show();
                        $(".credit").show();
                
                        //Shows background video
                        $("#myVideo").show();
                        $("tbody").html("");

                        //Sets name
                        $("#name-calendar").text(sessionStorage.getItem("name")+ "'s Calendar");
                        var current_weather = sessionStorage.getItem("weather");
                        weather_data = response_main.list;

                        //for loop creates the dates frozen header in the calendar with current and forecasted weather conditions
                        for (var i = 1; i < 8; i++){
                            var current_date = moment(date.format('MMM D YYYY'), 'MMM D YYYY');
                            var dt = current_date.add(i-1, 'days');
                            var weather_html = "";
                            if (dt.format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")){
                                var current_date_2 = moment(dt.format('MMM D YYYY'), 'MMM D YYYY');
                                        var weather_html = "";
                                        //Creates weather icons
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
                                        //Sets currently selected date to blue background with white text
                                        if (i == 1){
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

                            //Creates date header for each date
                            $("#day-"+i+"-date").html("<span class = 'day-display'>"+dt.format('dddd')+"</span><br>"+weather_html+"<br> <span class = 'date-display'>"+dt.format('D')+"</span>");
                            $("#day-"+i+"-date").attr("data-date", dt.format("YYYY-MM-DD"));
        
                            //No right border on last day of calendar
                            $("day-7-date").css("border-right", "none !important");
                            if (sessionStorage.getItem("weather") != "Clear" || moment().format("HH:mm") >= "17:30" || moment().format("HH:mm") <= "06:30"){
                                $(".day-display").css("color", "white");
                                $(".date-display").css("color", "white");
                            }
                        };
                        var calendar_body = $("tbody");

                        //for loop dynamically creates the time cells
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
                                if (j==6){
                                    cell.css("border-right", "none !important");
                                }
                                else{
                                    cell.css("border-right" ,"solid 1px lightgrey");
                                }
                                // cell.attr("data-datetime", "");
                                cell.attr("data-datetime", $("#day-"+day+"-date").attr("data-date")+ " " + time.format("HH:mm"));
                                cell.data("datetime", $("#day-"+day+"-date").attr("data-date")+ " " + time.format("HH:mm"));
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

                        //This for loop dynamically styles and sets the title of the given event based on time and weather
                        for(var i = 0; i < events.length; i++){
                            var start_datetime =events[i].start_date + " " +events[i].start_time;
                            var start_datetime_lookup =events[i].start_date + " " + moment(events[i].start_time, "HH:mm").format("HH")+":00";
                            var end_datetime =events[i].start_date + " " +events[i].end_time;

                            var focused_cell = $("td[data-datetime = '"+start_datetime_lookup+"']");
                            focused_cell.html("");
                            if (moment(start_datetime, "YYYY-MM-DD HH:mm").diff(moment(start_datetime_lookup, "YYYY-MM-DD HH:mm"), "minutes") >= 30){
                                if (sessionStorage.getItem("weather") != "Clear" || moment().format("HH:mm") >= "17:30" || moment().format("HH:mm") <= "06:30"){
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
                                if (sessionStorage.getItem("weather") != "Clear" || moment().format("HH:mm") >= "17:30" || moment().format("HH:mm") <= "06:30"){
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
                            //Keeps setting background to blue until endtime
                            while (populating_event_cell == true){
                                var focused_time = moment(start_datetime_lookup, "YYYY-MM-DD HH:mm").add(j, "hours").format("YYYY-MM-DD HH:mm");
                                var focused_added_cell = $("td[data-datetime = '"+focused_time+"']");
                                if (moment(end_datetime, "YYYY-MM-DD HH:mm").diff(moment(focused_time, "YYYY-MM-DD HH:mm"), 'minutes') <= 0){
                                    populating_event_cell = false;
                                }
                                else if (moment(end_datetime, "YYYY-MM-DD HH:mm").diff(moment(focused_time, "YYYY-MM-DD HH:mm"), 'minutes') <= 30){
                                    if (sessionStorage.getItem("weather") != "Clear" || moment().format("HH:mm") >= "17:30" || moment().format("HH:mm") <= "06:30"){
                                        focused_added_cell.css("background", "linear-gradient(to bottom, #007bff 0%,#007bff 50%,#007bff 50%,#212529 50%,#212529 100%)");
                                    }
                                    else{
                                        focused_added_cell.css("background", "linear-gradient(to bottom, #007bff 0%,#007bff 50%,#007bff 50%,white 50%,white 100%)");
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
                                j++;
                                
                            }
                        };
                        //Shows popover with event information on hover
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
                                $("tbody").html("");
                                load_calendar(moment($("#date-jump-text").val(), "YYYY-MM-DD"), sessionStorage.getItem("uid"));
                                database.ref(sessionStorage.getItem("uid")).update({
                                    last_login: moment().format("YYYY-MM-DD hh:mm a")
                                });
                            }
                            else{
                            }
                        });
                });

            });

            });

            //Reminds users of upcoming events within 15 minutes, and will do so every 10 minutes
            reminder_popup();
            setInterval(reminder_popup, 600000);
            function reminder_popup(){
                    $("#reminder-body").html("");
                    database.ref(uid+"/events/"+date.format("MMM")).once("value").then(function(snap){  
                          var reminders = [];
                        snap.forEach(function(value){
                            var reminder_warning = 15;
                            var event_datetime = value.val().start_date + " " + value.val().start_time;
                            var reminder = "";
                            if (moment().add(reminder_warning, 'minutes').format("YYYY-MM-DD HH:mm") >= event_datetime && moment().format("YYYY-MM-DD HH:mm") < event_datetime){
                                reminder = "<b>"+value.val().event_title + "</b> is coming up at <b>"+ moment(event_datetime, "YYYY-MM-DD HH:mm").format("MMM D, YYYY h:mm A") + "</b>.";
                                reminders.push(reminder);
                            }
                        });
                            if (reminders.length > 0){
                                reminders.forEach(function(value){
                                    $("#reminder-body").append($("<div>").html(value));
                                });
                                $("#myReminderModal").modal('show');
                            }
                            else{
                            }

 
                        });
                }

        });

  }
    //Hides calendar components when user first goes to page and does so until sign-in/sign-up
    $("#myVideo").hide();
    $(".calendar-container").hide();
    $(".nav-events").hide();
    $(".credit").hide();

    //Adds more fields to event form if you want to add a new location (default is the zip you signed up with)
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
  
    //Sends event form
  $("#event-submit").on("click", function(event){
      event.preventDefault();
      send_event_form();
  });
  //Sends sign form
  $(".submit-btn").on("click", function(event){
    event.preventDefault();
    send_sign_form();
    });
    //Sets background color of sign page sign in button and hides sign up info
  $(".sign-in-select").on("click", function(){
      $(this).css("color", "white");
      $(this).css("background-color", "#007bff");
      $(".sign-up-select").css("color", "black");
      $(".sign-up-select").css("background-color", "white");

      $(".exclusive").hide();

      $(".submit-btn").text("Sign In");
  });

  //Sets sign up button to different color
  $(".sign-up-select").on("click", function(){
      $(this).css("color", "white");
      $(this).css("background-color", "#007bff");
      $(".sign-in-select").css("color", "black");
      $(".sign-in-select").css("background-color", "white");

      $(".exclusive").show();

      $(".submit-btn").text("Sign Up");
  });

  //Uses firebase to sign user out and hides calendar elements to show sign elements again
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

  $(document).on("click", ".event-cell", function(){
            // Adds the calendar time selection to the start time input on event form
            $("#event-start-time").val($(this).val());//puts start time in event modal relative to cell selected
            $("#event-start-date").val($(this).attr("data-datetime").split(" ")[0]);
            $("#event-end-time").val(moment($(this).val(), "HH:mm").add(1, 'hours').format("HH:mm"));
    });

