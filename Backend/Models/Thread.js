import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    role:{
        type: String,
        enum: ['user', 'assistant'],
        required: true
    },
    content :{
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}); 


const ThreadSchema = new mongoose.Schema({
     threadId: {
        type: String,
        required: true
     },
     owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
     },

     title:{
        type: String,
        default: "New Chat"
     },

     messages: [MessageSchema],

     createdAt: {
        type: Date,
        default: Date.now
        },

    updatedAt: {
        type: Date,
        default: Date.now
        }

});

ThreadSchema.index({ owner: 1, threadId: 1 }, { unique: true });

export default mongoose.model('Thread', ThreadSchema);

