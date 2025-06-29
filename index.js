const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// ✅ 提供静态资源（HTML、JS、CSS）
app.use(express.static(path.join(__dirname, 'public')));

// ✅ 返回首页 index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ 内存数据模拟
let items = [];
let idCounter = 1;

// ✅ 获取所有
app.get('/items', (req, res) => {
  res.json(items);
});

// ✅ 获取单个
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// ✅ 新增
app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const newItem = { id: idCounter++, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// ✅ 更新
app.put('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Item not found' });

  item.name = name || item.name;
  res.json(item);
});

// ✅ 删除
app.delete('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  const deleted = items.splice(index, 1);
  res.json(deleted[0]);
});

// ✅ 启动服务
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
