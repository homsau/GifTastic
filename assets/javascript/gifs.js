$(document).ready(function() {
    
    // declare variables
    var movies = ["Toy Story","Monsters, Inc.","Finding Nemo","The Incredibles","Up","Inside Out"];
    var gifResults;
    var i;
    var j;
    var name = "";
    var loadMore = "false";

    // make buttons
    function addButtons() {
        // clear buttons and add all again in case a new one is added
        $("#buttons").empty();
        for (i = 0; i < movies.length; i++) {
            var buttons = $("<button>").addClass("movieBtn").attr("data-name", movies[i]).text(movies[i]).css("textTransform", "capitalize");
            $("#buttons").append(buttons);
        };
        //$("#more").addClass("movieBtn");
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
            // if the button that has already been selected is pressed again, wipe the gifs
            // and load the same ones again + 10.
            if ($(this).attr("data-name") === name) {
                name = $(this).attr("data-name");
                console.log(this);
                loadMore = true;
                $("#pixarGIFs").html("");
                j = j + 10;
            } else {
                // wipe the gifs and load 10 gifs for the new button pushed
                name = $(this).attr("data-name");
                $("#pixarGIFs").html("");
                j = 10;
            }
            // $("#more").attr("data-name", name).css("display","block");
            /*$("button#more").on("click", function() {
                getData();
            });*/
            console.log(loadMore);
            console.log(name);
            // added "Pixar " to narrow the search down
            var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + "Pixar " + name + "&api_key=sblaAmKxYnbI6e15gS95XuAMeqpbV64E";

            // api/ajax function to get response
            $.ajax({
                url: gifURL,
                method: "GET"
            }).then(function(response) {
                var results = response.data;
                console.log(results);
                // TOTAL OF 25 SO CAN'T LOAD MORE THAN THAT
                
                // looping through each result item
                for (i = 0; i < j; i++) {
                    // creating and storing a div tag
                    var characterDiv = $("<div>").addClass("gifDiv");
                    // create a p tag for displaying the rating
                    var rating = (results[i].rating).toUpperCase();
                    var pRating = $("<p>").html("Rating: " + rating);
                    var pTitle = $("<p>").html("Title: " + (results[i].title));
                    // creating and storing an image tag which is the gif
                    var characterImage = $("<img>").attr({
                        class : "gif",
                        // setting the src attribute of the image to a property pulled off the result item
                        "src" : results[i].images.fixed_height_still.url,
                        "data-state" : "still",
                        "data-still" : results[i].images.fixed_height_still.url,
                        "data-animate" : results[i].images.fixed_height.url
                    });

                    /*function loadMoreGIFs() {
                        console.log("hi");
                    }*/

                    // appending the paragraph and image tag to the pixarGIFs div
                    characterDiv.append(characterImage);
                    characterDiv.append(pRating);
                    characterDiv.append(pTitle);
                    // append the gifs to the HTML page in the pixarGIFs div
                    $("#pixarGIFs").append(characterDiv);
                }
            }); 
        });
    } getData();

    // animate gifs
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