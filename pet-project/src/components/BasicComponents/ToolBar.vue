<template>
    <v-toolbar
      color="primary"
      dark
    >
    <slot name="content" />
    <slot />
    </v-toolbar>
</template>

<script>
export default {
    name: 'ToolBar'
}
</script>