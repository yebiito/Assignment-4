const express = require('express');
const path = require('path');
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');


app.use(session({
    secret: 'mySecretKey', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));



app.get('/maindj', async (req, res) => {
    try {
        
        const dj = await DJ.findOne({ name: 'DJ FELIBOX' }).populate({
            path: 'playlists',
            populate: { path: 'songs' }
        });

        
        if (!dj || dj.playlists.length === 0) {
            return res.status(404).send('DJ o Playlist no encontrados');
        }

        
        const playlist = dj.playlists[0];
        const songs = playlist.songs.map(song => `${song.title} - ${song.artist}`);

        
        res.render('maindj', {
            title: 'Main DJ Page',
            user: dj.name,
            playlist: {
                name: playlist.name,
                songs: songs,
            },
            currentSong: songs[0], 
        });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).send('Error al obtener datos del servidor');
    }
});


app.get('/timeslot', (req, res) => {
    res.render('timeslot', {
        title: 'Timeslot Selection',
        user: 'DJ FELIBOX',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        times: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
        schedule: {
            Monday: {
                '08:00': 'occupied',
                '09:00': 'selectable',
                '10:00': 'selectable',
                '11:00': 'selectable',
                '12:00': 'occupied',
                '13:00': 'selectable',
                '14:00': 'selectable',
                '15:00': 'selectable',
                '16:00': 'selectable'
            },
            Tuesday: {
                '08:00': 'selectable',
                '09:00': 'occupied',
                '10:00': 'selectable',
                '11:00': 'selectable',
                '12:00': 'selectable',
                '13:00': 'selectable',
                '14:00': 'selectable',
                '15:00': 'selectable',
                '16:00': 'selectable'
            },
            Wednesday: {
                '08:00': 'selectable',
                '09:00': 'selectable',
                '10:00': 'selectable',
                '11:00': 'occupied',
                '12:00': 'selectable',
                '13:00': 'selectable',
                '14:00': 'selectable',
                '15:00': 'occupied',
                '16:00': 'selectable'
            },
            Thursday: {
                '08:00': 'occupied',
                '09:00': 'selectable',
                '10:00': 'selectable',
                '11:00': 'selectable',
                '12:00': 'occupied',
                '13:00': 'selectable',
                '14:00': 'selectable',
                '15:00': 'selectable',
                '16:00': 'occupied'
            },
            Friday: {
                '08:00': 'selectable',
                '09:00': 'occupied',
                '10:00': 'selectable',
                '11:00': 'selectable',
                '12:00': 'occupied',
                '13:00': 'selectable',
                '14:00': 'selectable',
                '15:00': 'selectable',
                '16:00': 'selectable'
            },
            Saturday: {
                '08:00': 'selectable',
                '09:00': 'selectable',
                '10:00': 'occupied',
                '11:00': 'selectable',
                '12:00': 'selectable',
                '13:00': 'selectable',
                '14:00': 'selectable',
                '15:00': 'selectable',
                '16:00': 'selectable'
            },
            Sunday: {
                '08:00': 'selectable',
                '09:00': 'selectable',
                '10:00': 'selectable',
                '11:00': 'occupied',
                '12:00': 'selectable',
                '13:00': 'occupied',
                '14:00': 'selectable',
                '15:00': 'selectable',
                '16:00': 'selectable'
            }
        }
    });
});


app.post('/timeslot/update', async (req, res) => {
    const { day, time, dj } = req.body;

    try {
        
        const timeslot = await Timeslot.findOneAndUpdate(
            { day, time },
            { dj, isOccupied: true },
            { new: true, upsert: true } 
        );

        res.status(200).json({ message: 'Timeslot updated successfully.', timeslot });
    } catch (error) {
        console.error('Error updating timeslot:', error);
        res.status(500).json({ error: 'Failed to update timeslot.' });
    }
});



app.get('/timeslot/data', async (req, res) => {
    try {
        const timeslots = await Timeslot.find();
        res.json(timeslots);
    } catch (error) {
        console.error('Error al obtener los datos de timeslot:', error);
        res.status(500).send('Error al obtener los datos');
    }
});


