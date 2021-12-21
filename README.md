# Microservice-Notifications-Service
![alt text](https://1.bp.blogspot.com/-z6LMrSwx_XA/XbhhKRAfMZI/AAAAAAAAoFs/CCSm0SMIq-47MjxmjGvnmcZd4DN3GG63QCLcBGAsYHQ/s1600/email-4539382_1280.jpg)

*Microservicio para la Gestión de Notificaciones del Portal Educativo*
---
## Base:  http://3.145.167.71:4000   o  http://ec2-3-145-167-71.us-east-2.compute.amazonaws.com:4000

# Rutas

## Petición GET /usuarios/notifications/:id



### RESPUESTA

[{
     "id":1,
     "title":"Nuevo Curso",
     "description":"Inscribete",
     "id_user":1,"id_sender":2,"id_type":7,
     "create_date":"2021-12-18T00:00:00.000Z",
     "reading_date":null,
     "id_state":1
}]

## Petición DELETE /usuarios/notifications/delete/:id


### Respuesta SEND
"Eliminado Satisfactoriamente"

## Petición POST /usuarios/notifications


Requiere: BODY - RAW - TypeJSON

{
        title:title,
        description:description,
        id_user:id_user,
        id_sender:id_sender,
        id_type:id_type,
}


### Respuesta SEND
mensaje de Confirmación del Envió de la Notificación
{

    mensaje:'La carga se efectuo correctamente'
        
}

## Petición POST /usuarios/crear

Requiere: BODY - RAW - TypeJSON

{
            fullname:fullname,
            email:email,
            id_role:id_role
}


### Respuesta SEND
mensaje:'Usuario registrado correctamente'

## Petición PUT /usuarios/readingNotifications'

Requiere: BODY - RAW - TypeJSON

 {
        id:id
 }


### Respuesta SEND
mensaje:'Estado de la Notificación Actualizado'


Cadena texto :  "Enviado"

## Petición PUT /usuarios/notifications

Requiere: BODY - RAW - TypeJSON


 {
        title: title, 
        description:description, 
        id_user:id_user, 
        id_sender:id_sender, 
        id_type:id_type,
        id_state:id_state
 }
    
 ### Respuesta SEND
 mensaje:'Notificación Actualizada'

## Petición POST /sendNotiToNumber

Requiere: BODY - RAW - TypeJSON

{

        "numero": "+57 311***652*",
        "mensaje": "mensaje de texto al movil",

        
}

### Respuesta SEND
mensaje de Confirmación del Envió del Email


Cadena texto :  "Mensaje Enviado"



---

## Petición POST /sendMailAsesoria

Requiere: BODY - RAW - TypeJSON

{

        "email":"email@gmail.com", 
        "username":"Dcris", 
        "teacher_name":"Milton Vera", 
        "hora":"4:30 PM"

        
}



### Respuesta SEND
mensaje de Confirmación del Envió del Email

Cadena texto :  "Enviado"



---

## Petición POST /sendMailAuditoria

Requiere: BODY - RAW - TypeJSON

{

        "email":"email@gmail.com", 
        "username":"Dcris", 
        "teacher_name":"Milton Vera", 
        "hora":"4:30 PM"

        
}

### Respuesta SEND
mensaje de Confirmación del Envió del Email

Cadena texto :  "Enviado"



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
