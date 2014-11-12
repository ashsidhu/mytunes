// Songs.js - Defines a backbone collection class for songs.
define(['backbone', 'models/SongModel'], function (Backbone, SongModel) {

  var Songs = Backbone.Collection.extend({
    model: SongModel
  });

  return Songs;

})