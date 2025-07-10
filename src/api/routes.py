"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Followers, Posts, Comments, Media, Characters, CharacterFavorites, Planets, PlanetFavorites


api = Blueprint('api', __name__)
CORS(api) # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {"message": "Hello! I'm a message that came from the backend"}
    return response_body, 200

@api.route('/users', methods=['GET', 'POST'])
def users():
    response_body = {}

    if request.method == 'GET':
        response_body['message'] = 'Lista de usuarios'
        rows = db.session.execute(db.select(Users)).scalars()
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200

    if request.method == 'POST':
        data = request.json
        print(data)
        user = Users()
        user.email = data.get('email', 'user@mail.com')
        user.password = data.get('password', '1')
        user.is_active = True
        user.is_admin = data.get('is_admin', False)
        user.first_name = data.get('first_name', None)
        user.last_name = data.get('last_name', None)
        db.session.add(user)
        db.session.commit()
        response_body['results'] = user.serialize()
        response_body['message'] = 'Usuario creado.'
        return response_body, 201

@api.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def user(id):
    response_body = {}
    user = db.session.execute(db.select(Users).where(Users.id == id)).scalar()

    if not user:
        response_body['message'] = f'Usuario {id} no encontrado'
        response_body['results'] = {}
        return response_body, 404

    if request.method == 'GET':
        response_body['message'] = f'Usuario {id} encontrado'
        response_body['results'] = user.serialize()
        return response_body, 200

    if request.method == 'PUT':
        data = request.json
        user.email = data.get('email', user.email)
        user.password = data.get('password', user.password)
        user.is_admin = data.get('is_admin', user.is_admin)
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        db.session.commit()
        response_body['message'] = f'Usuario {id} modificado'
        response_body['results'] = user.serialize()
        return response_body, 200

    if request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        response_body['message'] = f'Usuario {id} eliminado'
        response_body['results'] = {}
        return response_body, 200
    
@api.route('/followers', methods=['POST'])
def follower():
    follower_id = 1
    data = request.json
    following_id = data.get('following_id', None)
    response_body = {}

    if not following_id:
        response_body['message'] = 'ID del usuario a seguir no proporcionado'
        response_body['results'] = None
        return response_body, 400

    existing_follow = db.session.execute(
        db.select(Followers).where(
            (Followers.follower_id == follower_id) & 
            (Followers.following_id == following_id)
        )
    ).scalar()

    if existing_follow:
        response_body['message'] = f'El usuario {follower_id} ya es seguidor del usuario {following_id}'
        response_body['results'] = None
        return response_body, 403

    follow = Followers()
    follow.follower_id = follower_id
    follow.following_id = following_id
    db.session.add(follow)
    db.session.commit()

    response_body['message'] = f'El usuario {follower_id} ahora sigue al usuario {following_id}'
    response_body['results'] = {}
    return response_body, 200

@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}

    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        response_body['results'] = [row.serialize() for row in rows]
        response_body['message'] = 'Lista de posts'
        return response_body, 200

    if request.method == 'POST':
        data = request.json
        post = Posts()
        post.title = data.get('title')
        post.description = data.get('description')
        post.body = data.get('body')
        post.image_url = data.get('image_url')
        post.user_id = data.get('user_id')
        db.session.add(post)
        db.session.commit()
        response_body['results'] = post.serialize()
        response_body['message'] = 'Post creado'
        return response_body, 201

@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def post(id):
    response_body = {}
    post = db.session.get(Posts, id)

    if not post:
        response_body['message'] = 'Post no encontrado'
        response_body['results'] = {}
        return response_body, 404

    if request.method == 'GET':
        response_body['message'] = 'Post encontrado'
        response_body['results'] = post.serialize()
        return response_body, 200

    if request.method == 'PUT':
        data = request.json
        post.title = data.get('title', post.title)
        post.description = data.get('description', post.description)
        post.body = data.get('body', post.body)
        post.image_url = data.get('image_url', post.image_url)
        db.session.commit()
        response_body['message'] = 'Post actualizado'
        response_body['results'] = post.serialize()
        return response_body, 200

    if request.method == 'DELETE':
        db.session.delete(post)
        db.session.commit()
        response_body['message'] = 'Post eliminado'
        response_body['results'] = {}
        return response_body, 200

@api.route('/comments', methods=['GET', 'POST'])
def comments():
    response_body = {}

    if request.method == 'GET':
        rows = db.session.execute(db.select(Comments)).scalars()
        response_body['results'] = [row.serialize() for row in rows]
        response_body['message'] = 'Lista de comentarios'
        return response_body, 200

    if request.method == 'POST':
        data = request.json
        comment = Comments()
        comment.body = data.get('body')
        comment.user_id = data.get('user_id')
        comment.post_id = data.get('post_id')
        db.session.add(comment)
        db.session.commit()
        response_body['results'] = comment.serialize()
        response_body['message'] = 'Comentario creado'
        return response_body, 201

