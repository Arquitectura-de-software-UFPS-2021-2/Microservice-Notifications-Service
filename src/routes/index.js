
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const push = require('push.js');
const database = require('../database');
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

//Ver Notificaciones de un Usuario
router.post('/verNotificaciones', function(req, res) {
    const  { id_user }  = req.body;
    const notifUsuario = {
        id_user:id
    }
    database.query('SELECT * FROM notification where ?',[notifUsuario], function(error,filas){
        if (error) {            
            console.log('error en el listado');
            return;
        } 
        if (filas.length>0) {
            res.send(filas);
        } else {
           
        }     
    });
});

router.get('/usuarios/notifications/:id', async (req, res) => {
    const  id  = req.params.id;
    const notifUsuario = {
        id_user:id
    }
    try {
       let data= await  database.query('SELECT * FROM notification where ?',[notifUsuario]);
       res.send(data);
    } catch (error) {
        res.send({mensaje:'Error al solicitar notificaciones'});
    }
  

})

router.get('/',(req,res) =>{
 res.render("index");
})

//Enviar una Notificación a un Usuario determinado
router.post('/crearNotificacion', async (req, res,) =>{
const { title, description, id_user, id_sender, id_type, id_state} = req.body;
const newNotif = {
    title:title,
    description:description,
    id_user:id_user,
    id_sender:id_sender,
    id_type:id_type
};

  database.query('insert into notification set ?,create_date=CURDATE(), id_state=1',[newNotif], function (error,resultado){
    if (error){
        console.log(error);
        return;
    }
}); 
res.send({mensaje:'La carga se efectuo correctamente'});

});



router.post('/usuarios/notifications', async (req, res,) =>{
    const { title, description, id_user, id_sender, id_type, id_state} = req.body;
    const newNotif = {
        title:title,
        description:description,
        id_user:id_user,
        id_sender:id_sender,
        id_type:id_type
    };
    
      database.query('insert into notification set ?,create_date=CURDATE(), id_state=1',[newNotif], function (error,resultado){
        if (error){
            console.log(error);
            return;
        }
    }); 
    res.send({mensaje:'La carga se efectuo correctamente'});
    
    });


router.post('/crearUser', async (req, res,) =>{
    const { fullname, email, id_role } = req.body;
    const newUser = {
        fullname:fullname,
        email:email,
        id_role:id_role
    };
      database.query('insert into user set ?',[newUser], function (error,resultado){
        if (error){
            console.log(error);
            return;
        }
    }); 
    res.send({mensaje:'La carga se efectuo correctamente'});
    
    });


    router.post('/usuarios/crear', async (req, res,) =>{
        const { fullname, email, id_role } = req.body;
        const newUser = {
            fullname:fullname,
            email:email,
            id_role:id_role
        };
          database.query('insert into user set ?',[newUser], function (error,resultado){
            if (error){
                console.log(error);
                return;
            }
        }); 
        res.send({mensaje:'La carga se efectuo correctamente'});
        
        });

//Marcar como leida una Notificacion
router.put('/notificacionLeida', async (req, res,) =>{
    const { id } = req.body; 
    const NotifLeida = {
        id:id
    }; 
    const state ={
        id_state:2
    }
    database.query('UPDATE notification SET ?,reading_date=CURDATE() WHERE ?',[state,NotifLeida], function(error,filas){
        if (error) {            
            console.log('error en la consulta');
            console.log(error);
            return;
        } 
});
res.send({mensaje:'Estado de la Notificación Actualizado'});
});


router.put('/usuarios/readingNotifications', async (req, res,) =>{
    const { id } = req.body; 
    const NotifLeida = {
        id:id
    }; 
    const state ={
        id_state:2
    }
    database.query('UPDATE notification SET ?,reading_date=CURDATE() WHERE ?',[state,NotifLeida], function(error,filas){
        if (error) {            
            console.log('error en la consulta');
            console.log(error);
            return;
        } 
});
res.send({mensaje:'Estado de la Notificación Actualizado'});
});

