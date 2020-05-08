import Forum from "./model"

const forumControler = {
    //отримати всі
    async get: function (req,res) {
        try {
            const list = await Forum.find(makeQueryObject(req.query));
            response.send(list);
        }
            catch(error){
            response.status(500).send(error);
        }
    },
    async getByCountOfSpeaks(req,res){
        try {
            const list = await Forum.find(makeQueryObject(req.params.countOfSpeaks));
            response.send(list);
        }
            catch(error){
            response.status(500).send(error);
        }

        function makeQueryObject(query){
            let result = {};        
            if (query.data){
                result.data = {"$lte": (query.countOfSpeaks)};
            }   
            return result; 
        }
    }, 
    async post (req, res) {
        try {
            const forum = new Forum(req.body);
            await forum.save();
            res.send(forum);
    
            } catch (error) {
            res.status(500).send(error);
        }
    },
    async delete (req, res) {
        try {
            const forum = await Forum.findByIdAndDelete(req.params.id);
            if (!forum)
                res.status(404).send("Not found");
            res.send(lot);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default forumControler;