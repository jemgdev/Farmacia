$(document).ready(function(){
    let funcion;
    venta_mes();
    vendedor_mes();
    async function vendedor_mes(){
        funcion='vendedor_mes';
        let lista=['','',''];
        const response = await fetch('../controlador/VentaController.php',{
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: 'funcion='+funcion
        }).then(function(response){
            return response.json();           
        }).then(function(vendedores){
            let i=0;
            vendedores.forEach(vendedor => {
                lista[i]=vendedor;
                i++;
            });
        })
        let CanvasG2 = $('#Grafico2').get(0).getContext('2d');
        let datos={
            labels:[
                'Mes actual'
            ],
            datasets:[
                {
                    label               : lista[0].vendedor_nombre,
                    backgroundColor     : 'rgba(60,141,188,0.9)',
                    borderColor         : 'rgba(60,141,188,0.8)',
                    pointRadius         : false,
                    pointColor          : '#3b8bba',
                    pointStrokeColor    : 'rgba(60,141,188,1)',
                    pointHighlightFill  : '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    data                : [lista[0].cantidad]
                },
                {
                    label               : lista[1].vendedor_nombre,
                    backgroundColor     : 'rgba(255,0,0,1)',
                    borderColor         : 'rgba(255,0,0,1)',
                    pointRadius         : false,
                    pointColor          : '#3b8bba',
                    pointStrokeColor    : 'rgba(255,0,0,1)',
                    pointHighlightFill  : '#fff',
                    pointHighlightStroke: 'rgba(255,0,0,1)',
                    data                : [lista[1].cantidad]
                },
                {
                    label               : lista[2].vendedor_nombre,
                    backgroundColor     : 'rgba(0,255,0,1)',
                    borderColor         : 'rgba(0,255,0,1)',
                    pointRadius         : false,
                    pointColor          : '#3b8bba',
                    pointStrokeColor    : 'rgba(0,255,0,1)',
                    pointHighlightFill  : '#fff',
                    pointHighlightStroke: 'rgba(0,255,0,1)',
                    data                : [lista[2].cantidad]
                },
            ]
        }
        let opciones ={
            responsive:true,
            maintainAspectRatio:false,
            datasetFill:false,
        }
        let G2 = new Chart(CanvasG2,{
            type:'bar',
            data:datos,
            options:opciones,
        })
    }
    async function venta_mes(){
        funcion = 'venta_mes';
        let array = ['','','','','','','','','','','',''];
        const response = await fetch('../controlador/VentaController.php',{
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: 'funcion='+funcion
        }).then(function(response){
            return response.json();
        }).then(function(meses){
            meses.forEach(mes => {
                if(mes.mes==1){
                    array[0]=mes;
                }
                if(mes.mes==2){
                    array[1]=mes;
                }
                if(mes.mes==3){
                    array[2]=mes;
                }
                if(mes.mes==4){
                    array[3]=mes;
                }
                if(mes.mes==5){
                    array[4]=mes;
                }
                if(mes.mes==6){
                    array[5]=mes;
                }
                if(mes.mes==7){
                    array[6]=mes;
                }
                if(mes.mes==8){
                    array[7]=mes;
                }
                if(mes.mes==9){
                    array[8]=mes;
                }
                if(mes.mes==10){
                    array[9]=mes;
                }
                if(mes.mes==11){
                    array[10]=mes;
                }
                if(mes.mes==12){
                    array[11]=mes;
                }
                if(mes.mes==13){
                    array[12]=mes;
                }
            });
        })
        let CanvasG1 = $('#Grafico1').get(0).getContext('2d');
        let datos = {
            labels:[
                'Enero',
                'Febrero',
                'Marzo',
                'Abril',
                'Mayo',
                'Junio',
                'Julio',
                'Agosto',
                'Septiembre',
                'Octubre',
                'Noviembre',
                'Diciembre',
            ],
            datasets:[{
                data:[
                    array[0].cantidad,
                    array[1].cantidad,
                    array[2].cantidad,
                    array[3].cantidad,
                    array[4].cantidad,
                    array[5].cantidad,
                    array[6].cantidad,
                    array[7].cantidad,
                    array[8].cantidad,
                    array[9].cantidad,
                    array[10].cantidad,
                    array[11].cantidad,
                ],
                backgroundColor:[
                        '#99A3A4',
                        '#3498DB',
                        '#CB4335',
                        '#92C846',
                        '#46A8C8',
                        '#7C46C8',
                        '#C846BF',
                        '#C8466D',
                        '#3F55E8',
                        '#D8E83F',
                        '#E8A23F',
                        '#4FE83F',
                        '#3FE8AE',
                ]
            }]
        }
        let opciones={
            maintainAspectRatio: false,
            responsive: true,
        }
        let G1 = new Chart(CanvasG1,{
            type: 'pie',
            data: datos,
            options: opciones,
        })
    }
})