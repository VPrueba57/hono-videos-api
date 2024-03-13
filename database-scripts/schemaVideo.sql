CREATE TABLE IF NOT EXISTS Video (
    VideoId INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT, url TEXT, 
    Description TEXT, 
    Duration INTEGER, 
    ReleaseDate DATE, 
    Studio TEXT, 
    Image TEXT
);

CREATE TABLE IF NOT EXISTS Videos_Actores (
    VideoId INTEGER,
    ActorId INTEGER,
    PRIMARY KEY (VideoId, ActorId),
    FOREIGN KEY (VideoId) REFERENCES Video(VideoId) ON DELETE CASCADE,
    FOREIGN KEY (ActorId) REFERENCES Actor(ActorId) ON DELETE CASCADE
);