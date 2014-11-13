define(['backbone'], function (Backbone) {

  // PlayerView.js - Defines a backbone view class for the music player.
  var PlayerView = Backbone.View.extend({

    // HTML5 (native) audio tag is being used
    // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
    el: '<audio controls autoplay />',

    events: {
      play: 'callback',
      pause: 'callback',
      ended: 'ended'
    },

    initialize: function() {
    },

    setSong: function(song){
      this.model = song;
      this.render();
    },

    render: function(){
      return this.$el.attr('src', this.model ? this.model.get('url') : '');
    },

    callback: function(e) {
      // console.log(e);
    },

    ended: function(e) {
      console.log('current song ended from view');
      this.model.ended();
    }

  });

  return PlayerView;

});