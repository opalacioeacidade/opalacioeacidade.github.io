$(document).ready(function () {
    // let url = "http://127.0.0.1:5000/pesquisa_0";
    let url = 'https://palacio-e-a-cidade.herokuapp.com/pesquisa_0'
    let mapa = document.getElementById("palacio-map");
    let caixa_legenda = document.getElementById("legenda-div")
    let botao_ok = document.getElementById('legenda-form-input-botao')
    let botao_enviar = document.getElementById('botao-enviar')
    var nome = ''
    var tel = ''
    var data = {}
    var areas={}
    var espaco_id= 0
    var categoria = null
    var lista_espacos = document.querySelectorAll("path");
    var lista_legendas = document.querySelectorAll(".legenda")
    var serializer = new XMLSerializer();
    var mapa_svg = serializer.serializeToString(mapa)

    // console.log(mapa_svg)


    mapa.addEventListener("click",
        function (e) {
            var espaco = e.target;

            for (var i = 0; i < lista_espacos.length; i++) {
                lista_espacos[i].classList.remove("active");
            }

            for (var i = 0; i < lista_legendas.length; i++) {
                lista_legendas[i].classList.remove("active");

                if (espaco.classList.contains(lista_legendas[i].getAttribute("categoria"))) {
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
                if (lista_espacos[i].classList.contains("active")) {
                    lista_espacos[i].classList.remove("active");
                    espaco = lista_espacos[i]
                }
            }
            if (espaco) {
                var classList = espaco.classList;
                if (!categoria) {
                    for (var i = 0; i < lista_legendas.length; i++) {
                        lista_legendas[i].classList.remove("active");
                    }
                    while (classList.length > 0) {
                        classList.remove(classList.item(0));
                    }
                } else if (classList.contains(categoria)) {
                    espaco.classList.remove(categoria)
                    legenda.classList.remove("active")
                } else {
                    espaco.classList.add(categoria)
                    legenda.classList.add("active")
                }
            }
            espaco.classList.add("active")
        }
    )

    botao_ok.addEventListener("click", function () {
        var espaco = null
        if (this.value.length > 1) {
            for (var i = 0; i < lista_espacos.length; i++) {
                if (lista_espacos[i].classList.contains("active")) {
                    espaco = lista_espacos[i]
                }
            }
            espaco.setAttribute('data-legenda-texto', document.getElementById('legenda-form-input').value)
        }
    });

    botao_enviar.addEventListener("click", function () {
        nome = document.querySelector('#nome');
        tel = document.querySelector('#tel');
        mapa_svg = serializer.serializeToString(mapa)

        for (var i = 0; i < lista_espacos.length; i++) {
            areas[lista_espacos[i].getAttribute('id')] = {
                'categorias': lista_espacos[i].getAttribute('class'),
                'descricao': lista_espacos[i].getAttribute('data-legenda-texto') }
        }

        console.log(areas)

        data = {"nome": nome.value, "tel": tel.value, 'dados': JSON.stringify(areas), 'mapa': mapa_svg}

        console.log(data)

        let response = fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })

        alert("Sua mensagem foi enviada,\n obriado por participar.")
    })
});


