//форма для запитів
<template>
    <form @submit.prevent>
        Кількість обговорень до <input type="number" v-model.number="query.countOfSpeaks"> 
        <input type="button" value="Шукати" @click="search()">
        <input type="button" value="Очистити" @click="reset()">
    </form>
</template>
<script>
export default {
    data(){
        return{
            query:this.value
        }
    },
    methods:{
        reset(){
            this.query.countOfSpeaks = null;
            this.$emit("input",this.query);
        },
        search(){            
            this.$emit("input",this.query);
        }
    }
}
</script>