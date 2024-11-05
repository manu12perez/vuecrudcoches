<template>
  <div>
    <h1>Listado de coches</h1>
    <!-- Imagen de carga solo visible si 'status' es false -->
    <img
      src="./../assets/images/Loading_icon.gif"
      v-if="status == false"
      alt="Cargando..."
    />

    <!-- Mostrar la tabla solo cuando 'status' sea true -->
    <table v-else class="table table-bordered">
      <thead>
        <tr>
          <th>Id Coche</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Conductor</th>
          <th>Imagen</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coche in coches" :key="coche.idCoche">
          <td>{{ coche.idCoche }}</td>
          <td>{{ coche.marca }}</td>
          <td>{{ coche.modelo }}</td>
          <td>{{ coche.conductor }}</td>
          <td>
            <img
              :src="coche.imagen"
              alt="Imagen del coche"
              style="height: 150px; width: 150px"
            />
          </td>
          <td>
            <router-link :to="'/details/' + coche.idCoche" class="btn btn-info">
              Detalles
            </router-link>
            <router-link :to="'/update/' + coche.idCoche" class="btn btn-warning">
              Actualizar
            </router-link>
            <router-link :to="'/delete/' + coche.idCoche" class="btn btn-danger">
              Eliminar
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ServiceCoches from "./../services/ServiceCoches";

const service = new ServiceCoches();

export default {
  name: "CochesComponent",
  mounted() {
    service.getCoches().then((result) => {
      this.status = true; // Cambia el estado a true cuando los coches se cargan
      this.coches = result; // Guarda los coches obtenidos
    });
  },
  data() {
    return {
      coches: [], // Aquí guardamos los coches obtenidos
      status: false, // Estado para saber si la carga está completa
    };
  },
};
</script>
