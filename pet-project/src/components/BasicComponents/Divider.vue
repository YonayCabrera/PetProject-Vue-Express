<template>
    <v-divider id="divider" :vertical="vertical"></v-divider>
</template>

<script>
export default {
    name:'Divider',
    props: {
        vertical: { type: Boolean, default: false }
    }
}
</script>