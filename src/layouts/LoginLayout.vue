<script setup>
/* global google */
import { jwtDecode } from 'jwt-decode';
import { encryptToken, decryptToken } from 'src/boot/encryption';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { createToken, parseJwt } from 'src/boot/JWT';
import LoginPageVue from 'src/pages/Authentication/LoginPage.vue';
import SignUpPage from 'src/pages/Authentication/SignUpPage.vue';
import { computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//////////////////////////////////////////////////////////////////

// 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

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

const clientId = 'REPLACED_GOOGLE_CLIENT_ID';

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

function loadGoogleSDK() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      return resolve();
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = () => {
      console.error('Failed to load Google SDK');
      reject(new Error('Failed to load Google SDK'));
    };
    document.head.appendChild(script);
  });
}

async function initializeGoogleSignIn() {
  try {
    await loadGoogleSDK();

    google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        handleGoogleResponse(response);
      },
      ux_mode: 'popup',
      login_uri: window.location.origin + '/auth',
      allowed_parent_origin: window.location.origin,
    });

    google.accounts.id.renderButton(document.getElementById('googleBtn'), {
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      width: 368,
    });

    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        console.log('Google One Tap prompt was not displayed');
      }
    });
  } catch (error) {
    console.error('Initialization error:', error);
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
      client_id=${clientId}&
      redirect_uri=${encodeURIComponent(window.location.origin + '/auth')}&
      response_type=token&
      scope=email%20profile&
      state=YOUR_STATE`;
  }
}

async function handleGoogleResponse(response) {
  try {
    if (!response || !response.credential) {
      throw new Error('پاسخ نامعتبر از گوگل دریافت شد');
    }

    const decoded = jwtDecode(response.credential);

    const userData = {
      username: decoded.email ? decoded.email.split('@')[0] : null,
      name: decoded.name || '',
      email: decoded.email || null,
      avatar: decoded.picture || '',
      role: 'user',
      google_id: decoded.sub || null,
    };

    const { data } = await api.post('/checkuser', {
      email: userData.email,
      google_id: userData.google_id,
    });

    let token;
    if (data.users && data.users.length > 0) {
      token = createToken(data.users[0]);
      Notify.create({ message: 'خوش آمدید!', type: 'positive' });
    } else {
      const signupRes = await api.post('/signup-google', userData);
      token = createToken(signupRes.data.insert_users.returning[0]);
      Notify.create({ message: 'ثبت‌نام موفق!', type: 'positive' });
    }

    localStorage.setItem('authToken', token);
    router.push('/');
  } catch (err) {
    console.error('خطا در پردازش پاسخ گوگل:', err);
    Notify.create({
      message: err.response?.data?.message || 'خطا در ورود با گوگل',
      type: 'negative',
    });
    router.push('/auth');
  }
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
        localStorage.setItem('authToken', encryptToken(token));
        Notify.create({
          message: 'با موفقیت وارد شدید.',
          type: 'positive',
        });
        const token1 = decryptToken(localStorage.getItem('authToken'));
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

      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~\\/-]{8,}$/;

      if (!strongPasswordRegex.test(signup.password)) {
        Notify.create({
          message: 'رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ، کوچک، عدد و نماد باشد.',
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
      });

      if (response.data.insert_users_one) {
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

onMounted(async () => {
  try {
    initializeGoogleSignIn();

    if (window.google?.accounts?.id?.disableAutoSelect) {
      google.accounts.id.disableAutoSelect();
    }
  } catch (e) {
    console.error('خطا در لود اسکریپت گوگل', e);
  }
});
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="flex flex-center">
    <q-form class="authForm shadow-10" @submit="Submit">
      <div v-if="route.path == '/auth'">
        <q-page-container style="max-height: 300px">
          <LoginPageVue :form="login" @update:form="updateLoginForm" />
        </q-page-container>
      </div>
      <div v-if="route.path == '/auth/signup'">
        <q-page-container style="max-height: 550px">
          <SignUpPage :form="signup" @update:form="updateSignupForm" />
        </q-page-container>
      </div>

      <div class="q-px-md q-pb-md column q-gutter-y-md">
        <q-btn :label="changeLabel" size="lg" type="submit" color="primary" class="full-width" />

        <div id="googleBtn" class="q-mt-md"></div>
      </div>
    </q-form>
  </q-layout>
</template>
<style scoped>
.q-layout {
  background-color: rgb(245, 245, 245);
}
.authForm {
  background: white;
}
</style>
