/*
=========================================================
 SCRIPT DO ÍNDICE DE MÚSICAS
 XIX EAC CIDADE NOVA
=========================================================
*/


/* ======================================================
   ELEMENTOS DA PÁGINA
====================================================== */

const indiceMusicas =
    document.getElementById("indiceMusicas");

const temasNav =
    document.getElementById("temasNav");

const busca =
    document.getElementById("busca");

const totalMusicas =
    document.getElementById("totalMusicas");

const resultadoBusca =
    document.getElementById("resultadoBusca");

const botaoTema =
    document.getElementById("botaoTema");

const botaoTopo =
    document.getElementById("topo");


/* ======================================================
   NORMALIZAÇÃO DE TEXTO

   Permite que a busca encontre:

   "maria"

   mesmo que a música esteja como:

   "Mãezinha do Céu"
====================================================== */

function normalizar(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


/* ======================================================
   CRIAR O ÍNDICE
====================================================== */

function criarIndice() {

    indiceMusicas.innerHTML = "";

    temasNav.innerHTML = "";

    let total = 0;


    musicas.forEach(tema => {


        /* ==============================================
           NAVEGAÇÃO DO TEMA
        ============================================== */

        const linkTema =
            document.createElement("a");

        linkTema.href = `#${tema.id}`;

        linkTema.textContent =
            `${tema.icone} ${tema.tema}`;

        temasNav.appendChild(linkTema);


        /* ==============================================
           SEÇÃO DO TEMA
        ============================================== */

        const section =
            document.createElement("section");

        section.className = "tema";

        section.id = tema.id;


        /* ==============================================
           TÍTULO DO TEMA
        ============================================== */

        const titulo =
            document.createElement("div");

        titulo.className = "tema-titulo";


        const icone =
            document.createElement("div");

        icone.className = "tema-icone";

        icone.textContent = tema.icone;


        const h2 =
            document.createElement("h2");

        h2.textContent = tema.tema;


        const quantidade =
            document.createElement("span");

        quantidade.className = "quantidade";

        quantidade.textContent =
            `${tema.musicas.length} ${
                tema.musicas.length === 1
                    ? "música"
                    : "músicas"
            }`;


        titulo.appendChild(icone);

        titulo.appendChild(h2);

        titulo.appendChild(quantidade);


        /* ==============================================
           LISTA
        ============================================== */

        const lista =
            document.createElement("div");

        lista.className = "lista";


        /* ==============================================
           MÚSICAS
        ============================================== */

        tema.musicas.forEach(
            (musica, index) => {

                total++;


                const item =
                    document.createElement("div");

                item.className = "musica";

                item.dataset.name =
                    musica.nome;


                /* --------------------------------------
                   NÚMERO
                -------------------------------------- */

                const numero =
                    document.createElement("div");

                numero.className = "numero";

                numero.textContent =
                    String(index + 1)
                        .padStart(2, "0");


                /* --------------------------------------
                   NOME
                -------------------------------------- */

                const nome =
                    document.createElement("span");

                nome.className = "nome";

                nome.textContent =
                    musica.nome;


                /* --------------------------------------
                   LINKS
                -------------------------------------- */

                const links =
                    document.createElement("div");

                links.className = "links";


                /* LETRA */

                const linkLetra =
                    document.createElement("a");

                linkLetra.className = "letra";

                linkLetra.href =
                    musica.letra || "#";

                linkLetra.textContent =
                    "Letra";


                /*
                Abre links externos em nova aba.
                */

                if (
                    musica.letra &&
                    musica.letra !== "#"
                ) {

                    linkLetra.target = "_blank";

                    linkLetra.rel =
                        "noopener noreferrer";

                }


                /* CIFRA */

                const linkCifra =
                    document.createElement("a");

                linkCifra.className = "cifra";

                linkCifra.href =
                    musica.cifra || "#";

                linkCifra.textContent =
                    "Cifra";


                if (
                    musica.cifra &&
                    musica.cifra !== "#"
                ) {

                    linkCifra.target = "_blank";

                    linkCifra.rel =
                        "noopener noreferrer";

                }


                links.appendChild(linkLetra);

                links.appendChild(linkCifra);


                /* --------------------------------------
                   MONTAR MÚSICA
                -------------------------------------- */

                item.appendChild(numero);

                item.appendChild(nome);

                item.appendChild(links);

                lista.appendChild(item);

            }
        );


        /* ==============================================
           MENSAGEM SEM RESULTADOS
        ============================================== */

        const semResultado =
            document.createElement("div");

        semResultado.className =
            "sem-resultado";

        semResultado.textContent =
            "Nenhuma música encontrada neste tema.";


        /* ==============================================
           MONTAR SEÇÃO
        ============================================== */

        section.appendChild(titulo);

        section.appendChild(lista);

        section.appendChild(semResultado);

        indiceMusicas.appendChild(section);

    });


    /* ==============================================
       TOTAL
    ============================================== */

    totalMusicas.textContent =
        total;

}


/* ======================================================
   BUSCA
====================================================== */

function executarBusca() {

    const termo =
        normalizar(
            busca.value.trim()
        );

    let encontrados = 0;


    document
        .querySelectorAll(".tema")
        .forEach(tema => {


            const itens =
                tema.querySelectorAll(".musica");

            let encontradosTema = 0;


            itens.forEach(item => {

                const nome =
                    normalizar(
                        item.dataset.name
                    );


                const encontrado =
                    nome.includes(termo);


                item.style.display =
                    encontrado
                        ? ""
                        : "none";


                if (encontrado) {

                    encontradosTema++;

                    encontrados++;

                }

            });


            /*
            Se nenhuma música do tema
            corresponde à busca, esconde o tema.
            */

            if (
                termo &&
                encontradosTema === 0
            ) {

                tema.classList.add("vazia");

            } else {

                tema.classList.remove("vazia");

            }

        });


    /* ==============================================
       RESULTADO
    ============================================== */

    if (termo) {

        resultadoBusca.textContent =
            encontrados === 1
                ? "1 resultado"
                : `${encontrados} resultados`;

    } else {

        resultadoBusca.textContent = "";

    }

}


/* ======================================================
   MODO ESCURO
====================================================== */

const TEMA_KEY =
    "xixeac-tema";


function carregarTema() {

    const tema =
        localStorage.getItem(TEMA_KEY);


    if (tema === "dark") {

        document.body.classList.add("dark");

        botaoTema.textContent =
            "☀️";

    }

}


botaoTema.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        const escuro =
            document.body.classList.contains(
                "dark"
            );


        botaoTema.textContent =
            escuro
                ? "☀️"
                : "🌙";


        localStorage.setItem(
            TEMA_KEY,
            escuro
                ? "dark"
                : "light"
        );

    }
);


/* ======================================================
   VOLTAR AO TOPO
====================================================== */

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 400
        ) {

            botaoTopo.classList.add(
                "visivel"
            );

        } else {

            botaoTopo.classList.remove(
                "visivel"
            );

        }

    }
);


botaoTopo.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* ======================================================
   BUSCA EM TEMPO REAL
====================================================== */

busca.addEventListener(
    "input",
    executarBusca
);


/* ======================================================
   ESC = LIMPAR BUSCA
====================================================== */

document.addEventListener(
    "keydown",
    evento => {

        if (
            evento.key === "Escape" &&
            document.activeElement === busca
        ) {

            busca.value = "";

            executarBusca();

            busca.blur();

        }

    }
);


/* ======================================================
   "/" = IR PARA BUSCA
====================================================== */

document.addEventListener(
    "keydown",
    evento => {

        if (
            evento.key === "/" &&
            document.activeElement !== busca &&
            !["INPUT", "TEXTAREA"].includes(
                document.activeElement.tagName
            )
        ) {

            evento.preventDefault();

            busca.focus();

        }

    }
);


/* ======================================================
   INICIALIZAÇÃO
====================================================== */

criarIndice();

carregarTema();
