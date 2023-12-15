const express = require('express');
const fs = require('fs');

const app = express();
const port = 3002;

app.use(express.json());

app.get('/location', (req, res) => {
    // Membaca file JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Terjadi kesalahan saat membaca file');
        }

        // Mengurai data JSON
        const jsonData = JSON.parse(data);

        // Mengirim data kota
        res.json(jsonData);
    });
});

app.get('/location/search', (req, res) => {
    // Membaca file JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Terjadi kesalahan saat membaca file');
        }

        // Mengurai data JSON
        const jsonData = JSON.parse(data);

        // Mendapatkan parameter pencarian dari query string
        const searchTerm = req.query.q;

        if (!searchTerm) {
            return res.status(400).json({ error: 'Query parameter "q" is required for search.' });
        }

        // Melakukan pencarian berdasarkan nama atau kriteria lain sesuai kebutuhan
        const searchData = jsonData.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (searchData.length === 0) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }

        // Mengirim data hasil pencarian
        res.json(searchData);
    });
});

app.get('/location/city=:city', (req, res) => {
    // Membaca file JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Terjadi kesalahan saat membaca file');
        }

        // Mengurai data JSON
        const jsonData = JSON.parse(data);

        // Mencari semua data berdasarkan kota
        const cityData = jsonData.filter(item => item.city.toLowerCase() === req.params.city.toLowerCase());

        if (cityData.length === 0) {
            return res.status(404).send('Data tidak ditemukan');
        }

        // Mengirim data kota
        res.json(cityData);
    });
});

app.get('/location/category=:category', (req, res) => {
    // Membaca file JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Terjadi kesalahan saat membaca file');
        }

        // Mengurai data JSON
        const jsonData = JSON.parse(data);

        // Mencari semua data berdasarkan kota
        const categoryData = jsonData.filter(item => item.category.toLowerCase() === decodeURIComponent(req.params.category));

        if (categoryData.length === 0) {
            return res.status(404).send('Data tidak ditemukan');
        }

        // Mengirim data kota
        res.json(categoryData);
    });
});

app.get('/location/rating=:rating', (req, res) => {
    // Membaca file JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Terjadi kesalahan saat membaca file');
        }

        // Mengurai data JSON
        const jsonData = JSON.parse(data);

        // Mencari semua data berdasarkan kota
        const ratingData = jsonData.filter(item => item.rating == Number(req.params.rating));

        if (ratingData.length === 0) {
            return res.status(404).send('Data tidak ditemukan');
        }

        // Mengirim data kota
        res.json(ratingData);
    });
});

app.get('/location/price=:price', (req, res) => {
    // Membaca file JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Terjadi kesalahan saat membaca file');
        }

        // Mengurai data JSON
        const jsonData = JSON.parse(data);

        // Mencari semua data berdasarkan kota
        const priceData = jsonData.filter(item => item.price == Number(req.params.price));

        if (priceData.length === 0) {
            return res.status(404).send('Data tidak ditemukan');
        }

        // Mengirim data kota
        res.json(priceData);
    });
});

app.get('/location/name=:name', (req, res) => {
    // Membaca file JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Terjadi kesalahan saat membaca file');
        }

        // Mengurai data JSON
        const jsonData = JSON.parse(data);

        // Mencari semua data berdasarkan kota
        const nameData = jsonData.filter(item => item.name.toLowerCase() === decodeURIComponent(req.params.name));

        if (nameData.length === 0) {
            return res.status(404).send('Data tidak ditemukan');
        }

        // Mengirim data kota
        res.json(nameData);
    });
});

app.get('/location/city=:city&rating=:rating', (req, res) => {
    // Membaca file JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Terjadi kesalahan saat membaca file');
        }

        // Mengurai data JSON
        const jsonData = JSON.parse(data);

        // Mencari semua data berdasarkan kota
        const cityDistrictData = jsonData.filter(item => item.city.toLowerCase() === decodeURIComponent(req.params.city) && item.rating == Number(req.params.rating));

        if (cityDistrictData.length === 0) {
            return res.status(404).send('Data tidak ditemukan');
        }

        // Mengirim data kota
        res.json(cityDistrictData);
    });
});

app.get('/location/city=:city&category=:category', (req, res) => {
    // Membaca file JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Terjadi kesalahan saat membaca file');
        }

        // Mengurai data JSON
        const jsonData = JSON.parse(data);

        // Mencari semua data berdasarkan kota
        const cityDistrictData = jsonData.filter(item => item.city.toLowerCase() === decodeURIComponent(req.params.city) && item.category === decodeURIComponent(req.params.category));

        if (cityDistrictData.length === 0) {
            return res.status(404).send('Data tidak ditemukan');
        }

        // Mengirim data kota
        res.json(cityDistrictData);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
