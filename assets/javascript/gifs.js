$(document).ready(function() {
    
    // declare variables
    var characters = ["Stan Marsh","Kyle Brofloski","Eric Cartman","Kenny McCormick","Randy Marsh","Token Black","Craig Tucker","Towelie"];
    var gifResults;
    var i;
    

    // make buttons
    function addButtons() {
        $("#spButtons").empty();
        for (i = 0; i < characters.length; i++) {
            var buttons = $("<button>").addClass("characterBtn").attr("data-name", characters[i]).text(characters[i]).css("textTransform", "capitalize");
            $("#spButtons").append(buttons);
        };
    };
    addButtons();

    // disable input field by default
    $("#spCharacterSubmit").prop("disabled",true);
    $("#spInput").keyup(function() {
        $("#spCharacterSubmit").prop("disabled", this.value == "" ? true : false);
    });

    // add click function for adding a new button
    $("#spCharacterSubmit").on("click", function(event) {
        event.preventDefault();
        var spCharacter = $("#spInput").val().trim();
	    characters.push(spCharacter);
        $("#spInput").val("");
        $("#spCharacterSubmit").prop("disabled",true);
        $("#spInput").keyup(function(){
            $("#spCharacterSubmit").prop("disabled", this.value == "" ? true : false);     
        });
        //console.log(characters);
        addButtons();
        getData();
    });

    // add click function after page load to grab info
    function getData() {
        $("button").on("click", function() {
            // grabbing and storing the data-name property value from the button
            var name = $(this).attr("data-name");
            // the line below was going to clear the gifs so that the page wouldn't get
            // really long on each button click... according to the instructions
            // it should just add them
            //$("#spGIFs").html("");
            // api/ajax function to get response
            console.log(name);
            var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=sblaAmKxYnbI6e15gS95XuAMeqpbV64E";

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
                    //"data-state" : "still",
                    "src" : results[i].images.fixed_height.url,
                    "data-still" : results[i].images.fixed_height_still.url,
                    "data-animate" : results[i].images.fixed_height.url
                });
                //$(".gif").attr("data-state", "still");
                // setting the src attribute of the image to a property pulled off the result item
                // characterImage.attr("src", results[i].images.fixed_height.url);
                // characterImage.attr(data-state, "still");
                // appending the paragraph and image tag to the spGIFs div
                characterDiv.append(characterImage);
                characterDiv.append(p);
                // prepend the gifs to the HTML page in the spGIFs div
                $("#spGIFs").prepend(characterDiv);
                }
            }); 
        });
        //$(document).on("click", ".gif", animateGIFs);
    } getData();

    // animate
    $(document).on("click", ".gif", function () {
        //$(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});