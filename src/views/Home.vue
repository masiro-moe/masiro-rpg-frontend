<template>
  <div class="home">这是一个巨大的 LOGO</div>
</template>

<script>
export default {
  name: "Home",
  created() {
    
  }
};
</script>

<style>
.home {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  max-height: 300px;
  font-size: 40px;
}
</style>