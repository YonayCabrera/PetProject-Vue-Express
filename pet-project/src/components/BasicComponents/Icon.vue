<template>
    <v-icon @click="onClick" :color="color"> {{value}} </v-icon>
</template>

<script>
export default {
    name: 'Icon',
    props: {
        color: {type: String, default: ''},
        value: {type: String, default: ''}
    },
    methods: {
        onClick() {
            this.$emit('onClick')
        }
    }
}
</script>