router.put('/usuarios/notifications', async (req, res,) =>{
    const { id, title, description, id_user, id_sender, id_type, id_state  } = req.body; 
    const NotifLeida = {
        title: title, 
        description:description, 
        id_user:id_user, 
        id_sender:id_sender, 
        id_type:id_type,
        id_state:id_state
    }; 
    
    database.query('UPDATE notification SET ? WHERE ?',[NotifLeida,id], function(error,filas){
        if (error) {            
            console.log('error en la consulta');
            console.log(error);
            return;
        } 
});
res.send({mensaje:'Notificación Actualizada'});
});



router.post('/sendMailRegistro', async (req, res) => {
    const { email, username, password} = req.body
    const contentHTML = `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0;border-collapse:collapse;margin:0 auto"> 
    <tbody> 
    <tr> 
    <td valign="top" style="word-break:break-word;border-collapse:collapse"> 
     
    <table width="640" style="margin:0 auto;border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0"> 
    <tbody>
    <tr> 
    <td bgcolor="#FFFFFF" style="border-collapse:collapse;background-color:#ffffff"> 
    <table style="margin:0 auto;width:600px" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody>
    <tr> 
    <td height="15" style="line-height:1px;font-size:1px">&nbsp; </td> 
    </tr> 
    <tr> 
    <td width="120" valign="top" align="left"> 
    <div id="m_6655362251918668093Logo-bp">
    <img alt="Logo" border="0" src="https://res.cloudinary.com/sqa/image/upload/v1639229396/port-2_esdndl.jpg" width="696" class="CToWUd">
    </div> </td> 
    </tr> 
     
    <tr> 
    <td height="15" style="line-height:1px;font-size:1px">&nbsp; </td> 
    </tr> 
    </tbody>
    </table> </td> 
    </tr> 
    </tbody>
    </table> 
     
    <table width="640" align="center" id="m_6655362251918668093boxing" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;border-collapse:collapse;margin:0 auto;min-width:640px"> 
    <tbody>
    <tr> 
    <td id="m_6655362251918668093module-wrapper" style="word-break:break-word;border-collapse:collapse">
    <table id="m_6655362251918668093Title87cdb47d-f4ec-4953-b0e5-82337e3effee" style="border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"> 
    <tbody> 
    <tr> 
    <td bgcolor="#FFFFFF" style="background-color:#ffffff"> 
    <table style="width:600px;margin:0 auto;text-align:center;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="20">&nbsp;</td> 
    </tr> 
    <tr> 
    <td style="font-size:20px;color:#000000;font-family:Arial,Helvetica,sans-serif;line-height:26px" valign="top"> 
    <div id="m_6655362251918668093titlesec-main-title87cdb47d-f4ec-4953-b0e5-82337e3effee"> 
    <div style="text-align:left"> 
    <span style="color:#0c163b"><b>Gracias por registrarte con nosotros!</b></span> 
    </div> 
    </div> </td> 
    </tr> 

    <tr> 
    <td style="line-height:1px;font-size:1px" height="0">&nbsp;</td> 
    </tr> 
    <tr> 
    <td style="font-size:14px;color:#000000;font-family:Arial,Helvetica,sans-serif;line-height:20px" valign="top"> 
    <div id="m_6655362251918668093titlesec-main-sub-title87cdb47d-f4ec-4953-b0e5-82337e3effee"></div> </td> 
    </tr> 
     
    <tr> 
    <td style="line-height:1px;font-size:1px" height="0">&nbsp;</td> 
    </tr> 
    </tbody> 
    </table> </td> 
    </tr> 
    </tbody> 
    </table>
    <table id="m_6655362251918668093FreeText" style="border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"> 
    <tbody> 
    <tr> 
    <td bgcolor="#FFFFFF" style="background-color:#ffffff"> 
    <table style="width:600px;margin:0 auto;text-align:center;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="20">&nbsp;</td> 
    </tr> 
    <tr> 
    <td style="font-size:14px;color:#000000;font-family:Arial,Helvetica,sans-serif;line-height:20px;text-align:left" valign="top"> 
    <div id="m_6655362251918668093FreeTextContent"> 
    <div>
     Los datos para iniciar sesion son los siguientes: 
    <br> 
    </div> 
    <ul style="color:#000000;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;text-align:left;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;text-decoration-style:initial;text-decoration-color:initial"> 
    <li><strong>Usuario: ${username}</strong><br></li> 
    <li><strong>Contraseña: ${password}</strong></li> 
    
    </ul> 
    <span style="color:#000000;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;text-align:left;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:#ffffff;text-decoration-style:initial;text-decoration-color:initial;display:inline!important;float:none">Gracias por preferirnos!</span> 
    <br> 
    </div> </td> 
    </tr> 
     
    <tr> 
    <td style="line-height:1px;font-size:1px" height="20">&nbsp;</td> 
    </tr> 
    </tbody> 
    </table> </td> 
    </tr> 
    </tbody> 
    </table>
    <table id="m_6655362251918668093Button" style="border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"> 
    <tbody> 
    <tr> 
    <td bgcolor="#FFFFFF" style="background-color:#ffffff"> 
    <table style="width:600px;margin:0 auto;text-align:center;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="10">&nbsp;</td> 
    </tr> 
     
    <tr> 
    <td valign="top"> 
    <div id="m_6655362251918668093banner-button1"> 
    <table style="margin:0 auto" width="auto" align="center" border="0" cellpadding="0" cellspacing="0"> 
    <tbody> 
    <tr> 
    <td style="background-color:#ff5050;border:1px solid #ff5050;border-radius:20px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:22px;text-align:center;vertical-align:middle;color:#ffffff;display:block;padding:9px 40px 8px" valign="middle"> <a style="text-decoration:none;color:#ffffff!important;outline:none" href="https://email.cloudinary.com/Mzk2LUxSQi01MjQAAAGBGobA7ALw15RnVf8ZbcstHAM_ldBlT8awWoWZLsP3knljmaiSi9qEcxSl_-fx7Wfvbph5oz4=" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://email.cloudinary.com/Mzk2LUxSQi01MjQAAAGBGobA7ALw15RnVf8ZbcstHAM_ldBlT8awWoWZLsP3knljmaiSi9qEcxSl_-fx7Wfvbph5oz4%3D&amp;source=gmail&amp;ust=1639085166505000&amp;usg=AOvVaw0TWdLzxW3wIrfooUD7cjlC"> <span style="color:#ffffff">VISITANOS</span> </a> </td> 
    </tr> 
    </tbody> 
    </table> 
    </div> </td> 
    </tr> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="30">&nbsp;</td> 
    </tr> 
    </tbody> 
    </table> </td> 
    </tr> 
    </tbody> 
    </table></td> 
    </tr> 
    </tbody>
    </table> </td> 
    </tr> 
    </tbody> 
    </table>`;
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    try {

        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "cristianricardotl@ufps.edu.co",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: "Portal <cristianricardotl@ufps.edu.co>",
            to: email,
            subject: "Registro exitoso",
            html: contentHTML
        };

        await transporter.sendMail(mailOptions);
        res.send("enviado");

    } catch (err) {
        console.log("error " + err);
        res.send("error al enviar");
    }

})




