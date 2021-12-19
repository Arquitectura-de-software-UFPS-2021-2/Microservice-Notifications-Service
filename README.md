# Microservice-Notifications-Service
![alt text](https://1.bp.blogspot.com/-z6LMrSwx_XA/XbhhKRAfMZI/AAAAAAAAoFs/CCSm0SMIq-47MjxmjGvnmcZd4DN3GG63QCLcBGAsYHQ/s1600/email-4539382_1280.jpg)

*Microservicio para la Gestión de Notificaciones del Portal Educativo*
---
## Rutas despues de Base:  http://3.145.167.71:4000

### Petición POST /verNotificaciones

Requiere: BODY - RAW - TypeJSON

{

        "id_user":id_user
        
}

```
Response:  JSON de todas las notificaciones recibidas por el Usuario
```
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


### Petición POST /crearNotificacion

Requiere: BODY - RAW - TypeJSON

{

        "title": "Nuevo Taller",
        "description": "Taller de Programacion web",
        "id_user": 1,
        "id_sender": 2,
        "id_type": 1
        
}

```

Response:  mensaje de Confirmación del Envió de la Notificación
```
{

        mensaje:'La carga se efectuo correctamente'
        
}

### Petición POST /sendMailRegistro

Requiere: BODY - RAW - TypeJSON

{

        "email": "email@gmail.com",
        "username": "Name_User",
        "password": "password"  
        
}

```

Response:  mensaje de Confirmación del Envió del Email
```

{

        mensaje:'enviado'

} 


---
## Tecnologías Utilizadas 🛠
  - **_NodeJS_** - *Entorno de ejecución para JavaScript*
  - **_JavaScript_** - *Lenguaje de Programación*
  - **_MySQL_** - *Motor de Base de Datos*
---

## Autores :busts_in_silhouette:
- **Cristian Ricardo Tautiva** - [CristianTautiva](https://github.com/CristianTautiva)
- **Ivonne Diaz** - [ivonnediaz2](https://github.com/ivonnediaz2)
- **Nelson Eduardo Amaya** - [NelsonAmayaCalderon19](https://github.com/NelsonAmayaCalderon19)

 ## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 🗣
* Invita una hamburguesa 🍔 o un café ☕ a alguien de este maravilloso equipo. 
* Da las gracias públicamente 🤪
---
