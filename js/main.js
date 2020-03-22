$(document).ready(function () {
    var source = $("#card-template").html();
    var template = Handlebars.compile(source);

    $(".btn-search").click(function () {
        $('.card').remove();
        creaFilmCard();
        creaTVSeriesCard();
    });

    $('.search-input').keypress(function (event) {
        if (event.key == 'Enter') {
            $('.card').remove();
            creaFilmCard();
            creaTVSeriesCard();
        }
    })


            var apiBaseUrl = 'https://api.themoviedb.org/3';
            var imgBaseUrl = 'https://image.tmdb.org/t/p/w342';

            function creaFilmCard() {
                var searchText = $(".search-input").val();
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

                       for (var i = 0; i < films.length; i++) {
                           var film = films[i];
                           var nStelle = Math.ceil(film.vote_average/2);
                           var votiStelle = valutazioneStelle(nStelle);
                          console.log(film);
                           var datiFilm = {
                               cover: imgBaseUrl + film.poster_path,
                               coverError: '',
                               titolo: film.title,
                               titoloOr: film.original_title,
                               trama: film.overview,
                               rate: nStelle,
                               linguaOr:film.original_language,
                               stelle: votiStelle,
                               trama: film.overview
                           }
                           if (datiFilm.linguaOr == 'en') {
                               datiFilm.linguaOr = 'gb';
                           }

                           if (film.poster_path == null ) {
                             datiFilm.coverError = 'Copertina in aggiornamento';
                           }

                           var filmCard = template(datiFilm);
                           $('.card-container').append(filmCard);

                       }
                   },
                   error: function (err) {

                   }
               })
           };

            function creaTVSeriesCard() {
                var searchText = $(".search-input").val();
               $.ajax({
                   url: apiBaseUrl + '/search/tv',
                   data: {
                           api_key: '7780c6a90a66dfa3e0b69e733e848d17',
                           query: searchText,
                           language: 'it-IT'
                         },
                   method: 'GET',
                   success: function (data) {

                       var films = data.results;

                       for (var i = 0; i < films.length; i++) {
                           var film = films[i];
                           var nStelle = Math.ceil(film.vote_average/2);
                           var votiStelle = valutazioneStelle(nStelle);

                           var datiFilm = {
                               cover: imgBaseUrl + film.poster_path,
                               titolo: film.name,
                               titoloOr: film.original_name,
                               trama: film.overview,
                               rate: nStelle,
                               linguaOr:film.original_language,
                               stelle: votiStelle
                           }
                           if (datiFilm.linguaOr == 'en') {
                               datiFilm.linguaOr = 'gb';
                           }

                           var filmCard = template(datiFilm);
                           $('.card-container').append(filmCard);

                       }
                   },
                   error: function (err) {

                   }
               })
           };






    function valutazioneStelle(numStelle) {
        var stars = '';
        var stellaPiena = '<i class="fas fa-star"></i>';
        var stellaVuota = '<i class="far fa-star"></i>';

        for (var x = 0; x < 5; x++) {

            if(x < numStelle){
                stars = stars + stellaPiena;
            }
            else {
                stars = stars + stellaVuota;
            }
        }
        return stars;
    };




});
