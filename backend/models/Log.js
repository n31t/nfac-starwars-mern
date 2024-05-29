import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema(
    {
    message: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    },
{
    timestamps: true
});

export default mongoose.model('Log', LogSchema);