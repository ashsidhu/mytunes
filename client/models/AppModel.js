// App.js - Defines a backbone model class for the whole app.
define(['backbone',
  'models/SongModel',
  'collections/songQueue'], function (Backbone, SongModel, SongQueue) {

    var AppModel = Backbone.Model.extend({

      initialize: function(params){
        this.set('currentSong', new SongModel()); //set an empty song only for the first time
        this.set('songQueue', new SongQueue());
        
        // library passed in params
        this.get('library').on('play', this.playSong, this);

        this.get('library').on('enqueue', function(song){
          this.get('songQueue').enqueue(song);
        }, this);

        this.get('library').on('ended', function(song) {
          this.get('songQueue').dequeue();
          console.log('song ended and dequeued');
        }, this);

      },

      playNextSong: function(){
        var nextSong = this.get('songQueue').getNextSong();
        if (nextSong) {
          console.log('play next song');
          this.playSong(nextSong);
        } else {
          console.log('no more songs in queue');
        }
      },

      playSong: function(song) {
          // set new current song
          this.set('currentSong', song);
          console.log(this.get('songQueue').length, ' more songs including current one');
      },

      stopPlayingOnEmptyQueue: function() {
        // only to be called on 'ended' events
        this.playSong(null);
      }

    });

    return AppModel;
  }
);