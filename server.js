const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;

app.use(express.json());
app.get('/recommendations/cities/rating', (req, res) => {
    // Membaca file JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Terjadi kesalahan saat membaca file');
        }

        // Mengurai data JSON
        const jsonData = JSON.parse(data);

        // List of cities for recommendations
        const cities = ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi'];

        // Mencari data rekomendasi untuk setiap kota dengan rating antara 4.4 dan 5
        const recommendationsByCityAndRating = cities.map(city => {
            // Mencari tempat dengan rating antara 4.4 dan 5 untuk setiap kota
            const rating4_5InCity = jsonData
                .filter(item => item.city.toLowerCase() === city.toLowerCase() && item.rating >= 4.4 && item.rating <= 5)
                .map(({ id, name, rating }) => ({ id, name, rating }));

            return {
                city,
                recommendations: rating4_5InCity
            };
        });

        // Mengirim data rekomendasi
        res.json(recommendationsByCityAndRating);
    });
});

// Route for Jakarta recommendations
app.get('/recommendations/cities/Jakarta', (req, res) => {
    getRecommendationsByCity(req, res, 'Jakarta');
});

// Route for Bogor recommendations
app.get('/recommendations/cities/Bogor', (req, res) => {
    getRecommendationsByCity(req, res, 'Bogor');
});

// Route for Depok recommendations
app.get('/recommendations/cities/Depok', (req, res) => {
    getRecommendationsByCity(req, res, 'Depok');
});

// Route for Tangerang recommendations
app.get('/recommendations/cities/Tangerang', (req, res) => {
    getRecommendationsByCity(req, res, 'Tangerang');
});

// Route for Bekasi recommendations
app.get('/recommendations/cities/Bekasi', (req, res) => {
    getRecommendationsByCity(req, res, 'Bekasi');
});

// Function to get recommendations by city
function getRecommendationsByCity(req, res, city) {
    // Membaca file JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Terjadi kesalahan saat membaca file');
        }

        // Mengurai data JSON
        const jsonData = JSON.parse(data);

        // Mencari data rekomendasi untuk kota tertentu dengan rating antara 4.4 dan 5
        const recommendationsForCity = jsonData
            .filter(item => item.city.toLowerCase() === city.toLowerCase() && item.rating >= 4.4 && item.rating <= 5)
            .map(({ id, name, rating }) => ({ id, name, rating }));

        // Mengirim data rekomendasi
        res.json({
            city,
            recommendations: recommendationsForCity
        });
    });
}
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
