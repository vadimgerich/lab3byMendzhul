import Vuex from 'vuex';
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        theme:"",
        shortDescription:"",
        searchString: "",
        date:Date,
        countOfSpeaks:0
    },
    getters: {
        firstMessage(state) {
            return state.messages[0];
        },
        areSomeMessages(state) {
            return state.messages.length > 0;
        },
        messagesCount(state) {
            return state.messages.length
        },
        filtredBooks(state) {
            let result = state.forums;
            if (state.searchString)
                result = result.filter(forum =>
                    book.title.toLowerCase().includes(state.searchString.toLowerCase())
                );
            return result;
        },

    },
    mutations: {
        addMessage(state, message) {
            state.messages.push(message);
        },
        removeMessage(state) {
            state.messages.shift();
        },


        setBooks(state, forums) {
            state.forums = forums;
        },
        addBook(state, forum) {
            state.forums.push(forum);
        },
        removeBook(state, forum) {
            const index = state.forums.indexOf(forum);
            state.forums.splice(index, 1);
        },
        updateBook(state, forum) {
            const index = state.forums.findIndex(b => b._id == forum._id);
            Vue.set(state.forums, index, forum);
        },
        sortBooks(state, field) {
            state.forums.sort((b1, b2) => b1[field] >= b2[field] ? 1 : -1);
        },

        showForm(state) {
            state.formVisible = true;
        },
        hideForm(state) {
            state.formVisible = false;
        },
        newFormMode(state) {
            state.formNewMode = true;
        },
        updateFormMode(state) {
            state.formNewMode = false;
        },

        clearFormForum(state) {
            Object.assign(state.formForum, {
                theme: "",
                shortDescription: "",
                date: "1997-01-10T22:00:00.000Z",
                countOfSpeaks: 0,
            });
        },
        setFormBook(state, forum) {
            state.formForum = forum;
        },
        setSerchString(state, string){
            state.searchString = string;
        }
    },
    actions: {
        async showMessageForTime(context, options) {
            const delay = options.delay || 5000;
            context.commit('addMessage', options.message);
            setTimeout(function () {
                if (context.getters.areSomeMessages)
                    context.commit('removeMessage');
            },
                delay);
        },


        async getForums(context) {
            try {
                let resp = await axios.get("http://localhost:5000/forum");
                context.commit("setForums", resp.data);
                await context.dispatch("showMessageForTime", { message: "форум завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async getForumById(context, id) {
            try {
                let resp = await axios.get(`http://localhost:5000/forum/${id}`);
                await context.dispatch("showMessageForTime", { message: "Форуми завантажено", delay: 500 });
                return resp.data;
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async getForumsByQuery(context, query) {
            try {
                let resp = await axios.get("http://localhost:5000/forum", { params: query });
                context.commit("setForums", resp.data);
                await context.dispatch("showMessageForTime", { message: "Форуми завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }

        },
        async postForum(context, forum) {
            try {
                let resp = await axios.post("http://localhost:5000/forum", forum);
                context.commit("addForum", resp.data);
                await context.dispatch("showMessageForTime", { message: "Форум додано", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async deleteForum(context, forum) {
            try {
                let resp = await axios.delete(`http://localhost:5000/forum/${forum._id}`);
                context.commit("removeForum", resp.data);
                await context.dispatch("showMessageForTime", { message: "Форум вилучено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async patchForum(context, forum) {
            try {
                let resp = await axios.patch(`http://localhost:5000/forum/${forum._id}`, forum);
                context.commit("updateForum", resp.data);
                await context.dispatch("showMessageForTime", { message: "Форум оновлено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async showUpdateForm(context, forum) {
            book = await context.dispatch("getForumById", forum._id);
            context.commit("setFormForum", forum);
            context.commit("updateFormMode");
            context.commit("showForm");
        },
        showAddForm(context) {
            context.commit("clearFormForum");
            context.commit("newFormMode");
            context.commit("showForm");
        }
    }
});
export default store;
