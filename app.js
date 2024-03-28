const express = require('express');

const app = express();
const PORT = 3000;
const users = [];

app.use(express.json());

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find(user => user.id === parseInt(userId));
    
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    res.json(user);
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

app.post('/users/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    
    if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    
    res.json({ message: 'Login bem-sucedido', user });
});

app.post('/users/logout', (req, res) => {
    res.json({ message: 'Logout bem-sucedido' });
});

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updateUser = req.body;
    users = users.map(user => {
        if (user.id === parseInt(userId)) {
            return { ...user, ...updateUser };
        }
        return user;
    });
    res.json(users.find(user => user.id === parseInt(userId)));
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    users = users.filter(user => user.id !== parseInt(userId));
    res.json({ message: 'Usuário excluído com sucesso' });
});

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});
