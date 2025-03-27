<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Developer Conferences website'
const description = 'Developer conferences website built with Nuxt.js and Nuxt UI Pro'
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <span>
          <UIcon name="ph-microphone-stage-fill" /> Developer Conferences
        </span>
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/nuxt-ui-pro/starter"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-(--ui-text-muted)">
          Copyright © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/nuxt-ui-pro/starter"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
