<script setup>
import ContactUs from 'src/components/ContactUs.vue';
import OurInformation from 'src/components/OurInformation.vue';
import ServiceIntroduction from 'src/components/ServiceIntroduction.vue';
import CustomerPersuasion from 'src/components/CustomerPersuasion.vue';
import CommentSlider from 'src/components/CommentSlider.vue';
</script>

<template>
  <q-page class="q-pa-sm">
    <div>
      <OurInformation id="ourInformation" />
      <div>
        <div class="q-mt-xl q-mr-md-lg q-mr-xs-none" id="serviceIntroduction">
          <ServiceIntroduction />
        </div>

        <CommentSlider id="commentSlider" />
        <div
          class="q-mr-md-xl q-mr-xs-none q-pr-md-xl q-pr-xs-none q-mt-xl q-pt-md row justify-around items-center"
          id="customerPersuasion"
        >
          <CustomerPersuasion />

          <ContactUs id="contactUs" class="q-mt-xs-lg q-mt-md-none" />
        </div>
      </div>
    </div>
  </q-page>
</template>
