<template>
  <div class="table-responsive m-5 w-auto ">
    <div class="mb-3 ">
      <h4 class="ml-1">
        <FontAwesomeIcons :icon="['fas', 'user']" />User Table
        <button @click="showAddUserModal" type="button" class="btn btn-outline-primary float-right mb-3">
          <FontAwesomeIcons :icon="['fas', 'user-plus']" /> <span class="ml-1 ">Add User</span>
        </button>
      </h4>
    </div>
    <div class="table-respons">
      <table class="table table-bordered table-striped text-center">
        <thead class="thead-secondary">
          <tr>
            <th scope="col">User_Id</th>
            <th scope="col">User_Name</th>
            <th scope="col">User_Email</th>
            <th scope="col">User_Number</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <!----------Write the table body Content here-->
        <tbody>
          <tr v-for="(user, index) in this.userData" :key="index">
            <td>{{ user.userId }}</td>
            <td>{{ user.userName }}</td>
            <td>{{ user.userEmail }}</td>
            <td>{{ user.userNumber }}</td>
            <td>{{ user.role }}</td>
            <td>
              <div class="d-flex flex-row ">
                <button @click="showEditUserModal(user)" type="button" class="btn btn-outline-warning w-50 m-1">
                  <FontAwesomeIcons :icon="['fas', 'edit']" />
                </button>
                <button class="btn btn-outline-danger w-50 m-1" @click="deleteData(user.userId)">
                  <FontAwesomeIcons :icon="['fas', 'trash-alt']" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- Modal component -->
  <div class="modal fade" id="userModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ isEditMode ? 'Edit User' : 'Add User' }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="username">User Name </label>
              <input type="text" class="form-control" id="username" v-model="userName">
            </div>

            <div class="form-group">
              <label for="useremail">Email </label>
              <input type="text" class="form-control" id="useremail" v-model="userEmail">
            </div>

            <div class="form-group" v-if="showpass">
              <label for="password">Password</label>
              <input type="password" id="password" class="form-control " v-model="password" />
            </div>

            <div class="form-group">
              <label for="userNumber">Your Number</label>
              <input type="tel" id="userNumber" class="form-control " v-model="userNumber" />
            </div>

            <div class="form-group">
              <label for="option">Select a Role:</label>
              <select class="form-control " id="role" v-model="role">
                <option value="">-- Please select --</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Superadmin">Superadmin</option>
              </select>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="saveUser">{{ isEditMode ? 'Save' : 'Add' }}
            User</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>

import axios from 'axios';
import bcrypt from 'bcryptjs';
import eventBus from '@/EventBus/Event-Bus'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  data() {
    return {
      userData: [],
      isEditMode: false,
      userName: '',
      userEmail: '',
      userNumber: '',
      password: '',
      role: '',
      temp: null,
      showpass: false,
    }
  },
  mounted() {
    this.getUserData();
  },

  methods: {
    //Method to fetch the data from the database
    getUserData() {
      axios.get('http://localhost:8080/rest/webapi/user/getuserdata').then(res => {
        this.userData = res.data
        this.sendData();
      })
    },
    sendData() {
      eventBus.emit('userdata-send', this.userData)
    },
    showAddUserModal() {
      this.isEditMode = false,
        this.showpass = true,
        this.userName = '',
        this.userEmail = '',
        this.userNumber = '',
        this.password = '',
        this.role = ''
      // eslint-disable-next-line no-undef
      $('#userModal').modal('show');
    },
    showEditUserModal(user) {
      this.temp = user,
        this.isEditMode = true,
        this.showpass = false,
        this.userName = user.userName,
        this.userEmail = user.userEmail,
        this.userNumber = user.userNumber,
        this.role = user.role
      console.log(this.role)
      // eslint-disable-next-line no-undef
      $('#userModal').modal('show');
    },
    async saveUser() {
      // Hash the password using bcrypt
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(this.password, salt);
      // console.log(hashedPassword);

      const data = {
        userName: this.userName,
        userEmail: this.userEmail,
        userNumber: this.userNumber,
        role: this.role,
        // storing the hashed password into the data object 
        password: hashedPassword
      };
      if (this.isEditMode) {
        this.temp.userName = this.userName;
        this.temp.userEmail = this.userEmail;
        this.temp.userNumber = this.userNumber,
          this.temp.role = this.role,

          // Update user data in the database
          axios.put('http://localhost:8080/rest/webapi/user/userupdate', this.temp).then(res => {
            // Success message or any other action you want to perform
            console.log(res)
            alert("User Updated Successfully!!!!!!!")
          })
            .catch(error => {
              console.log(error);
              alert("Something went wrong. Please try again later.")
            });
      } else {
        //form validation
        if (!this.userName || !this.userEmail || !this.password || !this.userNumber || !this.role) {
          alert('Please fill in all required fields.');
          return;
        }
        await axios.post('http://localhost:8080/rest/webapi/user/adduserdata', data).then(res => {
          console.log(res)
          alert("New User Added Successfully!!!!!!!")
        })
          .catch(error => {
            console.log(error);
            alert("Something went wrong. Please try again later.")
          });
        this.getUserData();
      }
      // Clear the input fields and hide the modal
      this.userName = '',
        this.userEmail = '',
        this.userNumber = '',
        this.password = '',
        this.role = ''
      // eslint-disable-next-line no-undef
      $('#userModal').modal('hide');

    },
    deleteData(id) {
      console.log(id)

      if (confirm(`Do you really want to delete the User with ID ${id} ?????`)) {
        axios.delete(`http://localhost:8080/rest/webapi/user/${id}`)
          .then(response => {
            console.log(response);
            this.userData = this.userData.filter(items => items.userId !== id);
            this.getUserData();
          })
          .catch(function (error) {
            console.log(error.response);
          });
      }
    }
  },

}
</script>