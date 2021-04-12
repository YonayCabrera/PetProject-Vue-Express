<template>
    <v-avatar size="80">
        <v-img id="image" :src="src" />
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