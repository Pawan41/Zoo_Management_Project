<template>

  <div class="Home mt-3">
    <img :src="imageUrl" alt="Dynamic Image" class="home-img">
  </div>
  <div class="text-center mt-3 mb-0">
    <p> Copyright © 2023 ZooS,India. All rights reserved.</p>
  </div>
</template>

<script>

export default{
  data(){
    return{
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/000/362/602/original/cute-animals-in-the-zoo-vector.jpg'
    }
  }
}

</script>

<style>

.home-img{
  width:100%;
  height:80vh;
}

</style>

