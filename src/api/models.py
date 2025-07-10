from flask_sqlalchemy import SQLAlchemy
from datetime import date

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    is_active = db.Column(db.Boolean, nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Users: {self.id} - {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "is_active": self.is_active
        }


class Followers(db.Model):
    __tablename__ = 'followers'
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    following_to = db.relationship('Users', foreign_keys=[following_id],
                                   backref=db.backref('followers_to', lazy='select'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id],
                                  backref=db.backref('following_to', lazy='select'))

    def serialize(self):
        return {
            "id": self.id,
            "following_id": self.following_id,
            "follower_id": self.follower_id
        }


class Posts(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    description = db.Column(db.String(300))
    body = db.Column(db.Text)
    date = db.Column(db.Date, default=date.today)
    image_url = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    user_to = db.relationship('Users', foreign_keys=[user_id],
                              backref=db.backref('posts_to', lazy='select'))

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "body": self.body,
            "date": self.date.isoformat(),
            "image_url": self.image_url,
            "user_id": self.user_id
        }


class Comments(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    user_to = db.relationship('Users', foreign_keys=[user_id],
                              backref=db.backref('comments_to', lazy='select'))
    post_to = db.relationship('Posts', foreign_keys=[post_id],
                              backref=db.backref('comments_to', lazy='select'))

    def serialize(self):
        return {
            "id": self.id,
            "body": self.body,
            "user_id": self.user_id,
            "post_id": self.post_id
        }


class Media(db.Model):
    __tablename__ = 'media'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum('image', 'video', name='media_type'), nullable=False)
    url = db.Column(db.String(200), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    post_to = db.relationship('Posts', foreign_keys=[post_id],
                              backref=db.backref('media_to', lazy='select'))

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "url": self.url,
            "post_id": self.post_id
        }


class Characters(db.Model):
    __tablename__ = 'characters'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    height = db.Column(db.String(20))
    mass = db.Column(db.String(20))
    hair_color = db.Column(db.String(50))
    skin_color = db.Column(db.String(50))
    eye_color = db.Column(db.String(50))
    birth_year = db.Column(db.String(20))
    gender = db.Column(db.String(20))

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "height": self.height,
            "mass": self.mass,
            "hair_color": self.hair_color,
            "skin_color": self.skin_color,
            "eye_color": self.eye_color,
            "birth_year": self.birth_year,
            "gender": self.gender
        }


class CharacterFavorites(db.Model):
    __tablename__ = 'character_favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))

    user_to = db.relationship('Users', foreign_keys=[user_id],
                              backref=db.backref('character_favs', lazy='select'))
    character_to = db.relationship('Characters', foreign_keys=[character_id],
                                   backref=db.backref('favorited_by', lazy='select'))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "character_id": self.character_id
        }


class Planets(db.Model):
    __tablename__ = 'planets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    diameter = db.Column(db.String(20))
    rotation_period = db.Column(db.String(20))
    orbital_period = db.Column(db.String(20))
    gravity = db.Column(db.String(50))
    population = db.Column(db.String(50))
    climate = db.Column(db.String(50))
    terrain = db.Column(db.String(50))

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "diameter": self.diameter,
            "rotation_period": self.rotation_period,
            "orbital_period": self.orbital_period,
            "gravity": self.gravity,
            "population": self.population,
            "climate": self.climate,
            "terrain": self.terrain
        }


class PlanetFavorites(db.Model):
    __tablename__ = 'planet_favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'))

    user_to = db.relationship('Users', foreign_keys=[user_id],
                              backref=db.backref('planet_favs', lazy='select'))
    planet_to = db.relationship('Planets', foreign_keys=[planet_id],
                                backref=db.backref('favorited_by', lazy='select'))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "planet_id": self.planet_id
        }