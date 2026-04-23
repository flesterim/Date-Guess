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

const fechaEstablecida = generarFecha() // Generar fecha para el juego
console.log(fechaEstablecida)

const Teclas = document.querySelectorAll(".teclaNumero") // Escuchador de teclas del tablero
Teclas.forEach(boton => {
    boton.addEventListener("click", () => {
        if (intentoUsuario.length < 8) {
            const valor = boton.innerText;
            intentoUsuario.push(Number(valor))
            console.log("Intento actual:", intentoUsuario);
            actualizarInterfaz(valor)
        }
    })
})

let botonBorrarId = document.getElementById("tecla-borrar")
botonBorrarId.addEventListener("click", ()=> {
    actualizarInterfaz("")
    let valorBorrado =intentoUsuario.pop()
    console.log(valorBorrado)
})

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

        if (coloresCalculados.every(c => c === "v")) {
            alert("¡Felicidades! Adivinaste la fecha.");
        } else {
            nIntento++
            intentoUsuario = []
        }
    } else {
        alert("Faltan números por completar");
    }
})

let nIntento = 1
let intentoUsuario = []



function actualizarInterfaz(valor){
    let idBusqueda = `celda${nIntento}-${intentoUsuario.length}`
    let valorCelda = document.getElementById(idBusqueda)

    if (valorCelda) {
        valorCelda.textContent = valor
    }
}

function compararFecha(correcta, intento) {
    let coloresIntento = []
    let copiaCorrecta = [...correcta]

    for (let i = 0; i < intento.length; i++) {
        if (intento[i] == correcta[i]) {
            coloresIntento[i] = "v"
            copiaCorrecta[i] = null;
        }
    }

    for (let i = 0; i < intento.length; i++) {
        if(coloresIntento[i] == "v") continue

        let indexAmarillo = copiaCorrecta.indexOf(intento[i]);
        if (indexAmarillo !== -1) {
            coloresIntento[i] = "a";
            copiaCorrecta[indexAmarillo] = null;
        } else {
            coloresIntento[i] = "g";
        }
    }
    return coloresIntento
}