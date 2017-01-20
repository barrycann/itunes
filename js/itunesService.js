angular.module('itunes').service('itunesService', function($http, $q){

  this.getSongData = function(artist){
    var deferrer = $q.defer();
    var url = "https://itunes.apple.com/search?term=" + artist + "&callback=JSON_CALLBACK";

    $http.jsonp(url)
      .then(function(response){
        deferrer.resolve(organizeData(response.data.results));
        console.log(response.data.results);
    });
    return deferrer.promise;
  }

  function organizeData(raw){
    var songArray = [];
    var dataObj = {};
    for(var i=0;i<raw.length;i++){
      dataObj = {
        AlbumArt: raw[i].artworkUrl100,
        Artist: raw[i].artistName,
        Collection: raw[i].collectionName,
        CollectionPrice: raw[i].collectionPrice,
        Song: raw[i].trackName,
        SongPrice: raw[i].trackPrice,
        Play: raw[i].previewUrl,
        Type: raw[i].kind
      }
      songArray.push(dataObj);
    }
    return songArray;
  }
});
