// App.js - Defines a backbone model class for the whole app.
define(['backbone',
  'models/SongModel',
  'collections/songQueue',
  'lsUtil'], function (Backbone, SongModel, SongQueue, ls) {

    var AppModel = Backbone.Model.extend({

      initialize: function(params){

        var currentSong = new SongModel();
        var songQueue = new SongQueue();

        this.set('currentSong', currentSong); //set an empty song only for the first time
        this.set('songQueue', songQueue);
        
        this.bindEvents();
        this.setQueueFromLocalStorage();
      },

      bindEvents: function() {

        this.get('library').on('play', this.playSong, this);

        this.get('library').on('enqueue', function(song){
          this.get('songQueue').enqueue(song);
        }, this);

        this.get('library').on('ended', function(song) {
          this.get('songQueue').dequeue();
          console.log('song ended and dequeued');
        }, this);
      },

      setQueueFromLocalStorage: function() {
        var queueData = ls.read('songQueue') || [];
        if (queueData.length) {
          console.log('trying to add song queue from history', queueData);
          var songModels = this.get('library').getSongsFromData(queueData);
          console.log(songModels);
          this.get('songQueue').enqueue(songModels);
        }
      },

      isCurrentSongReady: function () {
        return Boolean(this.get('currentSong').get('url'));
      },

      playSong: function(song) {
          // set new current song
          this.set('currentSong', song);
          // ls.write('currentSong', song.attributes);
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