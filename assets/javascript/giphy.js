var Giphytastic =
{
  // DOM elements to update, jQuery handles
  d_buttons:    $("#buttons"),
  d_gifs:       $("#gifs"),
  // array of button names
  buttons: ["Star Trek", "Star Wars", "The Matrix", "The Expanse", "Continuum"],
  // GIF limit
  limit: 10,
  // method to add a button
  add_button: function ()
  {
    // append to bottons array
    // display the button
  },
  // method to display a button
  display_button: function (button)
  {
    var button;

    button = $('<button class="btn btn-success subject float-left mr-2">'+button+'</button>');
    this.d_buttons.append(button);
  },
  // method to display all buttons
  display_all_buttons: function ()
  {
    this.d_buttons.empty();
    for (var i = 0; i < this.buttons.length; ++i)
    {
      this.display_button(this.buttons[i]);
    }
  },
  // method to get GIFs of the given subject
  random_gifs: function (subject)
  {
    // clear the display
    Giphytastic.d_gifs.empty();
    // query Giphy for GIFs
    $.ajax(
    {
      url: "https://api.giphy.com/v1/gifs/search?api_key=2NSUkoto46BJKC6mgko4RKD1vqgESOCX&q="+subject+"&limit="+Giphytastic.limit,
      method: 'GET'
    }).done(function(response)
    {
      console.log(response);

      for (var i = 0; i < Giphytastic.limit; ++i)
      {
        gif = $('<img>',
          {
            id:    'gif'+i,
            class: 'giphy',
            src:   response.data[i].images.fixed_width_still.url,
          });
        gif.css('margin', '0 20px 20px 0');
        Giphytastic.d_gifs.append(gif);
      }
    });

  },
};

//
// Mainline Code
//
Giphytastic.display_all_buttons();

//
// Event Functions
//

// Click function for the start buttons
Giphytastic.d_buttons.on('click', 'button.subject', function()
{
  Giphytastic.random_gifs($(this).text());
});

//
// Utility Functions
//