app.get('/searchsongs', async (req, res) => {
    try {
        
        const genres = [
            'Reggaeton',
            'Pop',
            'Rock',
            'Hip-Hop',
            'Trap',
            'Bachata',
            'Hiperpop',
            'Clásica',
        ];

        
        const playlist = {
            name: 'Reggaeton Classics',
            songs: [
                { title: 'Dákiti', artist: 'Bad Bunny, Jhay Cortez' },
                { title: 'Yo Perreo Sola', artist: 'Bad Bunny' },
                { title: 'Tusa', artist: 'KAROL G, Nicki Minaj' },
                { title: 'Gasolina', artist: 'Daddy Yankee' },
                { title: 'Safaera', artist: 'Bad Bunny, Jowell & Randy, Ñengo Flow' },
                { title: 'Callaíta', artist: 'Bad Bunny, Tainy' },
                { title: 'Te Boté', artist: 'Nio García, Casper, Bad Bunny, Ozuna' },
                { title: 'La Canción', artist: 'J Balvin, Bad Bunny' },
                { title: 'Otro Trago', artist: 'Sech, Darell' },
                { title: 'Felices los 4', artist: 'Maluma' },
                { title: 'Me Rehúso', artist: 'Danny Ocean' },
                { title: 'El Amante', artist: 'Nicky Jam' },
                { title: 'X (Equis)', artist: 'Nicky Jam, J Balvin' },
                { title: 'Con Calma', artist: 'Daddy Yankee, Snow' },
                { title: 'Despacito', artist: 'Luis Fonsi, Daddy Yankee' },
                { title: 'Provenza', artist: 'Karol G' },
                { title: 'Pepas', artist: 'Farruko' },
                { title: 'Baila Baila Baila', artist: 'Ozuna' },
                { title: 'La Jeepeta', artist: 'Nio García, Anuel AA, Myke Towers' },
                { title: 'Ella Quiere Beber', artist: 'Anuel AA, Romeo Santos' },
                { title: 'Mayores', artist: 'Becky G, Bad Bunny' },
                { title: 'Krippy Kush', artist: 'Farruko, Bad Bunny, Rvssian' },
                { title: 'La Modelo', artist: 'Ozuna, Cardi B' },
                { title: 'Reggaetón Lento', artist: 'CNCO' },
                { title: 'Señorita', artist: 'Shawn Mendes, Camila Cabello' },
                { title: 'El Perdón', artist: 'Nicky Jam, Enrique Iglesias' },
                { title: 'Diles', artist: 'Bad Bunny' },
                { title: 'Lo Siento BB:/', artist: 'Tainy, Bad Bunny, Julieta Venegas' },
                { title: 'En La Intimidad', artist: 'Ozuna' },
            ],
        };

        
        const currentSong = `${playlist.songs[0].title} - ${playlist.songs[0].artist}`;

        
        res.render('searchsongs', {
            title: 'Search Songs',
            user: 'DJ FELIBOX',
            genres: genres, 
            playlist: playlist, 
            songImage: '/images/song-placeholder.jpg', 
            currentSong: currentSong, 
        });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).send('Error al cargar la página');
    }
});



app.get('/currentplaylist', async (req, res) => {
    try {
        
        const dj = await DJ.findOne({ name: 'DJ FELIBOX' }).populate({
            path: 'playlists',
            populate: { path: 'songs' },
        });

        if (!dj || dj.playlists.length === 0) {
            return res.status(404).send('DJ o Playlist no encontrados');
        }

        
        const playlist = dj.playlists[0];
        const songs = playlist.songs.map(song => `${song.title} - ${song.artist}`);
        const currentSong = songs[0]; 

        res.render('currentplaylist', {
            title: 'Current Playlist',
            user: dj.name,
            playlist: {
                name: playlist.name,
                genre: playlist.genre,
                totalMinutes: playlist.totalMinutes,
                listeners: playlist.listeners,
                songs: songs,
            },
            currentSong: currentSong, 
            removeImage: '/images/remove-image-placeholder.jpg', 
        });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).send('Error al obtener datos del servidor');
    }
});




app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.redirect('/maindj'); 
        }
        res.render('logout', {
            title: 'Logout'
        }); 
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/djApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
});


const Song = require('./models/song');
const Playlist = require('./models/playlist');
const DJ = require('./models/dj');
const Timeslot = require('./models/timeslot'); 



