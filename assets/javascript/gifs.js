$(document).ready(function() {
    
    // declare variables
    var movies = ["Toy Story","Monsters, Inc.","Finding Nemo","The Incredibles","Up","Inside Out"];
    var gifResults;
    var i;

    // make buttons
    function addButtons() {
        $("#buttons").empty();
        for (i = 0; i < movies.length; i++) {
            var buttons = $("<button>").addClass("characterBtn").attr("data-name", movies[i]).text(movies[i]).css("textTransform", "capitalize");
            $("#buttons").append(buttons);
        };
    };
    addButtons();

    // disable input field by default
    $("#pixarMovieSubmit").prop("disabled",true);
    $("#pixarInput").keyup(function() {
        $("#pixarMovieSubmit").prop("disabled", this.value == "" ? true : false);
    });

    // add click function for adding a new button
    $("#pixarMovieSubmit").on("click", function(event) {
        event.preventDefault();
        var pixarMovie = $("#pixarInput").val().trim();
	    movies.push(pixarMovie);
        $("#pixarInput").val("");
        $("#pixarMovieSubmit").prop("disabled",true);
        $("#pixarInput").keyup(function(){
            $("#pixarMovieSubmit").prop("disabled", this.value == "" ? true : false);     
        });
        addButtons();
        getData();
    });

    // add click function after page load to grab info
    function getData() {
        $("button").on("click", function() {
            // grabbing and storing the data-name property value from the button
            var name = $(this).attr("data-name");
            
            $("#pixarGIFs").html("");
            
            // console.log(name);
            // added "Pixar " to narrow the search down
            var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + "Pixar " + name + "&api_key=sblaAmKxYnbI6e15gS95XuAMeqpbV64E";

            // api/ajax function to get response
            $.ajax({
                url: gifURL,
                method: "GET"
            }).then(function(response) {
                var results = response.data;
                console.log(results);
                // looping through each result item
                for (var i = 0; i < 10; i++) {
                // creating and storing a div tag
                var characterDiv = $("<div>").addClass("gifDiv");
                // create a p tag for displaying the rating
                var rating = (results[i].rating).toUpperCase();
                var p = $("<p>").html("Rating: " + rating);
                // creating and storing an image tag which is the gif
                var characterImage = $("<img>").attr({
                    class : "gif",
                    // setting the src attribute of the image to a property pulled off the result item
                    "src" : results[i].images.fixed_height_still.url,
                    "data-state" : "still",
                    "data-still" : results[i].images.fixed_height_still.url,
                    "data-animate" : results[i].images.fixed_height.url
                });
                
                // appending the paragraph and image tag to the pixarGIFs div
                characterDiv.append(characterImage);
                characterDiv.append(p);
                // prepend the gifs to the HTML page in the pixarGIFs div
                $("#pixarGIFs").prepend(characterDiv);
                }
            }); 
        });
    } getData();

    // animate
    $(document).on("click", ".gif", function () {
        //$(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else, set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});