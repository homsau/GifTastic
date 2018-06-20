$(document).ready(function() {
    
    // declare variables
    var characters = ["Stan Marsh","Kyle Brofloski","Eric Cartman","Kenny McCormick","Randy Marsh","Token Black","Craig Tucker","Towelie"];
    var gifResults;
    var i;
    

    // make buttons
    function addButtons() {
        $("#spButtons").empty();
        for (i = 0; i < characters.length; i++) {
            var buttons = $("<button>").addClass("characterBtn").attr("data-name", characters[i]).text(characters[i]);
            $("#spButtons").append(buttons);
        };
    };
    addButtons();

    // disable input field by default
    $("#spCharacterSubmit").prop("disabled",true);
    $("#spInput").keyup(function() {
        $("#spCharacterSubmit").prop("disabled", this.value == "" ? true : false);
    });

    // add click function
    $("#spCharacterSubmit").on("click", function(event) {
        event.preventDefault();
        var spCharacter = $("#spInput").val().trim();
        $(spCharacter).css("textTransform", "capitalize");
	    characters.push(spCharacter).css("textTransform", "capitalize");
        $("#spInput").val("");
        $("#spCharacterSubmit").prop("disabled",true);
        $("#spInput").keyup(function(){
            $("#spCharacterSubmit").prop("disabled", this.value == "" ? true : false);     
        });
        //console.log(characters);
        addButtons();
        getData();
    });

    function getData() {
        $("button").on("click", function() {
            // grabbing and storing the data-name property value from the button
            var name = $(this).attr("data-name");
            
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
                for (var i = 0; i < results.length; i++) {

                // creating and storing a div tag
                var characterDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var characterImage = $("<img>");
                
                // Setting the src attribute of the image to a property pulled off the result item
                characterImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the animalDiv
                characterDiv.append(p);
                characterDiv.append(characterImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#spGIFs").prepend(characterDiv);
                }
            });
        });
    // add click function after page load
    // animate// Creates variables
    } getData();
});