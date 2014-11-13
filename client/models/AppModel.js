// App.js - Defines a backbone model class for the whole app.
define(['backbone',
  'models/SongModel',
  'collections/songQueue'], function (Backbone, SongModel, SongQueue) {

    var AppModel = Backbone.Model.extend({

      initialize: function(params){
        this.playSong( new SongModel() );
        this.set('songQueue', new SongQueue());
        
        this.get('library').on('play', this.playSong, this);

        this.get('library').on('enqueue', function(song){
          this.get('songQueue').enqueue(song);
        }, this);

      },

      playNextSong: function(){
        var nextSong = this.get('songQueue').shift();
        if (nextSong) {
          console.log('play next song');
          this.playSong(nextSong);
        } else {
          console.log('no more songs in queue');
        }
      },

      playSong: function(song) {
          // remove listener from current song
          if (this.get('currentSong')){
            this.get('currentSong').off('ended', this.playNextSong, this);
          }
          // set new current song
          this.set('currentSong', song);
          // attach listener to current song
          this.get('currentSong').on('ended', this.playNextSong, this);
      }

    });

    return AppModel;
  }
);