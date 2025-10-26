<script setup>
import { ref } from 'vue'
import Tabs from './Tabs.vue'
import Tab from './Tab.vue'

const current1 = ref('profile')
const current2 = ref('dashboard')
const current3 = ref('home')
</script>

<template>
  <div class="space-y-8 p-8">
    <h1 class="text-3xl font-bold text-center">Tabs Component Demo</h1>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">Underline Variant</h2>
      <Tabs v-model="current1" variant="underline">
        <Tab title="Профіль" slug="profile">
          <div class="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h3 class="text-lg font-semibold mb-2">Вміст профілю</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Тут розміщена інформація про профіль користувача. Можна відобразити аватар, ім'я, email та інші деталі.
            </p>
          </div>
        </Tab>
        <Tab title="Налаштування" slug="settings">
          <div class="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h3 class="text-lg font-semibold mb-2">Форма налаштувань</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Форма для зміни налаштувань облікового запису. Тут можна змінювати пароль, мову інтерфейсу та інші параметри.
            </p>
          </div>
        </Tab>
        <Tab title="Контакти" slug="contacts">
          <div class="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h3 class="text-lg font-semibold mb-2">Контактна інформація</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Контактні дані, адреси, телефони та інша важлива інформація для зв'язку.
            </p>
          </div>
        </Tab>
      </Tabs>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">Pills Variant</h2>
      <Tabs v-model="current2" variant="pills">
        <Tab title="Dashboard" slug="dashboard">
          <div class="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h3 class="text-lg font-semibold mb-2">Панель керування</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Загальна статистика та огляд вашої активності.
            </p>
          </div>
        </Tab>
        <Tab title="Projects" slug="projects">
          <div class="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h3 class="text-lg font-semibold mb-2">Проекти</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Список всіх ваших проектів та їх статуси.
            </p>
          </div>
        </Tab>
        <Tab title="Reports" slug="reports">
          <div class="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h3 class="text-lg font-semibold mb-2">Звіти</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Детальні звіти та аналітика по вашим проектам.
            </p>
          </div>
        </Tab>
        <Tab title="Team" slug="team">
          <div class="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h3 class="text-lg font-semibold mb-2">Команда</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Члени команди та їх контактна інформація.
            </p>
          </div>
        </Tab>
      </Tabs>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold">Boxed Variant</h2>
      <Tabs v-model="current3" variant="boxed">
        <Tab title="Home" slug="home">
          <div class="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h3 class="text-lg font-semibold mb-2">Головна сторінка</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Ласкаво просимо! Тут знаходиться основна інформація.
            </p>
          </div>
        </Tab>
        <Tab title="About" slug="about">
          <div class="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h3 class="text-lg font-semibold mb-2">Про нас</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Інформація про компанію та наші цінності.
            </p>
          </div>
        </Tab>
        <Tab title="Services" slug="services">
          <div class="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h3 class="text-lg font-semibold mb-2">Послуги</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Перелік послуг, які ми пропонуємо.
            </p>
          </div>
        </Tab>
      </Tabs>
    </section>
  </div>
</template>