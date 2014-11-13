// App.js - Defines a backbone model class for the whole app.
define(['backbone',
  'models/SongModel',
  'collections/songQueue'], function (Backbone, SongModel, SongQueue) {

    var AppModel = Backbone.Model.extend({

      initialize: function(params){
        this.set('currentSong', new SongModel());
        this.set('songQueue', new SongQueue());
        
        this.get('library').on('play', function(song){
          this.set('currentSong', song);
        }, this);

        this.get('library').on('enqueue', function(song){
          this.get('songQueue').enqueue(song);
        }, this);

        this.get('currentSong').on('ended', this.playNextSong, this);


      },

      playNextSong: function(){
        console.log('play next song');
        this.set('currentSong', (this.get('songQueue').shift()|| new SongModel()));
        this.get('currentSong').on('ended', this.playNextSong, this);
      }

    });

    return AppModel;
  }
);