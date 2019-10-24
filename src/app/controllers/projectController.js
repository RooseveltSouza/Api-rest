const express = require("express");
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/project');

const router = express.Router();

router.use(authMiddleware);

// Listagem de projetos
router.get('/', async (req, res)=>{
    try{
        const projects = await Project.find().populate('user');

        return res.send({ projects });
    }catch(err){
        return res.status(400).send({ error: 'Erro ao listar os projetos'});
    }
});

// Pesquisa por id
router.get('/:projectId', async (req, res) => {
    try{
        const project = await Project.findById(req.params.projectId).populate('user');

        return res.send({ project });
    }catch(err){
        return res.status(400).send({ error: 'Erro ao carregar projeto'});
    }
});

//Rota de criação
router.post('/', async (req, res) => {
    try{
        const project = await Project.create({...req.body, user: req.userId });

        return res.send({ project});
    }catch(err){
        return res.status(400).send({ error: 'Erro ao criar um projeto'});
    }
});

router.put('/:projectId', async (req, res) => {
    try{
        const project = await Project.findByIdAndUpdate(req.params.projectId, {new: true});

        await project.save();

        return res.send({ project });
    }catch(err){
        return res.status(400).send({ error: 'Erro ao atualizar projeto'});
    }
});

// Deletar pelo ID
router.delete('/:projectId', async (req, res) => {
    try{
        await Project.findByIdAndRemove(req.params.projectId);

        return res.send('Projeto deletado com sucesso');
    }catch(err){
        return res.status(400).send({ error: 'Erro ao deletar projeto'});
    }
});
module.exports = app => app.use('/projects', router);