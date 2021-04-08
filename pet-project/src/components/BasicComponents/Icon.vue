<template>
    <v-icon @click="onClick" :size="size" :color="color"> {{value}} </v-icon>
</template>

<script>
export default {
    name: 'Icon',
    props: {
        size: { type: String, default: undefined},
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