const jwt = require('jsonwebtoken');
const auhtConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ error: 'O token não foi informado' });

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({ error: 'Token error'});

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token mal formado'});

    jwt.verify(token, auhtConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token invalido'});

        req.userId = decoded.id;

        return next();
    })
};