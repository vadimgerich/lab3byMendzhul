import mongoose from 'mongoose';

const forumSchema = new mongoose.Schema({
    theme: {
        type:String,
        required: true
    },
    shortDescribe:String,
    date:Date,
    countOfSpeaks:Number,
});

const Forum = mongoose.model("Forum", forumSchema);

export default Forum;