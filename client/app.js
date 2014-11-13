require.config({
  paths: {
    "jquery": ["bower_components/jquery/jquery.min"],
    "underscore": "bower_components/underscore/underscore-min",
    "backbone": "bower_components/backbone/backbone"
  },
  shim: {
    "backbone": {
            //loads dependencies first
      deps: ["jquery", "underscore"],
            //custom export name, this would be lowercase otherwise
      exports: "Backbone"
    }
  }
});

//requiring the scripts in the first argument and then passing the library namespaces into a callback
//you should be able to console log all of the callback arguments
require([
  'jquery', 
  'underscore', 
  'backbone', 
  'data/data.js',
  'collections/Songs',
  'models/AppModel',
  'views/AppView'], 
  
  function(jquery, _, Backbone, songData, Songs, AppModel, AppView){
    console.log('init');

    // set up model objects
    var library = new Songs(songData);
    var app = new AppModel({library: library});

    // // build a view for the top level of the whole app
    var appView = new AppView({model: app});

    // put the view onto the screen
    $('body').append(appView.render());
    window.library = library;
    window.app = app;
    window.appView = appView;
  }
);