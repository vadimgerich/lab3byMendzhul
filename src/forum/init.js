import Forum from "./model";

export default {
    async run(req, res) {
        try {
            await Forum.deleteMany({});
            const forumss = [
                {
                    theme: "theme1",
                    shortdescribe: "first theme",
                    date:new Date(20-05-2017),
                    countOfSpeaks:12
                },
                {
                    theme: "theme 2",
                    shortdescribe: "second theme",
                    date:new Date(20-09-1999),
                    countOfSpeaks:16
                },
                {
                    theme: "theme 3",
                    shortdescribe: "third theme",
                    date:new Date(22-08-2017),
                    countOfSpeaks:124
                },
                {
                    theme: "theme 4",
                    shortdescribe: "fourth theme",
                    date:new Date(12-02-2019),
                    countOfSpeaks:11
                },
                {
                    theme: "theme 5",
                    shortdescribe: "fifth theme",
                    date:new Date(20-08-2017),
                    countOfSpeaks:23
                }
            ];

            forums.forEach(async forum => await new Forum(forum).save());
        } catch (error) {
            console.log(error)
        }
    }
}