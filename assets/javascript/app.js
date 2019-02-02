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
});