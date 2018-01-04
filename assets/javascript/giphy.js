var Giphytastic =
{
  // DOM elements to update, jQuery handles
  d_buttons:    $("#buttons"),
  d_form:       $("#form"),
  d_gifs:       $("#gifs"),
  // array of button names
  buttons: ["Star Trek", "Star Wars", "The Matrix", "The Expanse", "Continuum", "Dark Matter", "Agents of SHIELD", "The Magicians", "Stranger Things"],
  // GIF limit
  limit: 10,
  // current gifs
  cur_gifs: null,
  // currently animating - array to hold booleans
  cur_animating: [false],
  // method to add a button
  add_button: function ()
  {
    // append to bottons array
    // display the button
  },
  // method to display a button
  display_button: function (button)
  {
    var button = $('<button class="btn btn-success subject float-left mr-2 mb-2">'+button+'</button>');
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
  // method to display the form
  display_form: function ()
  {
    this.d_form.empty();
    var form = $('<form>'
        +'<label for="subject_in" class="mr-1">Add a Subject:</label>'
        +'<input type="text" id="subject_in"><br>'
        +'<button type="submit" class="btn submit btn-primary">Submit</button>'
      +'</form>');
    this.d_form.append(form);
  },
  // method to get GIFs of the given subject
  fetch_gifs: function (subject)
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
      Giphytastic.cur_gifs = response.data;

      for (var i = 0; i < Giphytastic.limit; ++i)
      {
        gif = '<img id="'+i+'gif" class="card-img-top giphy" src='+response.data[i].images.fixed_width_still.url+' alt="'+response.data[i].images.fixed_width_still.url+'"/>';

        // Model for an Image Card
        // <div id="card"+i class="card float-left mr-2 mb-2">
        //   <div class="card-body">
        //     <img/>
        //     <p id="rating"+i class="card-text text-center">Rating:+response.data[i].rating.touppercase()</p>
        //   </div>
        // </div>

        card = $('<div class="col-sm-3">'
            +'<div id="card"+i class="card mb-2">'
            +'<div class="card-body">'
              +gif
              +'<p id="rating"'+i+' class="card-text text-center">Rating: '+response.data[i].rating.toUpperCase()+'</p>'
            +'</div>'
          +'</div>'
        +'</div>');

        Giphytastic.d_gifs.append(card);
        // set to not animating
        Giphytastic.cur_animating[i] = false;
      }
    });
  },
};

//
// Mainline Code
//
Giphytastic.display_all_buttons();
Giphytastic.display_form();

//
// Event Functions
//

// Click function for the start buttons
Giphytastic.d_buttons.on('click', 'button.subject', function()
{
  Giphytastic.fetch_gifs($(this).text());
});

// Click function for the start buttons
Giphytastic.d_gifs.on('click', 'img.giphy', function()
{
  var num = this.id.slice(0, 1);
  console.log("img:", this, "num:", num);

  if (Giphytastic.cur_animating[num])
  {
    // animating, load still
    $('#'+this.id).attr('src', Giphytastic.cur_gifs[num].images.fixed_width_still.url);
    Giphytastic.cur_animating[num] = false;
  } else {
    // not animating, load animation
    $('#'+this.id).attr('src', Giphytastic.cur_gifs[num].images.fixed_width.url);
    Giphytastic.cur_animating[num] = true;
  }
});

// This function handles events where a movie button is clicked
Giphytastic.d_form.on("click", 'button.submit', function(event)
{
  // prevent reload of page
  event.preventDefault();
  // grab the input from the textbox
  var subject = $("#subject_in").val().trim();
  // add the button to the array (future-proof the app so it works with display_all_buttons)
  Giphytastic.buttons.push(subject);
  // display the new button
  Giphytastic.display_button(subject);
  // now clear the form
  $("#subject_in").val("");
});

//
// Utility Functions
//
