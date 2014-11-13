define(['backbone', 'models/SongModel'], function (Backbone, SongModel) {

  // SongModel.js - Defines a backbone model class for songs.
  var SongModel = Backbone.Model.extend({

    play: function(){
      // Triggering an event here will also trigger the event on the collection
      this.trigger('play', this);
    },

    enqueue: function() {
      this.trigger('enqueue', this);
    },

    ended: function() {
      console.log('stopped playing ', this.get('title'));
      this.trigger('ended', this);
    },

    dequeue: function() {
      this.trigger('dequeue', this);
    },

    stopFromQueue: function() {
      this.trigger('stopFromQueue', this);
    }

  });

  return SongModel;

});