$(document).ready(function () {
    var mapa = document.getElementById("palacio-map");
    var caixa_legenda = document.getElementById("legenda-div")
    var botao_ok = document.getElementById('legenda-form-input-botao')
    var categoria = null
    var lista_espacos = document.querySelectorAll("path");
    var lista_legendas = document.querySelectorAll(".legenda")
    var serializer = new XMLSerializer();
    var mapa_svg = serializer.serializeToString(mapa)

    // console.log(mapa_svg)


    mapa.addEventListener("click",
        function(e){
            var espaco = e.target;

            for (var i = 0; i < lista_espacos.length; i++) {
                    lista_espacos[i].classList.remove("active");
            }

            for (var i = 0; i < lista_legendas.length; i++) {
                lista_legendas[i].classList.remove("active");

                if(espaco.classList.contains(lista_legendas[i].getAttribute("categoria"))){
                    lista_legendas[i].classList.add(('active'))
                } else {
                    lista_legendas[i].classList.remove(('active'))
                }
            }

            if (e.target.nodeName === "path") {
                espaco.classList.add('active')
                document.getElementById('legenda-form-input').value = espaco.getAttribute('data-legenda-texto') || ""
            }
        }
    )
   caixa_legenda.addEventListener(
       "click",
       function (e) {
           var legenda = e.target.parentNode;
           var espaco = null
           var categoria = legenda.getAttribute("categoria")

           for (var i = 0; i < lista_espacos.length; i++) {
               if(lista_espacos[i].classList.contains("active")) {
                   lista_espacos[i].classList.remove("active");
                   espaco = lista_espacos[i]
               }
           }
           if (espaco) {
               var classList = espaco.classList;
               if(!categoria){
                   for (var i = 0; i < lista_legendas.length; i++) {
                       lista_legendas[i].classList.remove("active");
                   }
                   while (classList.length > 0) {
                       classList.remove(classList.item(0));
                   }
               }else if(classList.contains(categoria)) {
                   espaco.classList.remove(categoria)
                   legenda.classList.remove("active")
               } else if(classList.length < 2){
                   espaco.classList.add(categoria)
                   legenda.classList.add("active")
               }
           }
           espaco.classList.add("active")
       }
   )

    botao_ok.addEventListener("click", function ()  {
        var espaco = null
        if (this.value.length > 1) {
            for (var i = 0; i < lista_espacos.length; i++) {
                if(lista_espacos[i].classList.contains("active")) {
                    espaco = lista_espacos[i]
                }
            }
            espaco.setAttribute('data-legenda-texto', document.getElementById('legenda-form-input').value)
        }
    });

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