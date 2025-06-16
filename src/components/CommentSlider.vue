<template>
  <swiper
    :modules="[Autoplay]"
    :slides-per-view="3"
    :breakpoints="{
      0: { slidesPerView: 1 },
      600: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }"
    v-if="comments.length >= 3"
    :space-between="20"
    :loop="true"
    :autoplay="{ delay: 0, disableOnInteraction: false }"
    :speed="5000"
    class="q-mt-xl"
    @swiper="onSwiper"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <swiper-slide v-for="(c, i) in comments" :key="i">
      <q-card class="q-ma-xs">
        <q-card-section class="q-pb-xs">
          <div class="row items-center q-gutter-x-sm">
            <div style="font-size: small">نویسنده:</div>
            <span style="font-size: medium"> {{ c.author }}</span>
          </div>
          <div class="commentBody q-mt-sm bg-grey-1 q-pa-sm shadow-2">{{ c.comment }}</div>
        </q-card-section>
        <q-card-actions align="right" class="q-px-lg q-py-sm row items-center q-gutter-x-xs">
          <span>10</span>
          <!-- <q-icon name="favorite_outlined" size="sm" class="cursor-pointer" /> -->
          <q-icon name="favorite" size="sm" color="red" class="cursor-pointer" />
        </q-card-actions>
      </q-card>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const comments = ref([]);
const swiperInstance = ref(null);

onMounted(async () => {
  try {
    const res = await api.get('/comments');
    comments.value = res.data.comments;
  } catch (e) {
    console.error(e);
  }
});

function onSwiper(swiper) {
  swiperInstance.value = swiper;
}

function startAutoplay() {
  swiperInstance.value?.autoplay?.start();
}

function stopAutoplay() {
  swiperInstance.value?.autoplay?.stop();
}
</script>
