<template>
  <div class="table-responsive m-5 w-auto">
    <div class="mb-3">
      <h4>Zoo Table
        <button @click="showAddZooModal" type="button" class="btn btn-outline-primary float-right mb-3">
          <FontAwesomeIcons :icon="['fas', 'plus']" /><span class="ml-1">Add Zoo</span>
        </button>
      </h4>
    </div>
    <div class="table-responsive">
      <table class="table table-bordered table-striped text-center">
        <thead class="thead-secondary">
          <tr>
            <th scope="col">Zoo_Id</th>
            <th scope="col">Zoo_Name</th>
            <th scope="col">Zoo_Location</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(zoodata, index) in zooData" :key="index">
            <td>{{ zoodata.zooId }}</td>
            <td>{{ zoodata.zooName }}</td>
            <td>{{ zoodata.zooLocation }}</td>
            <td>
              <div class="d-flex flex-row">
                <button @click="showEditZooModal(zoodata)" type="button" class="btn btn-outline-warning w-50 m-1">
                  <FontAwesomeIcons :icon="['fas', 'edit']" />
                </button>
                <button class="btn btn-outline-danger w-50 m-1" @click="deleteData(zoodata.zooId)">
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
  <div class="modal fade" id="zooModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ isEditMode ? 'Edit Zoo' : 'Add Zoo' }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="zooname">Zoo Name </label>
              <input type="text" class="form-control" id="zooname" v-model="zooName">
            </div>

            <div class="form-group">
              <label for="zoolocation">Zoo Location </label>
              <input type="text" class="form-control" id="zoolocation" v-model="zooLocation">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="saveZoo">{{ isEditMode ? 'Save' : 'Add' }}
            Zoo</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>

import axios from 'axios';

export default {
  data() {
    return {
      zooData: [],
      zooName: '',
      zooLocation: '',
      isEditMode: false,
      temp: null,
    }
  },
  created() {
    //Make a function to fetch the data from the database
    axios.get('http://localhost:8080/rest/webapi/zoo/getzoodata').then(response => {
      this.zooData = response.data;

    })
  },

  methods: {
    showAddZooModal() {
      this.isEditMode = false;
      this.zooName = '';
      this.zooLocation = '';
      // eslint-disable-next-line no-undef
      $('#zooModal').modal('show');
    },
    showEditZooModal(zoo) {
      this.temp = zoo
      // console.log(zoo);
      this.isEditMode = true;
      this.zooName = zoo.zooName;
      this.zooLocation = zoo.zooLocation;
      // eslint-disable-next-line no-undef
      $('#zooModal').modal('show');
    },
    saveZoo() {
      const data = {
        zooName: this.zooName,
        zooLocation: this.zooLocation,
      };
      if (this.isEditMode) {
        this.temp.zooName = this.zooName;
        this.temp.zooLocation = this.zooLocation;

        // Update Zoo  data in the database
        axios.put('http://localhost:8080/rest/webapi/zoo/zooupdate', this.temp).then(res => {
          // Success message or any other action you want to perform
          console.log(res)
        }).then(function (response) {
          console.log(response);
          alert("Zoo Updated Successfully!!!!!!!")
        })
          .catch(error => {
            console.log(error);
            alert("Something went wrong. Please try again later.")
          });
      } else {

        // validate the form data
        if (!this.zooName || !this.zooLocation) {
          alert('Please fill in all required fields.');
          return;
        }
        axios.post('http://localhost:8080/rest/webapi/zoo/addzoodata', data).then(res => {
          console.log(res)
        }).then(function (response) {
          console.log(response);
          alert("New Zoo Added Successfully!!!!!!!")
        })
          .catch(error => {
            console.log(error);
            alert("Something went wrong. Please try again later.")
          });
      }
      // Clear the input fields and also hide the modal
      this.zooName = '';
      this.zooLocation = '';
      // eslint-disable-next-line no-undef
      $('#zooModal').modal('hide');
    },
    //Make a function to delete the data from the database
    deleteData(id) {
      console.log(id);

      if (confirm(`Do you really want to delete the Zoo with ID ${id} ?????`)) {
        axios.delete(`http://localhost:8080/rest/webapi/zoo/${id}`)
          .then(response => {
            console.log(response);
            this.zooData = this.zooData.filter(zoodata => zoodata.zooId !== id)

          })
          .catch(function (error) {
            console.log(error.response);
          });
      } else {
        // User clicked "Cancel" button
        // Do nothing or show a message here
      }
    }
  },

}
</script>