router.post('/sendMailLogin', async (req, res) => {
    const { email, username} = req.body
    const contentHTML = `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0;border-collapse:collapse;margin:0 auto"> 
    <tbody> 
    <tr> 
    <td valign="top" style="word-break:break-word;border-collapse:collapse"> 
     
    <table width="640" style="margin:0 auto;border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0"> 
    <tbody>
    <tr> 
    <td bgcolor="#FFFFFF" style="border-collapse:collapse;background-color:#ffffff"> 
    <table style="margin:0 auto;width:600px" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody>
    <tr> 
    <td height="15" style="line-height:1px;font-size:1px">&nbsp; </td> 
    </tr> 
    <tr> 
    <td width="120" valign="top" align="left"> 
    <div id="m_6655362251918668093Logo-bp">
    <img alt="Logo" border="0" src="https://res.cloudinary.com/sqa/image/upload/v1639229396/port-2_esdndl.jpg" width="696" class="CToWUd">
    </div> </td> 
    </tr> 
     
    <tr> 
    <td height="15" style="line-height:1px;font-size:1px">&nbsp; </td> 
    </tr> 
    </tbody>
    </table> </td> 
    </tr> 
    </tbody>
    </table> 
     
    <table width="640" align="center" id="m_6655362251918668093boxing" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;border-collapse:collapse;margin:0 auto;min-width:640px"> 
    <tbody>
    <tr> 
    <td id="m_6655362251918668093module-wrapper" style="word-break:break-word;border-collapse:collapse">
    <table id="m_6655362251918668093Title87cdb47d-f4ec-4953-b0e5-82337e3effee" style="border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"> 
    <tbody> 
    <tr> 
    <td bgcolor="#FFFFFF" style="background-color:#ffffff"> 
    <table style="width:600px;margin:0 auto;text-align:center;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="20">&nbsp;</td> 
    </tr> 
    <tr> 
    <td style="font-size:20px;color:#000000;font-family:Arial,Helvetica,sans-serif;line-height:26px" valign="top"> 
    <div id="m_6655362251918668093titlesec-main-title87cdb47d-f4ec-4953-b0e5-82337e3effee"> 
    <div style="text-align:left"> 
    <span style="color:#0c163b"><b>Iniciaste sesion en Portal!</b></span> 
    </div> 
    </div> </td> 
    </tr> 

    <tr> 
    <td style="line-height:1px;font-size:1px" height="0">&nbsp;</td> 
    </tr> 
    <tr> 
    <td style="font-size:14px;color:#000000;font-family:Arial,Helvetica,sans-serif;line-height:20px" valign="top"> 
    <div id="m_6655362251918668093titlesec-main-sub-title87cdb47d-f4ec-4953-b0e5-82337e3effee"></div> </td> 
    </tr> 
     
    <tr> 
    <td style="line-height:1px;font-size:1px" height="0">&nbsp;</td> 
    </tr> 
    </tbody> 
    </table> </td> 
    </tr> 
    </tbody> 
    </table>
    <table id="m_6655362251918668093FreeText" style="border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"> 
    <tbody> 
    <tr> 
    <td bgcolor="#FFFFFF" style="background-color:#ffffff"> 
    <table style="width:600px;margin:0 auto;text-align:center;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="20">&nbsp;</td> 
    </tr> 
    <tr> 
    <td style="font-size:14px;color:#000000;font-family:Arial,Helvetica,sans-serif;line-height:20px;text-align:left" valign="top"> 
    <div id="m_6655362251918668093FreeTextContent"> 
    <div>
     Solo pasamos por aqui a informarte que inicisate sesion ${username}, Gracias por usar nuestra plataforma :)
    <br> 
    </div> 

    <span style="color:#000000;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;text-align:left;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:#ffffff;text-decoration-style:initial;text-decoration-color:initial;display:inline!important;float:none">Gracias por preferirnos!</span> 
    <br> 
    </div> </td> 
    </tr> 
     
    <tr> 
    <td style="line-height:1px;font-size:1px" height="20">&nbsp;</td> 
    </tr> 
    </tbody> 
    </table> </td> 
    </tr> 
    </tbody> 
    </table>
    <table id="m_6655362251918668093Button" style="border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"> 
    <tbody> 
    <tr> 
    <td bgcolor="#FFFFFF" style="background-color:#ffffff"> 
    <table style="width:600px;margin:0 auto;text-align:center;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="10">&nbsp;</td> 
    </tr> 
     
    <tr> 
    <td valign="top"> 
    <div id="m_6655362251918668093banner-button1"> 
    <table style="margin:0 auto" width="auto" align="center" border="0" cellpadding="0" cellspacing="0"> 
    <tbody> 
    <tr> 
    <td style="background-color:#ff5050;border:1px solid #ff5050;border-radius:20px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:22px;text-align:center;vertical-align:middle;color:#ffffff;display:block;padding:9px 40px 8px" valign="middle"> <a style="text-decoration:none;color:#ffffff!important;outline:none" href="https://email.cloudinary.com/Mzk2LUxSQi01MjQAAAGBGobA7ALw15RnVf8ZbcstHAM_ldBlT8awWoWZLsP3knljmaiSi9qEcxSl_-fx7Wfvbph5oz4=" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://email.cloudinary.com/Mzk2LUxSQi01MjQAAAGBGobA7ALw15RnVf8ZbcstHAM_ldBlT8awWoWZLsP3knljmaiSi9qEcxSl_-fx7Wfvbph5oz4%3D&amp;source=gmail&amp;ust=1639085166505000&amp;usg=AOvVaw0TWdLzxW3wIrfooUD7cjlC"> <span style="color:#ffffff">VISITANOS</span> </a> </td> 
    </tr> 
    </tbody> 
    </table> 
    </div> </td> 
    </tr> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="30">&nbsp;</td> 
    </tr> 
    </tbody> 
    </table> </td> 
    </tr> 
    </tbody> 
    </table></td> 
    </tr> 
    </tbody>
    </table> </td> 
    </tr> 
    </tbody> 
    </table>`;
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    try {

        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "cristianricardotl@ufps.edu.co",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: "Portal <cristianricardotl@ufps.edu.co>",
            to: email,
            subject: "Inicio de Sesion",
            html: contentHTML
        };

        await transporter.sendMail(mailOptions);
        res.send("Enviado");

    } catch (err) {
        console.log("error " + err);
        res.send("Error al enviar");
    }

})



