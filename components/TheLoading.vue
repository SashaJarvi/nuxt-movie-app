<template>
  <div class="loading">
    <span class="loading__circle"></span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  &__circle {
    display: block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: #fff;
    animation: circle-loading 1200ms ease infinite;
  }
}

@keyframes circle-loading {
  to {
    transform: rotateZ(360deg);
  }
}
</style>
