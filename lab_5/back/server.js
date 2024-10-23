
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; 

app.use(express.json());
app.use(cors()); 

// База котів 
let cats = [
  { id: 1, name: 'Whiskers', age: 3, color: 'brown' },
  { id: 2, name: 'Fluffy', age: 5, color: 'white' }
];

// генерація  ID
const generateId = () => {
  return cats.length > 0 ? Math.max(...cats.map(cat => cat.id)) + 1 : 1;
};

// **GET**: Отримати всіх котів
app.get('/cats', (req, res) => {
  res.json(cats);
});

// **GET**: Отримати кота за ID
app.get('/cats/:id', (req, res) => {
  const cat = cats.find(c => c.id === parseInt(req.params.id));
  if (!cat) {
    return res.status(404).json({ message: 'Cat not found' });
  }
  res.json(cat);
});

// **POST**: Додати нового кота
app.post('/cats', (req, res) => {
  const { name, age, color } = req.body;
  if (!name || !age || !color) {
    return res.status(400).json({ message: 'Please provide name, age, and color.' });
  }

  // Перевірка на дублікатів
  const existingCat = cats.find(cat => cat.name.toLowerCase() === name.toLowerCase());
  if (existingCat) {
    return res.status(409).json({ message: 'A cat with this name already exists.' });
  }

  const newCat = { id: generateId(), name, age, color };
  cats.push(newCat);
  res.status(201).json(newCat);
});

// **PUT**: Оновити кота за ID
app.put('/cats/:id', (req, res) => {
  const { name, age, color } = req.body;
  const cat = cats.find(c => c.id === parseInt(req.params.id));

  if (!cat) {
    return res.status(404).json({ message: 'Cat not found' });
  }

  if (!name || !age || !color) {
    return res.status(400).json({ message: 'Please provide name, age, and color.' });
  }

  cat.name = name;
  cat.age = age;
  cat.color = color;

  res.json(cat);
});

// **DELETE**: Видалити кота за ID
app.delete('/cats/:id', (req, res) => {
  const catIndex = cats.findIndex(c => c.id === parseInt(req.params.id));
  if (catIndex === -1) {
    return res.status(404).json({ message: 'Cat not found' });
  }

  cats.splice(catIndex, 1);
  res.json({ message: 'Cat deleted successfully' });
});

// пуск
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