router.post('/sendNotiToNumber', async (req, res) => {
    const { numero, mensaje} = req.body
    try {
        client.messages.create({
            to: numero,
            from: '+18509887933',
            body: mensaje
       }).then(message=>console.log("Mensaje Enviado: "+message.sid));
       res.send("Mensaje Enviado");

    } catch (error) {
        res.send("Error al enviar texto al numero "+numero+" -> "+error.message);
    }

})



router.post('/sendMailAsesoria', async (req, res) => {
    const { email, username, teacher_name, hora} = req.body
    const contentHTML = `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0;border-collapse:collapse;margin:0 auto"> 
    <tbody> 
    <tr> 
    <td valign="top" style="word-break:break-word;border-collapse:collapse"> 
     
    <table width="640" style="margin:0 auto;border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0"> 
    <tbody>
    <tr> 
    <td bgcolor="#FFFFFF" style="border-collapse:collapse;background-color:#ffffff"> 
    <table style="margin:0 auto;width:600px" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody>
    <tr> 
    <td height="15" style="line-height:1px;font-size:1px">&nbsp; </td> 
    </tr> 
    <tr> 
    <td width="120" valign="top" align="left"> 
    <div id="m_6655362251918668093Logo-bp">
    <img alt="Logo" border="0" src="https://res.cloudinary.com/sqa/image/upload/v1639229396/port-2_esdndl.jpg" width="696" class="CToWUd">
    </div> </td> 
    </tr> 
     
    <tr> 
    <td height="15" style="line-height:1px;font-size:1px">&nbsp; </td> 
    </tr> 
    </tbody>
    </table> </td> 
    </tr> 
    </tbody>
    </table> 
     
    <table width="640" align="center" id="m_6655362251918668093boxing" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;border-collapse:collapse;margin:0 auto;min-width:640px"> 
    <tbody>
    <tr> 
    <td id="m_6655362251918668093module-wrapper" style="word-break:break-word;border-collapse:collapse">
    <table id="m_6655362251918668093Title87cdb47d-f4ec-4953-b0e5-82337e3effee" style="border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"> 
    <tbody> 
    <tr> 
    <td bgcolor="#FFFFFF" style="background-color:#ffffff"> 
    <table style="width:600px;margin:0 auto;text-align:center;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="20">&nbsp;</td> 
    </tr> 
    <tr> 
    <td style="font-size:20px;color:#000000;font-family:Arial,Helvetica,sans-serif;line-height:26px" valign="top"> 
    <div id="m_6655362251918668093titlesec-main-title87cdb47d-f4ec-4953-b0e5-82337e3effee"> 
    <div style="text-align:left"> 
    <span style="color:#0c163b"><b>Que no se te olvide!</b></span> 
    </div> 
    </div> </td> 
    </tr> 

    <tr> 
    <td style="line-height:1px;font-size:1px" height="0">&nbsp;</td> 
    </tr> 
    <tr> 
    <td style="font-size:14px;color:#000000;font-family:Arial,Helvetica,sans-serif;line-height:20px" valign="top"> 
    <div id="m_6655362251918668093titlesec-main-sub-title87cdb47d-f4ec-4953-b0e5-82337e3effee"></div> </td> 
    </tr> 
     
    <tr> 
    <td style="line-height:1px;font-size:1px" height="0">&nbsp;</td> 
    </tr> 
    </tbody> 
    </table> </td> 
    </tr> 
    </tbody> 
    </table>
    <table id="m_6655362251918668093FreeText" style="border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"> 
    <tbody> 
    <tr> 
    <td bgcolor="#FFFFFF" style="background-color:#ffffff"> 
    <table style="width:600px;margin:0 auto;text-align:center;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="20">&nbsp;</td> 
    </tr> 
    <tr> 
    <td style="font-size:14px;color:#000000;font-family:Arial,Helvetica,sans-serif;line-height:20px;text-align:left" valign="top"> 
    <div id="m_6655362251918668093FreeTextContent"> 
    <div>
     ${username}, No olvides tu asesoria con ${teacher_name} a las ${teacher_name}
    <br> 
    </div> 

    <span style="color:#000000;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;text-align:left;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:#ffffff;text-decoration-style:initial;text-decoration-color:initial;display:inline!important;float:none">Gracias por preferirnos!</span> 
    <br> 
    </div> </td> 
    </tr> 
     
    <tr> 
    <td style="line-height:1px;font-size:1px" height="20">&nbsp;</td> 
    </tr> 
    </tbody> 
    </table> </td> 
    </tr> 
    </tbody> 
    </table>
    <table id="m_6655362251918668093Button" style="border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"> 
    <tbody> 
    <tr> 
    <td bgcolor="#FFFFFF" style="background-color:#ffffff"> 
    <table style="width:600px;margin:0 auto;text-align:center;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="10">&nbsp;</td> 
    </tr> 
     
    <tr> 
    <td valign="top"> 
    <div id="m_6655362251918668093banner-button1"> 
    <table style="margin:0 auto" width="auto" align="center" border="0" cellpadding="0" cellspacing="0"> 
    <tbody> 
    <tr> 
    <td style="background-color:#ff5050;border:1px solid #ff5050;border-radius:20px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:22px;text-align:center;vertical-align:middle;color:#ffffff;display:block;padding:9px 40px 8px" valign="middle"> <a style="text-decoration:none;color:#ffffff!important;outline:none" href="https://email.cloudinary.com/Mzk2LUxSQi01MjQAAAGBGobA7ALw15RnVf8ZbcstHAM_ldBlT8awWoWZLsP3knljmaiSi9qEcxSl_-fx7Wfvbph5oz4=" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://email.cloudinary.com/Mzk2LUxSQi01MjQAAAGBGobA7ALw15RnVf8ZbcstHAM_ldBlT8awWoWZLsP3knljmaiSi9qEcxSl_-fx7Wfvbph5oz4%3D&amp;source=gmail&amp;ust=1639085166505000&amp;usg=AOvVaw0TWdLzxW3wIrfooUD7cjlC"> <span style="color:#ffffff">VISITANOS</span> </a> </td> 
    </tr> 
    </tbody> 
    </table> 
    </div> </td> 
    </tr> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="30">&nbsp;</td> 
    </tr> 
    </tbody> 
    </table> </td> 
    </tr> 
    </tbody> 
    </table></td> 
    </tr> 
    </tbody>
    </table> </td> 
    </tr> 
    </tbody> 
    </table>`;
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    try {

        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "cristianricardotl@ufps.edu.co",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: "Portal <cristianricardotl@ufps.edu.co>",
            to: email,
            subject: "Asesoria",
            html: contentHTML
        };

        await transporter.sendMail(mailOptions);
        res.send("Enviado");

    } catch (err) {
        console.log("error " + err);
        res.send("Error al enviar");
    }

})


