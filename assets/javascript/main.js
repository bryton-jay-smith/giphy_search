$(document).ready(function () {

  var gifSugg = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];

  var history = [];

  function createBttn(arraySelect, classSelect, idSelect) {
    $(idSelect).empty();
    for (var i = 0; i < arraySelect.length; i++) {
      var a = $("<button>");
      a.addClass(classSelect);
      a.attr("data-type", arraySelect[i]);
      a.text(arraySelect[i]);
      $(idSelect).prepend(a);
    }
  };

  $(document).on("click", ".gifItem", function() {
    $("#results").empty();
    $(".gifItem").removeClass("active");
    $(this).addClass("active");
    var queryText = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryText + apiURL;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class=\"searchResult\">");
          var rating = results[i].rating;
          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;
          var gifImage = $("<img>");
          gifImage.attr("src", still);
          gifImage.attr("data-still", still);
          gifImage.attr("data-animate", animated);
          gifImage.attr("data-state", "still");
          gifImage.addClass("gifResult");
          gifDiv.append(gifImage);
          gifDiv.append("<div class=\"rating\">" + "Rating: " + rating + "</div>");
          $("#results").append(gifDiv);
        }
      });
  });

  $(document).on("click", ".gifResult", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#searchButton").on("click", function (event) {
    event.preventDefault();
    var newQuery = $("#searchBox").val().trim();
    history.push(newQuery);
    createBttn(history, "gifItem", "#historyBox");
    $("#results").empty();
    $(".gifItem").removeClass("active");
    $(this).addClass("active");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + newQuery + apiURL;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class=\"searchResult\">");
          var rating = results[i].rating;
          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;
          var gifImage = $("<img>");
          gifImage.attr("src", still);
          gifImage.attr("data-still", still);
          gifImage.attr("data-animate", animated);
          gifImage.attr("data-state", "still");
          gifImage.addClass("gifResult");
          gifDiv.append(gifImage);
          gifDiv.append("<div class=\"rating\">" + "Rating: " + rating + "</div>");
          $("#results").append(gifDiv);
        }
      });
  });

  createBttn(gifSugg, "gifItem", "#suggestionBox");
});