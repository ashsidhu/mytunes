define([], function(){
  return {
    write: function(key, value){
      window.localStorage[key] = JSON.stringify(value);
    },
    read: function(key) {
      return JSON.parse(window.localStorage.getItem(key));
    }
  }
});