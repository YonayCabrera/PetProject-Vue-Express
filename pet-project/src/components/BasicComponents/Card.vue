<template>
    <v-card class="mx-auto" max-width="500">
        <slot name="content" />
        <slot />
    </v-card>
</template>

<script>
export default {
    name: 'Card'
}
</script>