import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from './components/HomeComponent.vue'
import CochesComponent from './components/CochesComponent.vue'
import CreateCoche from './components/CreateCoche.vue'
import DetailsCoche from './components/DetailsCoche.vue'
import UpdateCoche from './components/UpdateCoche.vue'
import DeleteCoche from './components/DeleteCoche.vue'

//CREAMOS UNA CONSTANTE ARRAY PARA LA RUTA
const myRoutes = [
    { path: "/", component: HomeComponent },
    { path: "/coches", component: CochesComponent },
    { path: "/create", component: CreateCoche },
    { path: "/details/:id", component: DetailsCoche },
    { path: "/update/:id", component: UpdateCoche },
    { path: "/delete/:id", component: DeleteCoche },
]

//CREAMOS UNA CONSTANTE PARA EL HISTORIAL E INCLUIR EN EL ARRAY DE RUTAS
//DICHO NOMBRE DE CONSTANTE SERA EL QUE UTILIZAREMOS DENRO DE Main.js
const router = createRouter({
    history: createWebHistory(),
    routes: myRoutes
})

//POR ULTIMO EXPORTAMOS LA CONSTANTE router PARA SER UTILIZADA EN App
export default router;