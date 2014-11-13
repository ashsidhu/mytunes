// SongQueue.js - Defines a backbone model class for the song queue.
define(['backbone', 'collections/Songs'], function (Backbone, Songs) {

  var SongQueue = Songs.extend({

    initialize: function(){
      this.on('dequeue', this.removeFromQueue, this);
    },

    enqueue: function(song) {
      this.add(song);
      this.playFirstIfFirst();
    },

    dequeue: function(){
      this.shift();
      this.playFirstIfFirst();
    },

    playFirstIfFirst: function() {
      if (this.first()) {
        this.first().play();
      }
    },

    removeFromQueue: function(song){
      if (this.first() === song) {
        this.dequeue();
      } else {
        this.remove(song);
      }
    },

    getNextSong: function() {
      // used by view to play next song
      return this.first();
    }

  });
  return SongQueue;

});