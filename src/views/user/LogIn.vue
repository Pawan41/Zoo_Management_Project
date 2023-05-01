<template>
    <section class="vh-100 bg-image" style="background-image: url('');">
        <div class="mask d-flex align-items-center h-100 gradient-custom-3">
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6 mt-5">
                        <div class="card" style="border-radius: 15px;">
                            <div class="card-body p-3">
                                <h2 class="text-uppercase text-center mb-3">Login</h2>

                                <form @submit.prevent="login">
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example1cg">Your Email</label>
                                        <input type="email" id="email" class="form-control form-control-lg" v-model="email"
                                            required />
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="form3Example4cg">Password</label>
                                        <input type="password" id="password" class="form-control form-control-lg"
                                            v-model="password" />
                                    </div>

                                    <div class="d-flex justify-content-center">
                                        <button type="submit"
                                            class="btn btn-primary btn-lg gradient-custom-4 w-100">Login</button>
                                    </div>

                                    <p class="text-center text-muted mt-4 mb-0">Don't have an account? <router-link
                                            to="/signup" class="fw-bold text-body"><u>Signup here</u></router-link></p>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>s
    </section>
    <div class="text-center mt-3 mb-0">
        <p> Copyright © 2023 ZooS,India. All rights reserved.</p>
    </div>
</template>

<script>

import { mapActions } from 'vuex'
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(['setUserEmail', 'setLoggedIn']),
        async login() {
            let result = await axios.post('http://localhost:8080/rest/webapi/user/login', {
                userEmail: this.email,
                password: this.password
            }).catch(error => {
                console.log(error);
                alert("Something went wrong. please try again....")

            });

            if (result.status == 200) {
                localStorage.setItem("user-info", JSON.stringify(result.data));
                this.setUserEmail(this.email)
                this.$store.commit('setLoggedIn', true);
                this.$router.push('/dashboard');
                alert("User logged in Successfully!!!!!!!")
            }
        },
    },
    mounted() {
        let user = localStorage.getItem("user-info");
        if (user) {
            let userInfo = JSON.parse(user);
            this.$store.commit('setLoggedIn', true);
            this.$store.commit('setUserEmail', userInfo.userEmail);
            this.$router.push('/dashboard');
        }
    }

}

</script>