<template>
    <v-btn id="button" :color="color" @click="onClick">
          {{name}}
    </v-btn>
</template>

<script>
export default {
    name: 'BasicButton',
    props: {
        name: { type: String, default: '' },
        color: { type: String, default: '#F1F3F5' }
    },
    methods: {
        onClick() {
            this.$emit('onClick')
        }
    }
}
</script>

