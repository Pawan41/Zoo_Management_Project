<template>
    <div class="mt-5 text-center">
        <h1 class="text-primary font-weight-bold">Welcome To Dashboard Page </h1>
    </div>
    <div class="mt-5 body d-flex flex-row justify-content-around flex-wrap">
        <div class="card my-3 mx-2 " style="width: 25rem; height: 28rem;">
            <img class="card-img-top w-100 h-75"
                src="https://static.vecteezy.com/system/resources/previews/000/362/602/original/cute-animals-in-the-zoo-vector.jpg"
                alt="Card image cap">
            <div class="card-body text-center mt-1">
                <p class="card-text">Total Zoo :{{ zoocount }}</p>
                <button @click="showComponent('zoo')" type="button" class="nav-link btn btn-primary w-100">View Zoo</button>
            </div>
        </div>
        <div class="card my-3 mx-2" style="width: 25rem; height: 28rem;">
            <img class="card-img-top w-100 h-75"
                src="https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?cs=srgb&dl=pexels-pixabay-247502.jpg&fm=jpg"
                alt="Card image cap">
            <div class="card-body text-center mt-1">
                <p class="card-text">Total Animal : {{ animalcount }} </p>
                <button @click="showComponent('animal')" type="button" class="nav-link btn btn-primary w-100">View
                    Animal</button>
            </div>
        </div>
        <div class="card my-3 mx-2" style="width: 25rem; height: 28rem;">
            <img class="card-img-top w-100 h-75"
                src="https://www.pngitem.com/pimgs/m/50-505130_young-man-using-laptop-laptop-with-person-animated.png"
                alt="Card image cap">
            <div class="card-body text-center mt-1">
                <p class="card-text">Total User : {{ usercount }}</p>
                <button @click="showComponent('user')" type="button" class="nav-link btn btn-primary w-100">View
                    User</button>
            </div>
        </div>
    </div>

    <!--Show Zoo Components-->
    <div v-if="showZooComponentFlag">
        <ZooComponent />
    </div>

    <!--Show Animal Components-->
    <div v-if="showAnimalComponentFlag">
        <AnimalComponent />

    </div>
    <!--Show User Components-->
    <div v-if="showUserComponentFlag">
        <UserComponent />
    </div>

    <div class="text-center mt-5 mb-0">
        <p> Copyright © 2023 ZooS,India. All rights reserved.</p>
    </div>
</template>
<script>

import ZooComponent from "../../components/zoo/ZooComponents.vue"
import AnimalComponent from "../../components/animal/AnimalComponent.vue"
import UserComponent from "../../components/user/UserComponent.vue"
import axios from 'axios';

export default {
    data() {
        return {
            showZooComponentFlag: false,
            showAnimalComponentFlag: false,
            showUserComponentFlag: false,
            zoocount: '',
            usercount: '',
            animalcount: '',
        }
    },
    mounted() {
        axios.get('http://localhost:8080/rest/webapi/zoo/zoocount').then(response => {
            this.zoocount = response.data;

        }),
            axios.get('http://localhost:8080/rest/webapi/user/usercount').then(response => {
                this.usercount = response.data;

            }),
            axios.get('http://localhost:8080/rest/webapi/animal/animalcount').then(response => {
                this.animalcount = response.data;

            })

    },
    methods: {
        showComponent(componentName) {
            this.showZooComponentFlag = componentName === 'zoo';
            this.showAnimalComponentFlag = componentName === 'animal';
            this.showUserComponentFlag = componentName === 'user';
        },
        showUserEmail() {
            // dispatch the action function here(ie component) 
            this.$store.dispatch("setUserEmail")
        },

    },
    components: {
        ZooComponent,
        AnimalComponent,
        UserComponent,
    },

}

</script>
