<?php
include 'Conexion.php';
class Tipo{
    var $objetos;
    public function __construct(){
        $db = new Conexion();
        $this->acceso=$db->pdo;
    }
    function crear($nombre){
        $sql="SELECT ip_tip_prod FROM tipo_producto where nombre=:nombre";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':nombre'=>$nombre));
        $this->objetos=$query->fetchall();
        if(!empty($this->objetos)){
            echo 'noadd';
        }
        else{
            $sql="INSERT INTO tipo_producto(nombre) values (:nombre)";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':nombre'=>$nombre));
            echo 'add';
        }
        
    }
    function buscar(){
        if(!empty($_POST['consulta'])){
            $consulta=$_POST['consulta'];
            $sql="SELECT * FROM tipo_producto where nombre LIKE :consulta";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':consulta'=>"%$consulta%"));
            $this->objetos=$query->fetchall();
            return $this->objetos;
        }
        else{
            $sql="SELECT * FROM tipo_producto where nombre NOT LIKE '' ORDER BY ip_tip_prod LIMIT 25";
            $query = $this->acceso->prepare($sql);
            $query->execute();
            $this->objetos=$query->fetchall();
            return $this->objetos;
        }
    }
    function borrar($id){
        $sql="DELETE FROM tipo_producto where ip_tip_prod=:id";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id'=>$id));
        if(!empty($query->execute(array(':id'=>$id)))){
            echo 'borrado';
        }else {
            echo 'no borrado';
        }
    }
    function editar($nombre,$id_editado){
        $sql="UPDATE tipo_producto SET nombre=:nombre where ip_tip_prod=:id";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id'=>$id_editado,':nombre'=>$nombre));
        echo 'edit';
    }
    function rellenar_tipos(){
        $sql="SELECT * FROM tipo_producto order by nombre asc";
        $query = $this->acceso->prepare($sql);
        $query->execute();
        $this->objetos=$query->fetchall();
        return $this->objetos;
    }
}
?>