const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const Users = require('../config/users-model')
const Tabs = require('../config/tabs-model')
const { authenticate, jwtKey } = require('../auth/authenticate');

module.exports = server => {
  server.get('/', getServer)
  server.get('/tabs', authenticate, getTabs)
  server.post('/tabs', authenticate, createTab)
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.put('/tabs/:id', authenticate, editTab);
  server.delete('/tabs/:id', authenticate, deleteTab);
};

function getServer(req, res) {
  res.send('Server is up and running.')
}

function register(req, res) {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash;
  console.log(user)


  Users.add(user)
    .then(saved => {
      saveUser = { id: saved.id, email: saved.email }
      res.status(201).json(saveUser)
    })
    .catch(error => {
      console.log('error', error)
      res.status(500).json(error)
    })

}

function login(req, res) {
  let { email, password } = req.body

  Users.findBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          id: user.id,
          message: `Welcome back ${user.email}`,
          token,
        })
      } else {
        res.status(401).json({ message: 'Incorrect email or password. Please try again.' })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
}

function createTab(req, res) {
  let tab = req.body;

  Tabs.insert(tab)
    .then(saved => {
      saveTab = { id: saved.id, title: saved.title, url: saved.url, description: saved.description, category: saved.category, users_id: saved.users_id }
      res.status(201).json(saveTab)
    })
    .catch(error => {
      console.log('error', error)
      res.status(500).json(error);
    })
}

function getTabs(req, res) {
  Tabs.getAll()
    .then(tabs => {
      res.status(200).json(tabs)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
}

async function editTab(req, res) {
  try {
    const edited = await Tabs.update(req.params.id, req.body);
    if (edited) {
      const tab = await Tabs.findById(req.params.id);
      res.status(200).json(tab);
    } else {
      res.status(404).json({ message: 'The tab cannot be found' })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error updating the tab'
    })
  }
}

async function deleteTab(req, res) {
  try {
    const count = await Tabs.remove(req.params.id);
    if (count > 0) {
      res.status(204).end()
    } else {
      res.status(404).json({
        message: 'The tab does not exist, perhaps it was already deleted.'
      })
    }
  } catch (error) {
    res.status(500).json({ message: 'We ran into an error removing the tab' })
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, jwtKey, options);
}