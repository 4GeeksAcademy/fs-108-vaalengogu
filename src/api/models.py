from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(),unique=False, nullable=False)
    last_name = db.Column(db.String(),unique=False, nullable=False)

    def _repr_(self):
        return f'<Users {self.email}>'

    def serialize(self):
        return {"id": self.id,
                "email": self.email,
                "is_active": self.is_active,
                "first_name": self.first_name,
                "last_name": self.last_name}


class Posts(db.Model):
    _tablename_ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Colum(db.String)
    body = db.Column(db.String)
    date = db.Column(db.Date, nullable=False)
    image_url = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship(
        'Users', back_populates="posts_to", lazy='select')
    
    def _repr_(self):
        return f'<Posts {self.id}>'

    def serialize(self):
        return {"id": self.id,
                "title": self.title,
                "description": self.description,
                "body": self.body,
                "date": self.date,
                "image_url": self.image_url,
                "user_to": self.user_to}


class Medias(db.Model):
    _tablename_ = 'medias'
    id = db.Column(db.Integer, primary_key=True)
    medias_type = db.Column(db.Enum('image', 'video', 'audio', name='medias_type'), nullable=False)
    image_url = db.Column(db.String)
    post_id = db.Column(db.Integer, db.foringKey('users.id'))
    post_to = db.relationship('Users', back_populates="medias_to", lazy='select')

    def _repr_(self):
        return f'<Medias {self.id}>'

    def serialize(self):
        return{"id": self.id,
               "medias type": self.medias_type,
               "image_url": self.image_url,
               "post_to": self.post_to}

class Comments(db.Model):
    _tablename_ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    body= db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', back_populates="comments_to", lazy='select')
    post_to = db.relationship('Users', back_populates="codmments_to", lazy='select')

    def _repr_(self):
        return f'<Comments {self.id}>'

    def serialize(self):
        return{"id": self.id,
               "body": self.body,
               "user_to": self.user_to,
               "post_to": self.post_to}

class Followers(db.Model):
    _tablename_ = 'followers'
    id = db.Colum(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKeey('users.id'))
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', back_populates="followers_to", lazy='select')
    followwer_to = db.relationship('Users', back_populates="followers_to", lazy='select')

    def _repr_(self):
        return f'<Followers {self.id}>'

    def serialize(self):
        return{
            "id": self.id,
            "following_id": self.following_id,
            "follower_id": self.follower_id,
            "following_to": self.following_to,
            "follower_to": self.follower_to}

class CharacterFavourites(db.Model):
    _tablename_ = 'characters_favorites'
    id = db.Column(db.Integer, primary_Key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    character_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_to = db.relationship('Users', back_populates="characters_favories_to", lazy='select')
    character_to = db.relationship('Users', back_populates="characters_favories_to", lazy='select')

    def _repr_(self):
        return f'<CharacterFavourites {self.id}>'

    def serialize(self):
        return{"id":self.id,
               "user_id": self.user_id,
               "character_id": self.character_id,
               "user_to": self.user_to,
               "character_to": self.character_to}

class PlanetsFavourites(db.Model):
    _tablename_ = 'planets_favorites'
    id = db.Column(db.Integer, primary_Key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    planet_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_to = db.relationship('Users', back_populates="planets_favories_to", lazy='select')
    planet_to = db.relationship('Users', back_populates="planets_favories_to", lazy='select')

    def _repr_(self):
        return f'PlanetsFavourites {self.id}>'

    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "planet_id": self.planet_id,
            "user_to": self.user_to,
            "planet_to": self.planet_to}

class Characters(db.Model):
    _tablename_ = 'charcters'
    id = db.Column(db.Integer, primary_Key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    height = db.Column(db.String, nullable=False)
    mass = db.Column(db.String, nullable=False)
    hair_color = db.Column(db.String, nullable=False)
    skin_color = db.Column(db.String, nullable=False)
    eye_color = db.Column(db.String, nullable=False)
    birth_year = db.Column(db.String, nullable=False)
    gender = db.Column(db.String, nullable=False)

    def _repr_(self):
        return f'<Characters {self.id}>'

    def serialize(self):
        return{"id": self.id,
               "name": self.name,
               "height": self.height,
               "mass": self.mass,
               "hair_color": self.hair_color,
               "skin_color": self.skin_color,
               "eye_color": self.eye_color,
               "birth_year": self.birth_year,
               "gender": self.gender}

class Planets(db.Model):
    _tablename = 'planets'
    id = db.Column(db.Integer, primary_Key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    diameter = db.Column(db.String, nullable=False)
    rotation_period = db.Column(db.String, nullable=False)
    orbital_period = db.Column(db.String, nullable=False)
    gravity = db.Column(db.String, nullable=False)
    population = db.Column(db.String, nullable=False)
    climate = db.Column(db.String, nullable=False)
    terrain = db.Column(db.String, nullable=False)
 

    def _repr_(self):
        return f'<Planets {self.id}>'

    def serialize(self):
        return{"id": self.id,
               "name": self.name,
               "diameter": self.diameter,
               "rotation_period": self.rotation_period,
               "orbital_period": self.orbital_period,
               "gravity": self.gravity,
               "popultion": self.population,
               "climate": self.climate,
               "terrain": self.terrain                         }