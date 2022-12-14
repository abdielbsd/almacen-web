<template>
  <div class="about">
    <v-container fluid fill-height>
      <v-row class="text-center" no-gutters justify="center">
        <v-col cols="12" align-self="center">
          <v-carousel>
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "img_static/img1.jpg",
        },
        {
          src: "img_static/img2.jpg",
        },
        {
          src: "img_static/img3.jpg",
        }
      ],
    };
  },
};
</script>