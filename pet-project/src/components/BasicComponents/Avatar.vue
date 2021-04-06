<template>
    <v-avatar>
        <v-img :src="src" />
    </v-avatar>
</template>

<script>
export default {
    name:'Avatar',
    props: { 
        src: {type: String, default: ''}
    }

}
</script>