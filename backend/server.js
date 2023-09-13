const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Middleware
// app.use(express.static(''));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', // Ganti dengan kata sandi MySQL Anda
    database: 'mydatabase', // Sesuaikan dengan nama database Anda
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi database gagal: ' + err.message);
    } else {
        console.log('Terhubung ke database MySQL');
    }
});

// Penanganan khusus untuk rute index.html
app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');

});

// Endpoint untuk menyimpan data
app.post('/simpanData', (req, res) => {
    const { nopesanan, tanggal, nmsupplier, nmproduct, total } = req.body; // Mendapatkan data dari permintaan POST

    if (nopesanan && tanggal && nmsupplier && nmproduct && total) {
        // Semua variabel memiliki nilai yang valid
        const sql = 'INSERT INTO pesanan (nopesanan, tanggal, nm_supplier, nm_product, total) VALUES (?, ?, ?, ?, ?)';
        const values = [nopesanan, tanggal, nmsupplier, nmproduct, total];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Gagal menyimpan data: ' + err.message);
                res.json({ success: false, message: 'Gagal menyimpan data' });
            } else {
                console.log('Data berhasil disimpan');
                res.json({ success: true, message: 'Data berhasil disimpan' });
            }
        });
    } else {
        // Salah satu atau lebih variabel tidak memiliki nilai yang valid
        // Tangani kasus ini sesuai kebutuhan Anda, misalnya dengan memberikan pesan kesalahan atau tindakan lain.
        console.error('Gagal menyimpan data: Salah satu atau lebih variabel tidak memiliki nilai yang valid');
        res.json({ success: false, message: 'Salah satu atau lebih variabel tidak memiliki nilai yang valid' });
    }
});

app.get('/data', (req, res) => {
    // Lakukan query untuk mengambil data dari tabel pesanan di database
    const sql = 'SELECT * FROM pesanan';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Gagal mengambil data: ' + err.message);
            res.status(500).json({ success: false, message: 'Gagal mengambil data' });
        } else {
            console.log('Data berhasil diambil');
            res.status(200).json({ success: true, data: result }); // Mengirim data sebagai respons
        }
    });
});

const port = 3000; // Port server Anda dapat disesuaikan
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