const seedDatabase = async () => {
    try {
        
        await Song.deleteMany({});
        await Playlist.deleteMany({});
        await DJ.deleteMany({});

        
        const songs = await Song.insertMany([
            { title: 'Dákiti', artist: 'Bad Bunny, Jhay Cortez', genre: 'Reggaeton', duration: 3 },
            { title: 'Yo Perreo Sola', artist: 'Bad Bunny', genre: 'Reggaeton', duration: 3 },
            { title: 'Tusa', artist: 'KAROL G, Nicki Minaj', genre: 'Reggaeton', duration: 4 },
            { title: 'Caramelo', artist: 'Ozuna', genre: 'Reggaeton', duration: 3 },
            { title: 'China', artist: 'Anuel AA, Daddy Yankee, Karol G, J Balvin, Ozuna', genre: 'Reggaeton', duration: 5 },
            { title: 'Despacito', artist: 'Luis Fonsi, Daddy Yankee', genre: 'Reggaeton', duration: 4 },
            { title: 'Te Boté (Remix)', artist: 'Nio García, Casper Mágico, Bad Bunny, Ozuna, Nicky Jam', genre: 'Reggaeton', duration: 7 },
            { title: 'Baila Baila Baila', artist: 'Ozuna', genre: 'Reggaeton', duration: 3 },
            { title: 'La Canción', artist: 'Bad Bunny, J Balvin', genre: 'Reggaeton', duration: 4 },
            { title: 'Callaíta', artist: 'Bad Bunny', genre: 'Reggaeton', duration: 4 },
            { title: 'Si Veo a Tu Mamá', artist: 'Bad Bunny', genre: 'Reggaeton', duration: 3 },
            { title: 'La Jeepeta', artist: 'Nio García, Anuel AA, Myke Towers, Brray, Juanka', genre: 'Reggaeton', duration: 5 },
            { title: 'Me Gusta', artist: 'Shakira, Anuel AA', genre: 'Reggaeton', duration: 3 },
            { title: 'Vete', artist: 'Bad Bunny', genre: 'Reggaeton', duration: 3 },
            { title: 'Otro Trago', artist: 'Sech, Darell', genre: 'Reggaeton', duration: 4 },
            { title: 'Hasta Que Dios Diga', artist: 'Anuel AA, Bad Bunny', genre: 'Reggaeton', duration: 4 },
            { title: 'Safáera', artist: 'Bad Bunny, Jowell & Randy, Ñengo Flow', genre: 'Reggaeton', duration: 5 },
            { title: 'Ella Quiere Beber (Remix)', artist: 'Anuel AA, Romeo Santos', genre: 'Reggaeton', duration: 3 },
            { title: 'Te Soñé de Nuevo', artist: 'Ozuna', genre: 'Reggaeton', duration: 4 },
            { title: 'Un Peso', artist: 'J Balvin, Bad Bunny', genre: 'Reggaeton', duration: 3 },
            { title: 'Agua', artist: 'J Balvin, Tainy', genre: 'Reggaeton', duration: 2 },
            { title: 'Bichota', artist: 'KAROL G', genre: 'Reggaeton', duration: 3 },
            { title: 'AM Remix', artist: 'Nio García, J Balvin, Bad Bunny', genre: 'Reggaeton', duration: 4 },
            { title: 'Se Le Ve', artist: 'Ozuna', genre: 'Reggaeton', duration: 3 },
            { title: 'Volví', artist: 'Aventura, Bad Bunny', genre: 'Reggaeton', duration: 4 },
            { title: 'TQG', artist: 'KAROL G, Shakira', genre: 'Reggaeton', duration: 3 },
            { title: 'El Amante', artist: 'Nicky Jam', genre: 'Reggaeton', duration: 3 },
            { title: 'Efecto', artist: 'Bad Bunny', genre: 'Reggaeton', duration: 3 },
            { title: 'La Modelo', artist: 'Ozuna, Cardi B', genre: 'Reggaeton', duration: 4 }
        ]);
        

        console.log('Canciones insertadas:', songs);

        
        const playlist = new Playlist({
            name: 'Reggaeton Antiguo',
            genre: 'Reggaeton',
            songs: songs.map(song => song._id), 
            totalMinutes: songs.reduce((total, song) => total + song.duration, 0),
            listeners: 1200,
        });
        await playlist.save();

        console.log('Playlist creada:', playlist);

        
        const dj = new DJ({
            name: 'DJ FELIBOX',
            playlists: [playlist._id], 
        });
        await dj.save();

        console.log('DJ creado:', dj);

        console.log('Base de datos inicializada con éxito.');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    }
};

//seedDatabase(); //

