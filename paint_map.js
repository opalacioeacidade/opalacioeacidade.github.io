$(document).ready(function () {
    var mapa = document.getElementById("palacio-map");
    var caixa_legenda = document.getElementById("legenda-div")
    var categoria = null
    var lista_espacos = document.querySelectorAll("path");
    var serializer = new XMLSerializer();
    var mapa_svg = serializer.serializeToString(mapa)

    console.log(mapa_svg)


    mapa.addEventListener("click",
        function(e){
            var espaco = e.target;

            for (var i = 0; i < lista_espacos.length; i++) {
                    lista_espacos[i].classList.remove("active");
            }

            if (e.target.nodeName === "path") {
                espaco.classList.add('active')
            }
        }
    )
   caixa_legenda.addEventListener(
       "click",
       function (e) {
           var legenda = e.target.parentNode;
           categoria = legenda.getAttribute("categoria")

           for (var i = 0; i < lista_espacos.length; i++) {
               if(lista_espacos[i].classList.contains("active")) {
                   lista_espacos[i].classList.remove("active");
                   espaco = lista_espacos[i]
               }
           }

           if (espaco) {
               var classList = espaco.classList;
               while (classList.length > 0) {
                   classList.remove(classList.item(0));
               }
               espaco.classList.add(categoria)
           }
           categoria = null
           espaco = null
       }
   )
    // https://docs.google.com/forms/d/e/1FAIpQLSfwqYsWo5Kbv8sOqOcOv0hzlItBQiE1svZ8Y5NTdHmi8EVHYA/viewform?usp=sf_link

    $('#my-form').submit(function(e) {
        //prevent the form from submiting so we can post to the google form
        e.preventDefault();
        //AJAX request
        $.ajax({
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSfwqYsWo5Kbv8sOqOcOv0hzlItBQiE1svZ8Y5NTdHmi8EVHYA/formResponse?',     //The public Google Form url, but replace /view with /formResponse
            data: 'teste', // $('#my-form').serialize(), //Nifty jquery function that gets all the input data
            type: 'POST', //tells ajax to post the data to the url
            dataType: "json", //the standard data type for most ajax requests
            statusCode: { //the status code from the POST request
                0: function(data) { //0 is when Google gives a CORS error, don't worry it went through
                    //success
                    $('#form-success').text('hooray!');
                },
                200: function(data) {//200 is a success code. it went through!
                    //success
                    $('#form-success').text('hooray!');
                },
                403: function(data) {//403 is when something went wrong and the submission didn't go through
                    //error
                    alert('Oh no! something went wrong. we should check our code to make sure everything matches with Google');
                }
            }
        });
    });


})