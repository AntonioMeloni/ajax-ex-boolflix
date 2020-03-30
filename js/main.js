$(document).ready(function () {
    var source = $("#card-template").html();
    var template = Handlebars.compile(source);



    $(".btn-search").click(function () {
        $('.card').remove();
        $('.most-popular-movie').hide();
        $('.most-popular-tvshow').hide();
        $('.movies').hide();
        $('.tv-shows').hide();
        creaCard('/search','/movie');
        creaCard('/search','/tv');


    });

    $('.search-input').keypress(function (event) {
        if (event.key == 'Enter') {
            $('.card').remove();
            $('.most-popular-movie').hide();
            $('.most-popular-tvshow').hide();
            $('.tv-shows').hide();
            $('.movies').hide();
            creaCard('/search','/movie');
            creaCard('/search','/tv');
        }
    })


            var apiBaseUrl = 'https://api.themoviedb.org/3';
            var imgBaseUrl = 'https://image.tmdb.org/t/p/w342';
            creaCard('/movie','/popular');
            creaCard('/tv','/popular');

            function creaCard(azione,tipo) {
              var searchText = $(".search-input").val();
               $.ajax({
                   url: apiBaseUrl + azione + tipo,
                   data: {
                           api_key: '7780c6a90a66dfa3e0b69e733e848d17',
                           query: searchText,
                           language: 'it-IT'
                         },
                   method: 'GET',
                   success: function (data) {
                       var films = data.results;
                       stampaCards(azione,films, tipo);
                   },
                   error: function (err) {

                   }
               });
           };


    function stampaCards(azione,films, tipo) {
      for (var i = 0; i < films.length; i++) {
          var film = films[i];
          var nStelle = Math.ceil(film.vote_average/2);
          var votiStelle = valutazioneStelle(nStelle);
         console.log(film);
         var titolo, titoloOriginale, cardSection;

         if (tipo == '/movie') {
           titolo = film.title;
           titoloOriginale = film.original_title;
           cardSection = '.movieCards';
           $('.movies').show();
         }

         if (tipo == '/tv') {
           titolo = film.name;
           titoloOriginale = film.original_name;
           cardSection = '.tvCards';
           $('.tv-shows').show();
         }

         if (azione == '/movie' && tipo == '/popular') {
           titolo = film.title;
           titoloOriginale = film.original_title;
           cardSection = '.popularMovieCards';

         }

         if (azione == '/tv' && tipo == '/popular') {
           titolo = film.name;
           titoloOriginale = film.original_name;
           cardSection = '.popularTvCards';

         }

          var datiFilm = {
              cover: imgBaseUrl + film.poster_path,
              titolo: titolo,
              titoloOr: titoloOriginale,
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
            datiFilm.cover = 'https://www.2queue.com/2queue/wp-content/uploads/sites/6/tdomf/4299/movie-poster-coming-soon.png';
          }

          var filmCard = template(datiFilm);
          $(cardSection).append(filmCard);

      }
    }



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
