const Teclas = document.querySelectorAll(".tecla")
let nIntento = 1
let intentoUsuario = []

Teclas.forEach(boton => {
    boton.addEventListener("click", () => {
        const valor = boton.innerText;
        if (intentoUsuario.length < 8) {
            intentoUsuario.push(Number(valor))
            console.log("Intento actual:", intentoUsuario);
            actualizarInterfaz(valor)
        }
    })
})

function actualizarInterfaz(valor){
    let idBusqueda = `celda${nIntento}-${intentoUsuario.length}`
    let valorCelda = document.getElementById(idBusqueda)

    if (valorCelda) {
        valorCelda.textContent = valor
    }
}

function generarFecha() {
    const inicio = new Date(1024, 0, 1)
    const fin = new Date(2026, 2, 30)

    const fechaAleatoria = new Date(inicio.getTime() + Math.random() * (fin.getTime() - inicio.getTime()))

    const dia = String(fechaAleatoria.getDate()).padStart(2, '0');
    const mes = String(fechaAleatoria.getMonth() + 1).padStart(2, '0');
    const anio = String(fechaAleatoria.getFullYear());

    const stringFecha = dia + mes + anio

    return stringFecha.split('').map(Number);
}

const fechaEstablecida = generarFecha()
console.log(fechaEstablecida)
let coloresIntento = []

function compararFecha(correcta, intento) {
    for (let i = 0; i < intento.length; i++) {
        if (intento[i] == correcta[i]) {
            coloresIntento[i] = "v" // se debe pintar de verde
            let celdita = document.getElementById(`celda${nIntento}-${intento[i] + 1}`)
            celdita.classList.add("verde")
        } else {
            coloresIntento[i] = "g" // se debe pintar de gris
            let celdita = document.getElementById(`celda${nIntento}-${intento[i] + 1}`)
            celdita.classList.add("gris")
            for (let j = 0; j < correcta.length; j++) {
                if (intento[i] == correcta[j]) {
                    coloresIntento[i] = "a" // se debe pintar de amarillo
                    let celdita = document.getElementById(`celda${nIntento}-${intento[i] + 1}`)
                    celdita.classList.add("amarillo")
                    break;
                }
            }
        }
    }
}

let botonEnviarId = document.getElementById("tecla-enviar")
botonEnviarId.addEventListener("click", ()=> {
    if (intentoUsuario.length == 8) {
        const coloresCalculados = compararFecha(fechaEstablecida, intentoUsuario)

        coloresCalculados.forEach((color, index) => {
            let celdita = document.getElementById(`celda${nIntento}-${index + 1}`)
            if (color == "v") {
                celdita.classList.add("verde")
            } else if (color == "g"){
                celdita.classList.add("gris")
            } else {
                celdita.classList.add("amarillo")
            }
        });
    }
})

for (let a = 0; a < coloresIntento.length; a++) {
    console.log(coloresIntento[a])
}

