<script setup>
import { Notify } from 'quasar';
import { ref } from 'vue';
const drawer = ref(false);
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const drawerList = ref([
  { id: 1, label: 'معرفی', name: 'ourInformation', icon: 'contact_mail', iconColor: 'info' },
  {
    id: 2,
    label: 'معرفی خدمات',
    name: 'serviceIntroduction',
    icon: 'construction',
    iconColor: 'primary',
  },
  {
    id: 3,
    label: 'نظرات',
    name: 'commentSlider',
    icon: 'diversity_1',
    iconColor: 'red',
  },
  {
    id: 4,
    label: 'نظرات مشتریان',
    name: 'customerPersuasion',
    icon: 'psychology',
    iconColor: 'orange',
  },
  {
    id: 5,
    label: 'تماس با ما',
    name: 'contactUs',
    icon: 'connect_without_contact',
    iconColor: 'secondary',
  },
]);

function scrollToSection(sectionName) {
  if (route.name !== 'home') {
    router.push({ name: 'home' }).then(() => {
      setTimeout(() => {
        scrollNow(sectionName);
      }, 300);
    });
  } else {
    scrollNow(sectionName);
  }
}

function scrollNow(sectionName) {
  const pageComponent = router.currentRoute.value.matched[0].instances.default;

  if (pageComponent && pageComponent[sectionName + 'Section']?.$el) {
    pageComponent[sectionName + 'Section'].$el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

const token1 = localStorage.getItem('authToken');

function logout() {
  localStorage.removeItem('authToken');
  router.push('/auth');
  Notify.create({
    message: 'شما با موفقیت خارج شدید.',
    type: 'info'
  });
}

</script>
<template>
  <q-layout view="hHr lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat @click="drawer = true" round dense icon="menu" v-if="drawer == false" />
        <q-btn flat @click="drawer = false" round dense icon="menu_open" v-else />

        <q-toolbar-title align="center">تعمیرات تخصصی تلویزیون آسیا</q-toolbar-title>
        <div v-if="!token1">
          <q-btn outline label="ورود | ثبت نام" @click="router.push('/auth')">
            <template v-slot:prepend>
              <q-icon name="login" size="lg" />
            </template>
          </q-btn>
        </div>
        <div v-else>
          <q-btn-dropdown round flat dropdown-icon="person" no-icon-animation>
            <q-list style="width: 120px" separator >
              <q-item clickable v-close-popup >
                <q-item-action class="q-mr-md">
                  <q-icon name="person" size="sm" />
                </q-item-action>
                <q-item-section>
                  <q-item-label>پروفایل</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup >
                <q-item-action class="q-mr-md">
                  <q-icon name="notifications" size="sm" />
                </q-item-action>
                <q-item-section>
                  <q-item-label>اعلان ها</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="logout" class="row items-center">
                <q-item-action class="q-mr-md">
                  <q-icon name="logout" size="sm" class="rotate-180" />
                </q-item-action>
                <q-item-section>
                  <q-item-label>خروج</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" side="right" :width="250" :breakpoint="700" bordered>
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            clickable
            v-ripple
            v-for="item in drawerList"
            :key="item.id"
            @click="scrollToSection(item.name)"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" :color="item.iconColor" />
            </q-item-section>
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
