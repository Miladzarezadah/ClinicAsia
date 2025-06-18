<script setup>
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { createToken, parseJwt } from 'src/boot/JWT';
import LoginPageVue from 'src/pages/Authentication/LoginPage.vue';
import SignUpPage from 'src/pages/Authentication/SignUpPage.vue';
import { computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//////////////////////////////////////////////////////////////////
const login = reactive({
  username: '',
  password: '',
});
const signup = reactive({
  username: '',
  name: '',
  password: '',
  phone: '',
  email: '',
});
const route = useRoute();
const router = useRouter();

const changeLabel = computed(() => {
  if (route.path == '/auth') return 'ورود';
  else if (route.path == '/auth/signup') return 'ثبت نام';
  return 'ورود';
});

function updateLoginForm(value) {
  Object.assign(login, value);
}

function updateSignupForm(value) {
  Object.assign(signup, value);
}

async function Submit() {
  try {
    if (route.path == '/auth') {
      if (!login.password || !login.username) {
        Notify.create({
          message: 'لطفا اطلاعات خواسته شده را پر کنید',
          type: 'warning',
        });
        return false;
      }
      const response = await api.get('/login', {
        params: {
          username: login.username,
          password: login.password,
        },
      });
      const users = response.data.users;

      if (users.length) {
        const user = users[0];
        const token = createToken(user);
        localStorage.setItem('authToken', token);
        Notify.create({
          message: 'با موفقیت وارد شدید.',
          type: 'positive',
        });
        const token1 = localStorage.getItem('authToken');
        if (token1) {
          const decoded = parseJwt(token1);
          router.push('/');
          if (decoded && decoded.exp > Date.now() / 1000) {
            return decoded.user_id.role;
          } else {
            localStorage.removeItem('authToken');
            route.path = '/auth';
          }
        }
      } else {
        Notify.create({
          message: '.نام کاربری یا رمز عبور اشتباه است',
          type: 'negative',
        });
      }
    } else if (route.path == '/auth/signup') {
      const isFormValid = Object.values(signup).every((value) => value.trim() !== '');
      if (!isFormValid) {
        Notify.create({
          message: 'لطفا اطلاعات خواسته شده را پر کنید',
          type: 'warning',
        });
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signup.email)) {
        Notify.create({
          message: 'لطفا ایمیل را صحیح وارد کنید',
          type: 'warning',
        });
        return false;
      }

      const [resPhone, resEmail, resUsername] = await Promise.all([
        api.post(`/checkphone?phone=${signup.phone}`),
        api.post(`/checkemail?email=${signup.email}`),
        api.post(`/checkusername?username=${signup.username}`),
      ]);

      if (resUsername.data.users.length > 0) {
        Notify.create({
          message: 'این نام کاربری قبلا ثبت شده است.',
          type: 'negative',
        });
        return false;
      } else if (resEmail.data.users.length > 0) {
        Notify.create({
          message: 'این ایمیل قبلا ثبت شده است.',
          type: 'negative',
        });
        return false;
      } else if (resPhone.data.users.length > 0) {
        Notify.create({
          message: 'این شماره تماس قبلا ثبت شده است.',
          type: 'negative',
        });
        return false;
      }

      const response = await api.post('/signup', {
        name: signup.name,
        username: signup.username,
        password: signup.password,
        phone: signup.phone,
        email: signup.email,
        role: 'user',
      });

      console.log(response.data);
      if (response.data.insert_users) {
        Notify.create({
          message: 'اطلاعات مورد نظر ثبت شد.',
          type: 'positive',
        });
        router.push('/');
      } else {
        Notify.create({
          message: 'ساخت حساب با خطا مواجه شد',
          type: 'negative',
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="flex flex-center">
    <q-form class="authForm shadow-10" @submit="Submit">
      <div v-if="route.path == '/auth'">
        <q-page-container style="max-height: 350px">
          <LoginPageVue :form="login" @update:form="updateLoginForm" />
        </q-page-container>
      </div>
      <div v-if="route.path == '/auth/signup'">
        <q-page-container style="max-height: 550px">
          <SignUpPage :form="signup" @update:form="updateSignupForm" />
        </q-page-container>
      </div>

      <div class="q-px-md q-pb-md">
        <q-btn :label="changeLabel" size="lg" type="submit" color="primary" class="full-width" />
      </div>
    </q-form>
  </q-layout>
</template>
<!-- <style scoped>
.q-layout {
  background-image: url('src/assets/images/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style> -->
