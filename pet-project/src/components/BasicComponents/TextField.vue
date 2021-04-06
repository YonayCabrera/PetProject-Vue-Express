<template>
    <div>
        <v-text-field
        :value="value"
        :label="label"
        :append-icon="icon"
        @input="filterList"
        >
      </v-text-field>
    </div>
</template>

<script>
export default {
    name: 'TextField',
    props: {
        value: {type: String, default: ''},
        label: {type: String, default: ''},
        icon: {type: String, default: ''}
    },
    methods: {
        filterList(value) {
            let returnValue= value
            this.$emit('valueOnChange', returnValue)
        }
    }
}
</script>