<template>
    <div>
        <p v-if="forumList.length==0" class="alert">
            форуми відсутні
        </p>
        
        <table v-if="forumList.length>0">
            <tr>
                <th>#</th>
                <th v-on:click="sort('theme')">  Тема </th>
                <th v-on:click="sort('short describe')">  Короткий опис </th>
                <th v-on:click="sort('date published')"> Дата публікації </th>
                <th v-on:click="sort('count of speaks')"> Кількість обговорень </th>
                <th></th>
            </tr>
            <forumTableRow v-for="(forum,index) in forumList" 
                v-bind:key="forum._id" 
                v-bind="{forum,index}"
                @remove="remove"
                @update="update" 
            >             
            </forumTableRow>
        </table>
    </div> 
</template>

<script>
import forumTableRow from "./forummTableRow";
import { mapGetters, mapMutations} from 'vuex';


export default {
    name:"forumTable",      
    data(){
        return{         
          
        }
    },
    components:{
        forumTableRow
    },
    computed:{
       ...mapGetters({
           forums:"filtredForums"
       }) 
    },    
    methods:{
        ...mapMutations({
            sort:"sortForums"
        })
    }    
}
</script>

<style scoped>
    .alert{
        background: yellow;
        color: crimson;
    }

    table, table td{
        border-collapse: collapse;
        border: 1px solid black;
        width: 100%;
    }
</style>