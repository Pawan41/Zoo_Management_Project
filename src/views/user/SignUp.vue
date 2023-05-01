<template>
    <section class="vh-100 bg-image" style="background-image: url('');">
        <div class="mask d-flex align-items-center h-100 gradient-custom-3">
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6 mt-4">
                        <div class="card" style="border-radius: 15px;">
                            <div class="card-body p-4">
                                <h2 class="text-uppercase text-center mb-5">Create an account</h2>
                                <form @submit.prevent="submitForm">
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="userName">UserName</label>
                                        <input type="text" id="userName" class="form-control form-control-lg"
                                            v-model="formData.userName" />
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="userEmail">Your Email</label>
                                        <input type="email" id="userEmail" class="form-control form-control-lg"
                                            v-model="formData.userEmail" />

                                    </div>

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="password">Password</label>
                                        <input type="password" id="password" class="form-control form-control-lg"
                                            v-model="formData.password" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="userNumber">Your Number</label>
                                        <input type="tel" id="userNumber" class="form-control form-control-lg"
                                            v-model="formData.userNumber" />
                                    </div>

                                    <div class="form-outline mb-4">
                                        <label for="option">Select a Role:</label>
                                        <select class="form-control rounded" id="role" v-model="formData.role">
                                            <option value="">-- Please select --</option>
                                            <option value="Admin">Admin</option>
                                            <option value="User">User</option>
                                            <option value="Superadmin">Superadmin</option>
                                        </select>
                                    </div>

                                    <div class="d-flex justify-content-center">
                                        <button type="submit"
                                            class="btn btn-primary btn-block btn-lg gradient-custom-4 text-body">Signup</button>
                                    </div>

                                    <p class="text-center text-muted mt-4 mb-0">Have already an account? <router-link
                                            to="/login" class="fw-bold text-body"><u>Login here</u></router-link></p>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="text-center mt-3 mb-0">
        <p> Copyright © 2023 ZooS,India. All rights reserved.</p>
    </div>
</template>

<script>

import axios from 'axios'
import bcrypt from 'bcryptjs';

export default {
    data() {
        return {
            formData: { userName: '', userEmail: '', password: '', userNumber: '', role: '' },
        }
    },
    methods: {
        submitForm() {
            //form validation
            if (!this.formData.userName || !this.formData.userEmail || !this.formData.password || !this.formData.userNumber || !this.formData.role) {
                alert('Please fill in all required fields.');
                return;
            }

            var myData = this.formData
            // console.log(myData)

            //now i am storing the plain text password into the  variable
            const password = myData.password;
            // console.log(password);

            // Hash the password using bcrypt
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            // console.log(hashedPassword);

            // Now i am storing the hashedpassword that tha myData object
            myData.password = hashedPassword;

            axios({
                method: "post",
                url: "http://localhost:8080/rest/webapi/user/adduserdata",
                data: myData,
            }).then(function (response) {
                //handle success
                console.log(response);
                alert("Registered Successfully!!!!")
            })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                    alert("Email already exist .Please Registered with another Email")
                });
            myData.userName = '';
            myData.userEmail = '';
            myData.userNumber = '';
            myData.role = '';
            myData.password = '';

        }
    }
}
</script>