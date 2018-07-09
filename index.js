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

function generarArchivoScotiaBank(nombreArchivo){
    fs.appendFileSync(nombreArchivo,FIRSTLINE)

    datos.forEach(element => {
        fs.appendFileSync(nombreArchivo,TIPO+'|'+contrato(element)+'|'+NOMBREPLAZA+'   |'+NUMEROPLAZA+'|'+numeroSucursal(element)+'|'+
                                          fecha(element)+'|'+fecha(element)+'|'+fecha(element)+'|'+indImporte(element)+'|'+
                                          importeDocumento(element)+'|'+FORMADEPAGO+'|   |                '+INTERESESODESCUENTOS+'|'+
                                          importeDocumento(element)+'|'+hora(element)+'|'+imp(element)+'|1000'+'noControl'+'referencia'+'|'+
                                          fecha(element).replace(/\//g,'')+'|'+'Camberos Fregoso Valdez'+'|'+'Reinscripcion'+'                 ||'+'\n')
    });
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

function descClacon(dato){
    return dato.substring(36,72).trim()
}

function indImporte (dato){
    return dato.substring(72,73)
}

function imp (dato){
    return '0'+dato.substring(74,88)
}

function importeDocumento(dato){
    var resultado = '                     '
    var importeDocumento = ''
    var bandera = false;
    var importe = dato.substring(77,88)
    for(var i = 0;i<importe.length;i++){  
        if(!(importe[i]=='0') && !bandera )
            bandera = true
        if(bandera){
            importeDocumento += importe.substring(i);
            break
        }
    }
    
    var temp = '.'+importeDocumento.substring(importeDocumento.length-2)
    var j = 1
   for(var i = importeDocumento.length-3;i>=0;i--){
       temp = importeDocumento[i]+temp
       if(j++%3==0 && i-1>=0 )
           temp= ','+temp
    }
    resultado += '$'+temp 
    importeDocumento = resultado.substring(resultado.length-21)

    return importeDocumento
    
}

function saldo(dato){
    return dato.substring(91,105)
}


function referencia(dato){
    return dato.substring(105,113)
}

function concepto(dato){
    return dato.substring(113)
}

function datosAdicionales(dato){
    return dato.substring(154)
}

module.exports.leerArchivo = leerArchivo;
module.exports.generarArchivoScotiaBank= generarArchivoScotiaBank;

