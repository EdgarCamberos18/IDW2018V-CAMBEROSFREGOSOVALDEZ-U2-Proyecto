var fs = require("fs");

var datos = [];
var FIRSTLINE = 'TIPO|CONTRATO|NOMBRE PLAZA|NUMERO PLAZA|NUMERO SUCURSAL|FECHA RECIBO|FECHA DE PAGO|FECHA DEPOSITO|IND IMPORTE|IMPORTE DOCUMENTO|FORMA DE PAGO|INTERESES O DESCUENTOS|IMPORTE INTERESES O DESCUENTOS|IMPORTE TOTAL PAGADO|HORA DE PAGO|                            TOTAL A PAGAR| NUMERO DE REFERENCIA| FECHA LIMITE DE PAGO| NOMBRE| CONCEPTO DE PAGO|CTE. COB. LITE|IND. ORIGEN|\n'
var TIPO = 'D';
var NOMBREPLAZA = 'TEPIC, NAY.'
var NUMEROPLAZA = '014'
var FORMADEPAGO = '001'
var INTERESESODESCUENTOS = '$0.00'


function leerArchivo(nombreArchivo) {
    var obj = fs.readFileSync(nombreArchivo, "utf8");
    var temp = ''
    for (i = 0; i < obj.length; i++) {
        temp+=obj[i];
    }
    datos= temp.split(/\n/);
    return datos;
}



function contrato(dato){
    return dato.substring(0,16).trim() 
}

function fecha(dato){
    return dato.substring(16,18)+'/'+dato.substring(18,20)+'/'+dato.substring(20,24);
}

function hora(dato){
    return dato.substring(24,26)+":"+dato.substring(26,28);
}

function numeroSucursal(dato){
    return dato.substring(28,32);
}

function clacon(dato){
    return dato.substring(32,36)
}


module.exports.leerArchivo = leerArchivo;


