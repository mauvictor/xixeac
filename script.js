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

// ============================================================
// Cifra Club — abertura inteligente no Android
// ============================================================
//
// Quando uma cifra do Cifra Club possui "keyShape" na URL,
// significa que existe uma configuração específica para a cifra.
//
// O aplicativo Android pode não preservar essa configuração.
// Por isso, no Android, oferecemos ao usuário a opção de:
//
//   📱 Abrir no aplicativo
//   🌐 Abrir no navegador
//
// No computador e em outros dispositivos, o comportamento
// original do link é mantido.
//
// IMPORTANTE:
// Não tentamos converter keyShape em tom, pois o valor de
// keyShape não deve ser interpretado como uma escala fixa
// de C, C#, D etc.
// ============================================================


document.addEventListener("click", function (event) {

    // Procura o link do Cifra Club que foi clicado.
    //
    // closest() também funciona se o usuário clicar em um
    // elemento dentro do <a>, como um ícone ou <span>.
    const link = event.target.closest(
        'a[href*="cifraclub.com.br"]'
    );

    // Não é um link do Cifra Club.
    if (!link) return;


    // --------------------------------------------------------
    // Detecta Android
    // --------------------------------------------------------

    const isAndroid = /Android/i.test(
        navigator.userAgent
    );

    // Em computador, iPhone etc., mantém o comportamento
    // original do link.
    if (!isAndroid) return;


    // --------------------------------------------------------
    // Lê a URL
    // --------------------------------------------------------

    let url;

    try {

        url = new URL(link.href);

    } catch (erro) {

        // URL inválida: não interfere no link.
        return;

    }


    // --------------------------------------------------------
    // Verifica se existe keyShape
    // --------------------------------------------------------
    //
    // Só mostramos o aviso quando a URL possui keyShape.
    //
    // Exemplos:
    //
    // ?keyShape=8
    //
    // ?capo=0&keyShape=8
    //
    // Um link simples, sem keyShape, continua abrindo
    // normalmente.
    // --------------------------------------------------------

    if (!url.searchParams.has("keyShape")) {
        return;
    }


    // Impede o Android de abrir imediatamente o aplicativo.
    event.preventDefault();


    // Mostra nossa escolha personalizada.
    mostrarModalCifra(url.href);

});


// ============================================================
// Cria o modal
// ============================================================

function mostrarModalCifra(url) {

    // Se por algum motivo já existir um modal,
    // remove antes de criar outro.
    const modalExistente =
        document.getElementById("modal-cifra-club");

    if (modalExistente) {
        modalExistente.remove();
    }

    // --------------------------------------------------------
    // Cria o elemento do modal
    // --------------------------------------------------------

    const modal = document.createElement("div");

    modal.id = "modal-cifra-club";


    modal.innerHTML = `

        <div class="modal-cifra-overlay">

            <div
                class="modal-cifra"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-cifra-titulo"
            >

                <div
                    id="modal-cifra-titulo"
                    class="modal-cifra-titulo"
                >
                    🎸 Abrir cifra
                </div>

                <div class="modal-cifra-texto">

                    Esta cifra possui uma configuração
                    específica de tom.

                    <br><br>

                    No aplicativo Cifra Club, essa
                    configuração pode não ser preservada.

                    <br><br>

                    <strong>
                        Como deseja abrir?
                    </strong>

                </div>

                <div class="modal-cifra-botoes">

                    <button
                        type="button"
                        id="cifra-app"
                        class="modal-cifra-btn secundario"
                    >
                        📱 Aplicativo
                    </button>

                    <button
                        type="button"
                        id="cifra-navegador"
                        class="modal-cifra-btn principal"
                    >
                        🌐 Navegador
                    </button>

                </div>

                <button
                    type="button"
                    id="cifra-cancelar"
                    class="modal-cifra-cancelar"
                >
                    Cancelar
                </button>

            </div>

        </div>

    `;

    // Adiciona o modal à página.
    document.body.appendChild(modal);

    // ========================================================
    // BOTÃO: Abrir no navegador
    // ========================================================

    document
        .getElementById("cifra-navegador")
        .addEventListener("click", function () {

            // Remove o modal.
            modal.remove();

            // Abre a URL original no navegador.
            //
            // IMPORTANTE:
            // keyShape e capo permanecem na URL.
            //
            // Exemplo:
            //
            // https://www.cifraclub.com.br/...
            //     ?capo=0&keyShape=8
            //
            // Assim o site do Cifra Club pode aplicar
            // corretamente a configuração da cifra.

            window.open(url, "_blank");

        });

    // ========================================================
    // BOTÃO: Abrir no aplicativo
    // ========================================================

    document
        .getElementById("cifra-app")
        .addEventListener("click", function () {

            // Remove o modal.
            modal.remove();

            // Entrega a URL ao Android.
            //
            // Se o Cifra Club estiver associado à URL,
            // o Android poderá abrir o aplicativo.
            //
            // O aplicativo poderá não preservar keyShape,
            // que é justamente o motivo de termos mostrado
            // o aviso ao usuário.

            window.location.href = url;

        });

    // ========================================================
    // BOTÃO: Cancelar
    // ========================================================

    document
        .getElementById("cifra-cancelar")
        .addEventListener("click", function () {

            modal.remove();

        });


    // ========================================================
    // Clicar fora do modal = cancelar
    // ========================================================

    modal
        .querySelector(".modal-cifra-overlay")
        .addEventListener("click", function (event) {

            if (event.target === this) {
                modal.remove();
            }

        });

    // ========================================================
    // ESC = cancelar
    // ========================================================

    function fecharComEsc(event) {

        if (event.key === "Escape") {

            modal.remove();

            document.removeEventListener(
                "keydown",
                fecharComEsc
            );
        }
    }

    document.addEventListener(
        "keydown",
        fecharComEsc
    );

    // ========================================================
    // Coloca o foco no botão Navegador
    // ========================================================
    //
    // É o caminho que preserva a configuração da cifra,
    // então ele recebe o foco inicialmente.

    document
        .getElementById("cifra-navegador")
        .focus();

}

// ============================================================
// Fim — Cifra Club
// ============================================================

/* ======================================================
   INICIALIZAÇÃO
====================================================== */

criarIndice();

carregarTema();
