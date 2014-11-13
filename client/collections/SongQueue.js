// SongQueue.js - Defines a backbone model class for the song queue.
define(['backbone', 'collections/Songs'], function (Backbone, Songs) {

  var SongQueue = Songs.extend({

    initialize: function(){
    },

    enqueue: function(song) {
      this.add(song);
    }

  });
  return SongQueue;

});