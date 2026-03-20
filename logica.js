const fechaRandom = [2,4,1,1,2,0,0,4]
const intento = [1,7,1,2,2,0,1,9]
let coloresIntento = []

function compararFecha(correcta, intento) {
    for (let i = 0; i < intento.length; i++) {
        if (intento[i] == correcta[i]) {
            coloresIntento[i] = "v" // verde
        } else {
            coloresIntento[i] = "g" // gris
            for (let j = 0; j < correcta.length; j++) {
                if (intento[i] == correcta[j]) {
                    coloresIntento[i] = "a" // amarillo
                    break;
                }
            }
        }
    }
}

compararFecha(fechaRandom, intento)

for (let a = 0; a < coloresIntento.length; a++) {
    console.log(coloresIntento[a])
}