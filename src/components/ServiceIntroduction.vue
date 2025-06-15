<script setup>
import { ref } from 'vue';
const Services = ref([
  {
    id: 1,
    imgURL: '/images/LED.webp',
    caption: ' تعویض LED انواع تلویزیون ها با سریع ترین زمان و ضمانت 1 ساله',
  },
  {
    id: 2,
    imgURL: '/images/RepairIC.webp',
    caption: 'تعمیر انواع برد ها از جمله بردهای تلویزیون پلاسما',
  },
  {
    id: 3,
    imgURL: '/images/TVTikan.webp',
    caption: 'تعمیر خط و آب خوردگی تلویزیون با دستگاه های مخصوص و به روز',
  },
  {
    id: 4,
    imgURL: '/images/Board.webp',
    caption: 'تعمیر مشکلات نرم افزاری و ارتقای حافظه',
  },
  {
    id: 5,
    imgURL: '/images/Shelf.webp',
    caption: 'استفاده از بهترین و باکیفیت ترین اجناس',
    style: 'max-height:290px;',
  },
]);
</script>

<template>
  <div class="row items-center q-gutter-xl justify-center">
    <div
      class="Image relative-position cursor-not-allowed shadow-2"
      v-for="Service in Services"
      :key="Service.id"
    >
      <q-img :src="Service.imgURL" fit="cover" :style="Service.style ? Service.style : ''" loading="lazy" >
        <div class="absolute-bottom text-center q-pa-xs">
          {{ Service.caption }}
        </div>
      </q-img>
    </div>
  </div>
</template>
