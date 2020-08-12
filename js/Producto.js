$(document).ready(function(){
    var funcion;
    $('.select2').select2();
    rellenar_laboratorios();
    buscar_producto();
    function rellenar_laboratorios() {
        funcion="rellenar_laboratorios";
        $.post('../controlador/LaboratorioController.php', {funcion}, (response)=>{
            const laboratorios = JSON.parse(response);
            let template='';
            laboratorios.forEach(laboratorio=>{
                template+=`
                    <option value="${laboratorio.id}">${laboratorio.nombre}</option>
                `;
            });
            $('#laboratorio').html(template);
        })
    }
    rellenar_tipos();
    function rellenar_tipos() {
        funcion="rellenar_tipos";
        $.post('../controlador/TipoController.php', {funcion}, (response)=>{
            const tipos = JSON.parse(response);
            let template='';
            tipos.forEach(tipo=>{
                template+=`
                    <option value="${tipo.id}">${tipo.nombre}</option>
                `;
            });
            $('#tipo').html(template);
        })
    }
    rellenar_presentaciones();
    function rellenar_presentaciones() {
        funcion="rellenar_presentaciones";
        $.post('../controlador/PresentacionController.php', {funcion}, (response)=>{
            const presentaciones = JSON.parse(response);
            let template='';
            presentaciones.forEach(presentacion=>{
                template+=`
                    <option value="${presentacion.id}">${presentacion.nombre}</option>
                `;
            });
            $('#presentacion').html(template);
        })
    }
    $('#form-crear-producto').submit(e=>{
        let nombre = $('#nombre_producto').val();
        let concentracion = $('#concentracion').val();
        let adicional = $('#adicional').val();
        let precio = $('#precio').val();
        let laboratorio = $('#laboratorio').val();
        let tipo = $('#tipo').val();
        let presentacion = $('#presentacion').val();
        funcion="crear";
        $.post('../controlador/ProductoController.php', {funcion,nombre,concentracion,adicional,precio,laboratorio,tipo,presentacion},(response)=>{
            if(response=='add'){
                $('#add').hide('slow');
                $('#add').show(1000);
                $('#add').hide(2000);
                $('#form-crear-producto').trigger('reset');
            }
            if(response=='noadd'){
                $('#noadd').hide('slow');
                $('#noadd').show(1000);
                $('#noadd').hide(2000);
                $('#form-crear-producto').trigger('reset');
            }
            buscar_producto();
        });
        e.preventDefault();
    });
    function buscar_producto(consulta) {
        funcion = "buscar";
        $.post('../controlador/ProductoController.php', {consulta, funcion}, (response)=>{
            console.log(response);
        });
    }
    $(document).on('keyup','#buscar-producto',function(){
        let valor = $(this).val();
        if(valor!=""){
            buscar_producto(valor);
        }
        else{
            buscar_producto();
        }
    });
})