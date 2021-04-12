<template>
    <div>
        <v-list
        style="max-height: 400px"
        class="overflow-y-auto">
        <v-list-item-group
            v-model="selected"
            active-class="pink--text"
        >
        <template v-for="(item, index) in items">
          <v-list-item :key="item.login.uuid">
            <template>
              <v-list-item-content id="content">
                {{item.gender}}, {{item.name.first}} {{item.name.last}}, {{item.email}}, {{item.nat}}, {{item.dob.date}}, {{item.dob.age}}, {{item.registered.date}}
              </v-list-item-content>
            </template>
          </v-list-item>

          <divider v-if="index < items.length - 1" :key="index"/>
        </template>
      </v-list-item-group>
    </v-list>
    </div>
</template>

<script>
import Divider from './Divider.vue';
export default {
    name: 'List',
    props: {
        items: {type: Array, default: ()=> []}
    },
    components: {
        Divider
    },
    data() {
        return {
            selected: undefined
        }
    },
    watch: {
        selected(value) {
            this.$emit('selectedValue', value)
        }
    }
}
</script>