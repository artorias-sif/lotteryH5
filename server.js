const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('.'));

// 获取奖品记录
app.get('/api/prizes', async (req, res) => {
    try {
        const data = await fs.readFile('prize_records.json', 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: '读取奖品记录失败' });
    }
});

// 更新奖品记录
app.put('/api/prizes', async (req, res) => {
    try {
        await fs.writeFile('prize_records.json', JSON.stringify(req.body, null, 4));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: '更新奖品记录失败' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
}); 