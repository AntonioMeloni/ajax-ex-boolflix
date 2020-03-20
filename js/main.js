$(document).ready(function () {
    var source = $("#card-template").html();
    var template = Handlebars.compile(source);

    $(".btn-search").click(function(){
        $('.card').remove();
		var searchText = $(".search-input").val();
        var apiBaseUrl = 'https://api.themoviedb.org/3';
        var imgBaseUrl = 'https://image.tmdb.org/t/p/w185';

       $.ajax({
           url: apiBaseUrl + '/search/movie',
           data: {
                   api_key: '7780c6a90a66dfa3e0b69e733e848d17',
                   query: searchText,
                   language: 'it-IT'
                 },
           method: 'GET',
           success: function (data) {

               var films = data.results;
               console.log(films);
               for (var i = 0; i < films.length; i++) {
                   var film = films[i];

                   var stars = '';
                   var stellaPiena = '<i class="fas fa-star"></i>';
                   var stellaVuota = '<i class="far fa-star"></i>';
                   var nStelle = Math.ceil(film.vote_average/2);
                   for (var x = 0; x < 5; x++) {

                       if(x < nStelle){
                           stars = stars + stellaPiena;
                       }
                       else {
                           stars = stars + stellaVuota;
                       }
                   }

                   var datiFilm = {
                       cover: imgBaseUrl + film.poster_path,
                       titolo: film.title,
                       titoloOr: film.original_title,
                       trama: film.overview,
                       rate: nStelle,
                       linguaOr:film.original_language,
                       stelle: stars
                   }


                   var filmCard = template(datiFilm);
                   $('.card-container').append(filmCard);

               }
           },
           error: function (err) {

           }
       })
	});





});
