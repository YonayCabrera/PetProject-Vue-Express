<template>
    <v-toolbar
      :color="color"
      dark
    >
    <slot name="content" />
    <slot />
    </v-toolbar>
</template>

<script>
export default {
    name: 'ToolBar',
    props: {
      color: {type: String, default: 'primary'}
    }
}
</script>