@api.route('/comments/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def comment(id):
    response_body = {}
    comment = db.session.get(Comments, id)

    if not comment:
        response_body['message'] = 'Comentario no encontrado'
        response_body['results'] = {}
        return response_body, 404

    if request.method == 'GET':
        response_body['message'] = 'Comentario encontrado'
        response_body['results'] = comment.serialize()
        return response_body, 200

    if request.method == 'PUT':
        data = request.json
        comment.body = data.get('body', comment.body)
        db.session.commit()
        response_body['message'] = 'Comentario actualizado'
        response_body['results'] = comment.serialize()
        return response_body, 200

    if request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()
        response_body['message'] = 'Comentario eliminado'
        response_body['results'] = {}
        return response_body, 200

@api.route('/characters', methods=['GET', 'POST'])
def characters():
    response_body = {}

    if request.method == 'GET':
        rows = db.session.execute(db.select(Characters)).scalars()
        response_body['results'] = [row.serialize() for row in rows]
        response_body['message'] = 'Lista de personajes'
        return response_body, 200

    if request.method == 'POST':
        data = request.json
        char = Characters()
        char.name = data.get('name')
        char.height = data.get('height')
        char.mass = data.get('mass')
        char.hair_color = data.get('hair_color')
        char.skin_color = data.get('skin_color')
        char.eye_color = data.get('eye_color')
        char.birth_year = data.get('birth_year')
        char.gender = data.get('gender')
        db.session.add(char)
        db.session.commit()
        response_body['results'] = char.serialize()
        response_body['message'] = 'Personaje creado'
        return response_body, 201

@api.route('/characters/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def character(id):
    response_body = {}
    char = db.session.get(Characters, id)

    if not char:
        response_body['message'] = 'Personaje no encontrado'
        response_body['results'] = {}
        return response_body, 404

    if request.method == 'GET':
        response_body['message'] = 'Personaje encontrado'
        response_body['results'] = char.serialize()
        return response_body, 200

    if request.method == 'PUT':
        data = request.json
        char.name = data.get('name', char.name)
        char.height = data.get('height', char.height)
        char.mass = data.get('mass', char.mass)
        char.hair_color = data.get('hair_color', char.hair_color)
        char.skin_color = data.get('skin_color', char.skin_color)
        char.eye_color = data.get('eye_color', char.eye_color)
        char.birth_year = data.get('birth_year', char.birth_year)
        char.gender = data.get('gender', char.gender)
        db.session.commit()
        response_body['message'] = 'Personaje actualizado'
        response_body['results'] = char.serialize()
        return response_body, 200

    if request.method == 'DELETE':
        db.session.delete(char)
        db.session.commit()
        response_body['message'] = 'Personaje eliminado'
        response_body['results'] = {}
        return response_body, 200

@api.route('/planets', methods=['GET', 'POST'])
def planets():
    response_body = {}

    if request.method == 'GET':
        rows = db.session.execute(db.select(Planets)).scalars()
        response_body['results'] = [row.serialize() for row in rows]
        response_body['message'] = 'Lista de planetas'
        return response_body, 200

    if request.method == 'POST':
        data = request.json
        planet = Planets()
        planet.name = data.get('name')
        planet.diameter = data.get('diameter')
        planet.rotation_period = data.get('rotation_period')
        planet.orbital_period = data.get('orbital_period')
        planet.gravity = data.get('gravity')
        planet.population = data.get('population')
        planet.climate = data.get('climate')
        planet.terrain = data.get('terrain')
        db.session.add(planet)
        db.session.commit()
        response_body['results'] = planet.serialize()
        response_body['message'] = 'Planeta creado'
        return response_body, 201

@api.route('/planets/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def planet(id):
    response_body = {}
    planet = db.session.get(Planets, id)

    if not planet:
        response_body['message'] = 'Planeta no encontrado'
        response_body['results'] = {}
        return response_body, 404

    if request.method == 'GET':
        response_body['message'] = 'Planeta encontrado'
        response_body['results'] = planet.serialize()
        return response_body, 200

    if request.method == 'PUT':
        data = request.json
        planet.name = data.get('name', planet.name)
        planet.diameter = data.get('diameter', planet.diameter)
        planet.rotation_period = data.get('rotation_period', planet.rotation_period)
        planet.orbital_period = data.get('orbital_period', planet.orbital_period)
        planet.gravity = data.get('gravity', planet.gravity)
        planet.population = data.get('population', planet.population)
        planet.climate = data.get('climate', planet.climate)
        planet.terrain = data.get('terrain', planet.terrain)
        db.session.commit()
        response_body['message'] = 'Planeta actualizado'
        response_body['results'] = planet.serialize()
        return response_body, 200

    if request.method == 'DELETE':
        db.session.delete(planet)
        db.session.commit()
        response_body['message'] = 'Planeta eliminado'
        response_body['results'] = {}
        return response_body, 200

@api.route('/favorites/characters', methods=['POST'])
def add_character_fav():
    data = request.json
    fav = CharacterFavorites()
    fav.user_id = data.get('user_id')
    fav.character_id = data.get('character_id')
    db.session.add(fav)
    db.session.commit()
    return {"message": "Favorito de personaje agregado", "results": fav.serialize()}, 201

@api.route('/favorites/characters/<int:id>', methods=['DELETE'])
def delete_character_fav(id):
    fav = db.session.get(CharacterFavorites, id)
    if not fav:
        return {"message": "Favorito no encontrado"}, 404
    db.session.delete(fav)
    db.session.commit()
    return {"message": "Favorito eliminado"}, 200


@api.route('/favorites/planets', methods=['POST'])
def add_planet_fav():
    data = request.json
    fav = PlanetFavorites()
    fav.user_id = data.get('user_id')
    fav.planet_id = data.get('planet_id')
    db.session.add(fav)
    db.session.commit()
    return {"message": "Favorito de planeta agregado", "results": fav.serialize()}, 201

@api.route('/favorites/planets/<int:id>', methods=['DELETE'])
def delete_planet_fav(id):
    fav = db.session.get(PlanetFavorites, id)
    if not fav:
        return {"message": "Favorito no encontrado"}, 404
    db.session.delete(fav)
    db.session.commit()
    return {"message": "Favorito eliminado"}, 200
