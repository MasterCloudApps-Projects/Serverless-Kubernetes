var parser = require('fast-xml-parser');
const minio = require('./minio');

function parseData(xmlString) {
    const jsonObj = parser.parse(xmlString, {attrNodeName: "attr",ignoreAttributes:false} );
    const data = jsonObj.root;

    const output =  {
        aemetid : data.attr['@_id'],
        update : data.elaborado,
        name: data.nombre,
        state: data.provincia
    }

    output.prediccion = [1,2,3].map((index)=>{
        const day = data.prediccion.dia[index];
        return {
            date: day.attr['@_fecha'],
            prob_precipitacion: day.prob_precipitacion[0]['#text'],
            estado_cielo: day.estado_cielo[0]['#text'],
            viento: {
                direccion: day.viento[0].direccion,
                velocidad: day.viento[0].velocidad
            },
            temperatura:{
                max: day.temperatura.maxima,
                min: day.temperatura.minima
            }
        }
    });

    return output;
}

module.exports = {
    parseData
}