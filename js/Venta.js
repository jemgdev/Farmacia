$(document).ready(function(){
    let funcion = "listar";
    
    let datatable = $('#tabla_venta').DataTable( {
        "ajax": {
            "url": "../controlador/VentaController.php",
            "method": "POST",
            "data": {funcion: funcion}
        },
        "columns": [
            { "data": "id_venta" },
            { "data": "fecha" },
            { "data": "cliente" },
            { "data": "dni" },
            { "data": "total" },
            { "data": "vendedor"},
            { "defaultContent": `<button class="btn btn-secondary"><i class="fas fa-print"></i></button>
                                 <button class="ver btn btn-success" type="button" data-toggle="modal" data-target="#vista_venta"><i class="fas fa-search"></i></button>
                                 <button class="btn btn-danger"><i class="fas fa-window-close"></i></button>`}
        ],
        "language": espanol
    } );

    $('#tabla_venta tbody').on('click', '.ver', function(){
        let datos = datatable.row($(this).parents()).data();
        let id = datos.id_venta;
        let funcion = "ver";
        $('#codigo_venta').html(id);
        $('#fecha').html(datos.fecha);
        $('#cliente').html(datos.cliente);
        $('#dni').html(datos.dni);
        $('#vendedor').html(datos.vendedor);
        $('#total').html(datos.total);
        $.post('../controlador/VentaProductoController.php',{funcion, id},(response)=>{
            let registros = JSON.parse(response);
            let template = "";
            $('#registros').html(template);
            registros.forEach(registro => {
                template+=`
                    <tr>
                        <td>${registro.cantidad}</td>
                        <td>${registro.precio}</td>
                        <td>${registro.producto}</td>
                        <td>${registro.concentracion}</td>
                        <td>${registro.adicional}</td>
                        <td>${registro.laboratorio}</td>
                        <td>${registro.presentacion}</td>
                        <td>${registro.tipo}</td>
                        <td>${registro.subtotal}</td>
                    </tr>
                `;
                $('#registros').html(template);
            });
        })
    })
})
let espanol = {
    "sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún dato disponible en esta tabla",
    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Buscar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
        "copy": "Copiar",
        "colvis": "Visibilidad"
    }
};