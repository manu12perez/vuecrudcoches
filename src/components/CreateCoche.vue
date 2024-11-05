<template>
  <div class="container mt-4">
    <h1>Crear Nuevo Coche</h1>

    <form v-on:submit.prevent="insertarCoche()" style="width: 500px; margin: 0 auto">
      <label>Id Coche</label>
      <input type="number" v-model="coche.idCoche" class="form-control" />
      <label class="form-label">Marca</label>
      <input type="text" v-model="coche.marca" class="form-control" />
      <label class="form-label">Modelo</label>
      <input type="text" v-model="coche.modelo" class="form-control" />
      <label class="form-label">Conductor</label>
      <input type="text" v-model="coche.conductor" class="form-control" />
      <label class="form-label">Imagen URL</label>
      <input type="text" v-model="coche.imagen" class="form-control" />
      <button class="btn btn-success">Create</button>
    </form>
  </div>
</template>

<script>
import ServiceCoches from "./../services/ServiceCoches";

const service = new ServiceCoches();

export default {
  name: "CreateCoche",
  data() {
    return {
      coche: {
        marca: "",
        modelo: "",
        conductor: "",
        imagen: "",
      },
    };
  },
  methods: {
    insertarCoche() {
      service.insertCoche(this.coche).then(() => {
        this.$router.push("/coches");
      });
    },
  },
};
</script>
