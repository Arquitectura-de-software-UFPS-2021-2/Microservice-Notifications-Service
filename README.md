# Microservice-Notifications-Service
##Rutas

REQUEST 

POST /verNotificaciones

Requiere: JSON or Array

{
        id_user:id_user
}



RESPONSE

[
    {
        "id": 1,
        "title": "Nuevo Curso",
        "description": "Inscribete",
        "id_user": 1,
        "id_sender": 2,
        "id_type": 7,
        "create_date": "2021-12-18T00:00:00.000Z",
        "reading_date": null,
        "id_state": 1
    },
    {
        "id": 2,
        "title": "Registro exitoso",
        "description": "Gracias por preferirnos, disfruta nuestra app :)",
        "id_user": 1,
        "id_sender": 0,
        "id_type": 2,
        "create_date": "2021-12-18T19:29:23.000Z",
        "reading_date": null,
        "id_state": 2
    }
]

