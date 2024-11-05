<template>
  <div class="container mt-4">
    <router-link to="/coches" class="btn btn-secondary mb-3"> Volver </router-link>

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
    </div>
  </div>
</template>

<script>
import ServiceCoches from "./../services/ServiceCoches";

const service = new ServiceCoches();

export default {
  name: "DetailsCoche",
  data() {
    return {
      coche: {}, // Guardamos los detalles del coche aquí
      loading: true, // Indicador de carga
    };
  },
  mounted() {
    const idCoche = this.$route.params.id; // Obtenemos el id de la URL
    service.findCoche(idCoche).then((result) => {
      this.coche = result; // Asignamos el coche obtenido
      this.loading = false; // Indicamos que la carga ha terminado
    });
  },
};
</script>
