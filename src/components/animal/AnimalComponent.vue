<!-- eslint-disable no-undef -->
<template>
  <div class="table-responsive m-5 w-auto ">
    <div class="mb-3 ">
      <h4>
        Animal Table
        <button @click="showAddAnimalModal" type="button" class="btn btn-outline-primary float-right mb-3">
          <FontAwesomeIcons :icon="['fas', 'plus']" /><span class="ml-1">Add Animal</span>
        </button>
      </h4>
    </div>
    <div class="table-responsive">
      <table class="table table-bordered table-striped text-center">
        <thead class="thead-secondary">
          <tr>
            <th scope="col">Animal_Id</th>
            <th scope="col">Animal_Name</th>
            <th scope="col">Animal_Gender</th>
            <th scope="col">Animal_Zoo_Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(animaldata, index) in animalData" :key="index">
            <td>{{ animaldata.animalId }}</td>
            <td>{{ animaldata.animalName }}</td>
            <td>{{ animaldata.animalGender }}</td>
            <td>{{ animaldata.animalZooName }}</td>
            <td>
              <div class="d-flex flex-row">
                <button @click="showEditAnimalModal(animaldata)" type="button" class="btn btn-outline-warning w-50 m-1">
                  <FontAwesomeIcons :icon="['fas', 'edit']" />
                </button>
                <button class="btn btn-outline-danger w-50 m-1" @click="deleteData(animaldata.animalId)">
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
  <div class="modal fade" id="animalModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ isEditMode ? 'Edit Animal' : 'Add Animal' }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="animalname">Animal Name </label>
              <input type="text" class="form-control" id="animalname" v-model="animalName">
            </div>

            <div class="form-group">
              <label for="animalzooname">Animal Zoo Name </label>

              <!--Show the Below Input field when the isEditMode is true-->
              <input type="text" class="form-control" id="animalzooname" v-model="animalZooName" v-if="isEditMode">

              <!--Show the Below Select field when the isEditMode is false-->
              <select id="animalzooname" class="form-control" v-model="animalZooName" v-if="!isEditMode">
                <option value="">-- Please select Animal Zoo Name --</option>
                <option v-for="(items, zooId) in zooData" :key="zooId">
                  {{ items.zooName }},{{ items.zooLocation }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="option">Select Gender:</label>
              <select class="form-control " id="gender" v-model="animalGender">
                <option value="">-- Please select --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="saveAnimal">{{ isEditMode ? 'Save' : 'Add' }}
            Animal</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>

import axios from 'axios';
import eventBus from '@/EventBus/Event-Bus';

export default {
  data() {
    return {
      animalData: [],
      animalName: '',
      animalGender: '',
      animalZooName: '',
      isEditMode: false,
      temp: null,
      zooData: [],
    }
  },
  mounted() {
    this.getanimalData();
    this.getZooData();
  },
  methods: {
    getanimalData() {
      //Method to Fetch the Data From tha Database
      axios.get('http://localhost:8080/rest/webapi/animal/getanimaldata').then(res => {
        this.animalData = res.data;
        this.sendData();
      });
    },
    getZooData() {
      //Method to Fetch the Zoo Data From the Database
      axios.get('http://localhost:8080/rest/webapi/zoo/getzoodata').then(response => {
        this.zooData = response.data;
        // console.log(this.zooData);
      })
    },
    sendData(){
      eventBus.emit('send-animaldata', this.animalData)
    },
    showAddAnimalModal() {
      this.isEditMode = false,
        this.animalName = '',
        this.animalGender = '',
        this.animalZooName = ''

      // eslint-disable-next-line no-undef
      $('#animalModal').modal('show');
    },
    showEditAnimalModal(animal) {
      //stroing the data into the temp varible
      this.temp = animal,
        this.isEditMode = true,
        this.animalName = animal.animalName,
        this.animalGender = animal.animalGender,
        this.animalZooName = animal.animalZooName,
        // eslint-disable-next-line no-undef
        $('#animalModal').modal('show');
    },
    // Make a function to add and update the animal Data
    async saveAnimal() {
      const data = {
        animalName: this.animalName,
        animalZooName: this.animalZooName,
        animalGender: this.animalGender,
      };
      if (this.isEditMode) {
        this.temp.animalName = this.animalName;
        this.temp.animalZooName = this.animalZooName;
        this.temp.animalGender = this.animalGender,

          // Update Animal data in the database
          axios.put('http://localhost:8080/rest/webapi/animal/animalupdate', this.temp).then(res => {
            // Success message or any other action you want to perform
            console.log(res)
            alert("Animal Updated Successfully!!!!!!!")
          })
            .catch(error => {
              console.log(error);
              alert("Something went wrong. Please try again later.")
            });

      } else {
        // validate the form data
        if (!this.animalName || !this.animalZooName || !this.animalGender) {
          alert('Please fill in all required fields.');
          return;
        }
        await axios.post('http://localhost:8080/rest/webapi/animal/addanimaldata', data).then(res => {
          console.log(res)
          alert("New Animal Added Successfully!!!!!!!")
        })
          .catch(error => {
            console.log(error);
            alert("Something went wrong. Please try again later.")
          });

        this.getanimalData();
      }
      // Clear the input fields and hide the modal
      this.animalName = '';
      this.animalGender = '';
      this.animalZooName = '';
      // eslint-disable-next-line no-undef
      $('#animalModal').modal('hide');
    },

    // make a function to delete the Animal Data 
    deleteData(id) {
      console.log("Deleted Animal id: ", id);

      if (confirm(`Do you really want to delete the Animal with ID ${id} ?????`)) {
        axios.delete(`http://localhost:8080/rest/webapi/animal/${id}`)
          .then(response => {
            console.log(response);
            this.animalData = this.animalData.filter(animaldata => animaldata.animalId !== id)
            this.getanimalData();
          })
          .catch(function (error) {
            console.log(error.response);
          });
      }
    }
  },

}
</script>