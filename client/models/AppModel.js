// App.js - Defines a backbone model class for the whole app.
define(['backbone',
  'models/SongModel',
  'collections/songQueue'], function (Backbone, SongModel, SongQueue) {

    var AppModel = Backbone.Model.extend({

      initialize: function(params){
        this.set('currentSong', new SongModel());
        this.set('songQueue', new SongQueue());
        _library = params.library;
        
        _library.on('play', function(song){
          this.set('currentSong', song);
        }, this);
      }

    });

    return AppModel;
  }
);