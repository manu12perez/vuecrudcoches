<template>
  <div class="container mt-4">
    <router-link to="/coches" class="btn btn-secondary mb-3">
      Volver
    </router-link>
    <h1>Eliminar Coche</h1>

    <!-- Si no se ha cargado el coche, mostramos un mensaje de carga -->
    <div v-if="loading" class="text-center">
      <img src="./../assets/images/Loading_icon.gif" alt="Cargando..." />
    </div>

    <!-- Si el coche está cargado, mostramos los detalles en una tarjeta de Bootstrap -->
    <div v-else class="card">
      <div class="card-header">
        <h4>Detalles</h4>
      </div>
      <div class="card-body">
        <p><strong>Conductor:</strong> {{ coche.conductor }}</p>
        <p><strong>Marca:</strong> {{ coche.marca }}</p>
        <p><strong>Modelo:</strong> {{ coche.modelo }}</p>
        <p><strong>Imagen:</strong></p>
        <img :src="coche.imagen" alt="Imagen del coche" class="img-fluid" />
      </div>
      <!-- Botón para eliminar coche -->
      <button @click="confirmarBorrado" class="btn btn-danger">Borrar</button>
    </div>
  </div>
</template>

<script>
import ServiceCoches from "./../services/ServiceCoches";
import Swal from "sweetalert2"; 

const service = new ServiceCoches();

export default {
  name: "DeleteCoche",
  data() {
    return {
      coche: {
        idCoche: "",
        marca: "",
        modelo: "",
        conductor: "",
        imagen: "",
      },
    };
  },
  mounted() {
    // Obtener el id del coche desde los parámetros de la URL
    let id = this.$route.params.id;

    // Buscar el coche por su ID
    service.findCoche(id).then((result) => {
        this.coche = result;
      })
  },
  methods: {
    // Método para mostrar el popup de confirmación de borrado
    confirmarBorrado() {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, bórralo!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Si el usuario confirma, eliminamos el coche
          service
            .deleteCoche(this.coche.idCoche)
            .then(() => {
              Swal.fire({
                title: "¡Eliminado!",
                text: "El coche ha sido eliminado.",
                icon: "success",
              }).then(() => {
                // Redirigimos a la página de coches
                this.$router.push("/coches");
              });
            })
            .catch((error) => {
              console.error("Error al eliminar el coche:", error);
              Swal.fire({
                title: "Error",
                text: "Hubo un error al eliminar el coche.",
                icon: "error",
              });
            });
        }
      });
    },
  },
};
</script>
