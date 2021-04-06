<template>
    <v-btn>
        <div @click="onClick">
          {{name}}
        </div>
    </v-btn>
</template>

<script>
export default {
    name: 'BasicButton',
    props: {
        name: { type: String, default: '' }
    },
    methods: {
        onClick() {
            this.$emit('onClick')
        }
    }
}
</script>

