// рядок що відбражає 1 книгу
<template>
    <tr>        
        <td> {{index}} </td>
        <td> {{forum.theme}} </td>
        <td> {{new Date(forum.date).toLocaleDateString()}} </td>
        <td> {{forum.shortDescribe}} </td>
        <td> {{forum.countOfSpeaks}} </td>
        <td>
            <input type="button" value="Вилучити" @click="remove(index)">
            <input type="button" value="Редагувати" @click="update(index)">
        </td>        
    </tr>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name:"forumTableRow",
    props:{
        index:Number,
        forum:Object        
    },
    data(){   
        return{

        }
    },
    methods:{ 
        ...mapActions(["deleteForum", "showUpdateForm"]),
        updated(){
        console.log(this.forum);
        }            
    }
}
</script>

<style scoped>
    td{
        border: 1px solid black;
    }
</style>