<template>
    <v-app-bar
      app
      color="primary"
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