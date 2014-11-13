define(['backbone',
        'views/PlayerView',
        'views/LibraryView',
        'views/SongQueueView'], 

  function (Backbone, PlayerView, LibraryView, SongQueueView) {

    // AppView.js - Defines a backbone view class for the whole music app.
    var AppView = Backbone.View.extend({

      initialize: function(params){
        this.playerView = new PlayerView({
          model: this.model.get('currentSong')
        });
        
        this.libraryView = new LibraryView({
          collection: this.model.get('library')
        });
        
        this.songQueueView = new SongQueueView({
          collection: this.model.get('songQueue')
        });

        // model is app model
        this.model.on('change:currentSong', function(model){
          console.log('now playing - ', model.get('currentSong').get('title'))
          this.playerView.setSong(model.get('currentSong'));
        }, this);

        
      },

      render: function(){
        return this.$el.html([
          this.playerView.$el,
          this.libraryView.$el
        ]);
      }
    });

    return AppView;

  }
);