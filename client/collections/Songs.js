// Songs.js - Defines a backbone collection class for songs.
define(['backbone', 'models/SongModel'], function (Backbone, SongModel) {

  var Songs = Backbone.Collection.extend({
    model: SongModel,

    getSongsFromData: function (dataArray) {
      var uniqueSongUrls = dataArray.map(function (song) {
        return song.url;
      });

      return this.filter(function(song){
        return _.contains(uniqueSongUrls, song.get('url'));
      }, this);
    }
  });


  return Songs;

})