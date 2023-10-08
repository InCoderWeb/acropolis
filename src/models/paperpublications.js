import mongoose from "mongoose";

const paperPublications = new mongoose.Schema({
    nameOfFaculty: {
        type: String,
        required: [true, "Please Provide Name of Faculty."],
    },
    stream: {
        type: String,
        required: [true, "Please Enter the stream."],
    },
    topic: {
        type: String,
        required: [true, "Please Enter topic."],
    },
    issnNo: {
        type: String,
        required: [true, "Please Enter ISSN no.."],
        unique: true,
    },
    linkD: {
        type: String,
        required: [true, "Please Enter link."],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const paperpublications = mongoose.models['paperpublications'] || mongoose.model('paperpublications', paperPublications)