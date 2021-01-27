/*
   Let webpack know we are using those css files.
   ExtractTextPlugin will use those lines to know what to pull out to external css.
 */
//import '../stylesheets/app.scss';


// Import modules
import myTeamInitializer from './myTeam/initializer';

// Initialize modules
$(() => {
  myTeamInitializer();
});

// Initialize fastclick - remove 300ms delay on touch-enabled devices
$(() => {
  /*
    iPad/Safari had issues with this script on features:
      Label interceptors (or checkboxes in general)
      Google Autocomplete address selection
      Event was not passed down to event handlers for some reason
  */
  const isApple = navigator.userAgent.match(/(iPad|iPhone|iPod)/g);

  if (!isApple || isApple.length === 0) {
    FastClick.attach(document.body);
  }
});
