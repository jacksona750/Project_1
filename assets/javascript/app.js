
// The values below will be pulled from our location query




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
    // var config = {
    //     apiKey: "AIzaSyCxFLkeQbYJRU5z5b2nOBCIgz3-XeJpA_4",
    //     authDomain: "calendar-app-47185.firebaseapp.com",
    //     databaseURL: "https://calendar-app-47185.firebaseio.com",
    //     projectId: "calendar-app-47185",
    //     storageBucket: "calendar-app-47185.appspot.com",
    //     messagingSenderId: "753398671721"
    // };
    var config = {
        apiKey: "AIzaSyDOFuIjeIWlGBNnWw-0RH6jjsZ_OykRQSQ",
        authDomain: "ucla-example-99639.firebaseapp.com",
        databaseURL: "https://ucla-example-99639.firebaseio.com",
        projectId: "ucla-example-99639",
        storageBucket: "ucla-example-99639.appspot.com",
        messagingSenderId: "734061672266"
      };
    firebase.initializeApp(config);

    var database = firebase.database();

    // database.ref('charlieglass').set({
    //     msg: 'Hello'
    // });

    // database.ref('charlieglass').on("value", function(snapshot){
    //     console.log(snapshot.val().msg);
    // });



    var keySize = 256;
    var ivSize = 128;
    var iterations = 100;

    var message = "Hello World";
    var password = "Secret Password";


    function encrypt (msg, pass) {
        var salt = CryptoJS.lib.WordArray.random(128/8);
        
        var key = CryptoJS.PBKDF2(pass, salt, {
            keySize: keySize/32,
            iterations: iterations
            });

        var iv = CryptoJS.lib.WordArray.random(128/8);
        
        var encrypted = CryptoJS.AES.encrypt(msg, key, { 
            iv: iv, 
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        
    });
    
    // salt, iv will be hex 32 in length
    // append them to the ciphertext for use  in decryption
    var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
    return transitmessage;
    }

    function decrypt (transitmessage, pass) {
        var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
        var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
        var encrypted = transitmessage.substring(64);
        
        var key = CryptoJS.PBKDF2(pass, salt, {
            keySize: keySize/32,
            iterations: iterations
            });

        var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
            iv: iv, 
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
            
        })
        return decrypted;
    }

    var encrypted = encrypt(message, password);
    // var decrypted = decrypt(encrypt(message, "Secret Password"), password).toString(CryptoJS.enc.Utf8);

    console.log($(".submit-btn").text());
    console.log(decrypt(encrypted, password).toString(CryptoJS.enc.Utf8));
    console.log(decrypt(encrypt(message, "Secret Password"), password).toString(CryptoJS.enc.Utf8));
    console.log("charlieglass".split("@"));

    function email_verification(email){
        var email_split = email.split("@"); 
        if (email_split.length == 2){
            var website = email_split[1].split(".");
            if ((website == "com") || (website == "org") || (website == "net") || (website == "edu")){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }

    function location_verification(zip){
        queryURL = "http://api.geonames.org/postalCodeSearchJSON?postalcode=" + zip + "&maxRows=10&username=charles.glass";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response)
            if ((zip.length == 5) && (response.postalCodes.length > 0)){
                return true;
            }
            else{
                return false;
            }
        });
    }

    function city_state_name_verification(city, state, name){
        if ((city.trim().length > 0) && (state.trim().length() > 0) && (name.trim().length() > 0)){
            return true;
        }
        else{
            return false;
        }
    }

    function password_verification(password){
        if (password.length >= 8){
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

    function email_exists(username){
        database.ref(username).once('value', function(snapshot){
            if (snapshot.val() == null){
                return true;
            }
            else{
                return false;
            }
        });
    }

    function which_form(){
        return $(".submit-btn").text();
    }


    function load_calendar(date){
        var month_caption = $("<caption>");
        month_caption.text(date.format('MMMM'));
        $(".calendar").append(month_caption);
        
        $("nav").css("background-color", "#32383e");

        $(".sign-in").hide();
        $(".calendar-container").show();
        $(".nav-events").show();

        $("#myVideo").show();

        for (var i = 1; i < 8; i++){
            var current_date = moment(date.format('MMM D YYYY'), 'MMM D YYYY');
            // console.log(date.format('MMM Do'));
            var dt = current_date.add(i-1, 'days');
            // console.log(i-1+": "+dt.format('MMM Do'));
            $("#day-"+i+"-date").html("<span class = 'day-display'>"+dt.format('dddd')+"</span><br> <span class = 'date-display'>"+dt.format('D')+"</span>");
            $("#day-"+i+"-date").attr("data-date", dt.format("YYYY-MM-DD"));
        
        };

        $("#day-1-date").css("background-color", "#007bff");
        $("#day-1-date").css("border-radius", "none !important");
        $("day-7-date").css("border-right", "none !important");
        $(".day-display").css("color", "white");
        $(".date-display").css("color", "white");

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
                if (j==6){
                    cell.css("border-right", "none !important");
                }
                else{
                    cell.css("border-right" ,"solid 1px lightgrey");
                }
                cell.attr("data-datetime", $("#day-"+day+"-date").attr("data-date")+ " " + time.format("h:mm a"));
                cell.val(time.format("HH:mm"));
                cell.attr("data-toggle", "modal");//create modal for cell selected
                cell.attr("data-target", "#event-modal");
                cell.addClass("event-cell");
                row.append(cell);
            }

            calendar_body.append(row);
        }
        $("#scroll-body").append(calendar_body);
    }


    $("#myVideo").hide();
    $(".calendar-container").hide();
    $(".nav-events").hide();


    $(".submit-btn").on("click", function(event){
        event.preventDefault();
        load_calendar(moment());
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
  
    var someID = ''
    $(document).on("click", ".event-cell", function(){
      // Adds the calendar time selection to the start time input on event form
      $("#event-start-time").val($(this).val());//puts start time in event modal relative to cell selected
      $("#event-end-time").val(moment($(this).val(), "HH:mm").add(1, 'hours').format("HH:mm"));        $(this).css("background", "linear-gradient(to bottom, #212529 0%,#212529 50%,#212529 50%,#007bff 50%,#007bff 100%)");
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
