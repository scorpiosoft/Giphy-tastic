var Giphytastic =
{
  // DOM elements to update, jQuery handles
  d_buttons:    $("#buttons"),
  d_gifs:       $("#gifs"),
  // array of button names
  buttons: ["Star Trek", "Star Wars", "The Matrix", "The Expanse", "Continuum"],
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

    button = $('<button class="btn btn-success float-left mr-2">'+button+'</button>');
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
};

//
// Mainline Code
//
Giphytastic.display_all_buttons();

//
// Event Functions
//

//
// Utility Functions
//
