// SongQueue.js - Defines a backbone model class for the song queue.
define(['backbone', 'collections/Songs', 'lsUtil'], function (Backbone, Songs, ls) {

  var SongQueue = Songs.extend({

    initialize: function(){
      this.on('dequeue', this.removeFromQueue, this);
      this.on('add remove', this.writeToLocalStorage, this)
      this.playFirst();
    },

    enqueue: function(song) {
      if (Array.isArray(song) || song instanceof Backbone.Collection) {
        _.each(song, this.enqueue, this);
        return;
      }
      debugger;
      this.add(song);
      this.playFirst();
    },

    dequeue: function(){
      this.shift();
      this.playFirst();
    },

    playFirst: function() {
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
      // used by view to play next song after dequeueing the currently playing song
      return this.first();
    },

    writeToLocalStorage: function() {
      ls.write('songQueue', this.toJSON());
    }

  });
  return SongQueue;

});