router.post('/sendMailAuditoria', async (req, res) => {
    const { email, username, teacher_name, hora} = req.body
    const contentHTML = `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0;border-collapse:collapse;margin:0 auto"> 
    <tbody> 
    <tr> 
    <td valign="top" style="word-break:break-word;border-collapse:collapse"> 
     
    <table width="640" style="margin:0 auto;border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0"> 
    <tbody>
    <tr> 
    <td bgcolor="#FFFFFF" style="border-collapse:collapse;background-color:#ffffff"> 
    <table style="margin:0 auto;width:600px" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody>
    <tr> 
    <td height="15" style="line-height:1px;font-size:1px">&nbsp; </td> 
    </tr> 
    <tr> 
    <td width="120" valign="top" align="left"> 
    <div id="m_6655362251918668093Logo-bp">
    <img alt="Logo" border="0" src="https://res.cloudinary.com/sqa/image/upload/v1639229396/port-2_esdndl.jpg" width="696" class="CToWUd">
    </div> </td> 
    </tr> 
     
    <tr> 
    <td height="15" style="line-height:1px;font-size:1px">&nbsp; </td> 
    </tr> 
    </tbody>
    </table> </td> 
    </tr> 
    </tbody>
    </table> 
     
    <table width="640" align="center" id="m_6655362251918668093boxing" border="0" cellpadding="0" cellspacing="0" style="border-spacing:0;border-collapse:collapse;margin:0 auto;min-width:640px"> 
    <tbody>
    <tr> 
    <td id="m_6655362251918668093module-wrapper" style="word-break:break-word;border-collapse:collapse">
    <table id="m_6655362251918668093Title87cdb47d-f4ec-4953-b0e5-82337e3effee" style="border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"> 
    <tbody> 
    <tr> 
    <td bgcolor="#FFFFFF" style="background-color:#ffffff"> 
    <table style="width:600px;margin:0 auto;text-align:center;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="20">&nbsp;</td> 
    </tr> 
    <tr> 
    <td style="font-size:20px;color:#000000;font-family:Arial,Helvetica,sans-serif;line-height:26px" valign="top"> 
    <div id="m_6655362251918668093titlesec-main-title87cdb47d-f4ec-4953-b0e5-82337e3effee"> 
    <div style="text-align:left"> 
    <span style="color:#0c163b"><b>Auditoria programada!</b></span> 
    </div> 
    </div> </td> 
    </tr> 

    <tr> 
    <td style="line-height:1px;font-size:1px" height="0">&nbsp;</td> 
    </tr> 
    <tr> 
    <td style="font-size:14px;color:#000000;font-family:Arial,Helvetica,sans-serif;line-height:20px" valign="top"> 
    <div id="m_6655362251918668093titlesec-main-sub-title87cdb47d-f4ec-4953-b0e5-82337e3effee"></div> </td> 
    </tr> 
     
    <tr> 
    <td style="line-height:1px;font-size:1px" height="0">&nbsp;</td> 
    </tr> 
    </tbody> 
    </table> </td> 
    </tr> 
    </tbody> 
    </table>
    <table id="m_6655362251918668093FreeText" style="border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"> 
    <tbody> 
    <tr> 
    <td bgcolor="#FFFFFF" style="background-color:#ffffff"> 
    <table style="width:600px;margin:0 auto;text-align:center;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="20">&nbsp;</td> 
    </tr> 
    <tr> 
    <td style="font-size:14px;color:#000000;font-family:Arial,Helvetica,sans-serif;line-height:20px;text-align:left" valign="top"> 
    <div id="m_6655362251918668093FreeTextContent"> 
    <div>
     ${username}, No olvides la auditoria con ${teacher_name} a las ${teacher_name}
    <br> 
    </div> 

    <span style="color:#000000;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;text-align:left;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:#ffffff;text-decoration-style:initial;text-decoration-color:initial;display:inline!important;float:none">Gracias por preferirnos!</span> 
    <br> 
    </div> </td> 
    </tr> 
     
    <tr> 
    <td style="line-height:1px;font-size:1px" height="20">&nbsp;</td> 
    </tr> 
    </tbody> 
    </table> </td> 
    </tr> 
    </tbody> 
    </table>
    <table id="m_6655362251918668093Button" style="border-spacing:0;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"> 
    <tbody> 
    <tr> 
    <td bgcolor="#FFFFFF" style="background-color:#ffffff"> 
    <table style="width:600px;margin:0 auto;text-align:center;border-collapse:collapse" align="center" border="0" cellpadding="0" cellspacing="0" width="600"> 
     
    <tbody> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="10">&nbsp;</td> 
    </tr> 
     
    <tr> 
    <td valign="top"> 
    <div id="m_6655362251918668093banner-button1"> 
    <table style="margin:0 auto" width="auto" align="center" border="0" cellpadding="0" cellspacing="0"> 
    <tbody> 
    <tr> 
    <td style="background-color:#ff5050;border:1px solid #ff5050;border-radius:20px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:22px;text-align:center;vertical-align:middle;color:#ffffff;display:block;padding:9px 40px 8px" valign="middle"> <a style="text-decoration:none;color:#ffffff!important;outline:none" href="https://email.cloudinary.com/Mzk2LUxSQi01MjQAAAGBGobA7ALw15RnVf8ZbcstHAM_ldBlT8awWoWZLsP3knljmaiSi9qEcxSl_-fx7Wfvbph5oz4=" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://email.cloudinary.com/Mzk2LUxSQi01MjQAAAGBGobA7ALw15RnVf8ZbcstHAM_ldBlT8awWoWZLsP3knljmaiSi9qEcxSl_-fx7Wfvbph5oz4%3D&amp;source=gmail&amp;ust=1639085166505000&amp;usg=AOvVaw0TWdLzxW3wIrfooUD7cjlC"> <span style="color:#ffffff">VISITANOS</span> </a> </td> 
    </tr> 
    </tbody> 
    </table> 
    </div> </td> 
    </tr> 
    <tr> 
    <td style="line-height:1px;font-size:1px" height="30">&nbsp;</td> 
    </tr> 
    </tbody> 
    </table> </td> 
    </tr> 
    </tbody> 
    </table></td> 
    </tr> 
    </tbody>
    </table> </td> 
    </tr> 
    </tbody> 
    </table>`;
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    try {

        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "cristianricardotl@ufps.edu.co",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: "Portal <cristianricardotl@ufps.edu.co>",
            to: email,
            subject: "Auditoria",
            html: contentHTML
        };

        await transporter.sendMail(mailOptions);
        res.send("Enviado");

    } catch (err) {
        console.log("error " + err);
        res.send("Error al enviar");
    }

})



module.exports = router;
