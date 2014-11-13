define(['backbone'], function (Backbone) {

  // SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
  var SongQueueEntryView = Backbone.View.extend({
    // your code here!
    tagName: 'tr',

    template: _.template('<td>(<%= artist %>)</td><td><%= title %></td><td><button>Dequeue</button</td'),

    events: {
      // 'click': function() {
      //   this.model.play();
      // },
      'click button': function(e){
        e.stopPropagation();
        this.model.dequeue();
      }
    },

    render: function(){
      return this.$el.html(this.template(this.model.attributes));
    }

  });

  return SongQueueEntryView;

});
