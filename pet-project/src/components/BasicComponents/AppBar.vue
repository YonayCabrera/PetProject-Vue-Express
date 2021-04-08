<template>
    <v-app-bar
      app
      color="#001392"
      dark
    >
    <slot name="content" />
    <slot />
    </v-app-bar>
</template>

<script>
export default {
    name: 'AppBar'
}
</script>