
<template>
  <div>
    <div class="cart-section">
      <div class="cart-img">
        <!-- <v-img :src="$store.state.cart.image" class="w-50 ma-auto imgBox">
          <template #sources>
            <source :srcset="$store.state.cart.image" />
          </template>
        </v-img> -->
      </div>

      {{ this.$store.state.cart }}
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "Cart",
  data() {
    return {
        // image: '',
        // title:'',
        // price: ''
    };
  },
};
</script>
  