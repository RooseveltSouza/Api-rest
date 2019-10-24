const mongoose = require('../../database/index');

const ProjectSchema = new mongoose.Schema({
    titulo: {
        type: String,
        require: true,
    },
    descricao: {
        type: String,
        require: true,
    },
    // imagem: {
    //     type: Buffer,    
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;