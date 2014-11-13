// App.js - Defines a backbone model class for the whole app.
define(['backbone',
  'models/SongModel',
  'collections/songQueue',
  'lsUtil'], function (Backbone, SongModel, SongQueue, ls) {

    var AppModel = Backbone.Model.extend({

      initialize: function(params){
        var queueData = ls.read('songQueue') || [];
        console.log(queueData);
        debugger;
        var currentSong = new SongModel();
        var songQueue = new SongQueue(queueData);

        this.set('currentSong', currentSong); //set an empty song only for the first time
        this.set('songQueue', songQueue);
        
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

      playSong: function(song) {
          // set new current song
          this.set('currentSong', song);
          ls.write('currentSong', song.attributes);
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