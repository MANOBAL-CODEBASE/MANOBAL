const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    question: {
        type: String,
        required: true,
        trim: true
    },
    trait: {
        type: String,
        required: true,
        enum: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism']
    },
});

module.exports = mongoose.model('Question', questionSchema);