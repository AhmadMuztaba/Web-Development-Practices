const sgMail=require('@sendgrid/mail');
const key='key';
sgMail.setApiKey(key);

const welcomeEmail=(email,name)=>{
    sgMail.send({
        from:'email',
        to:email,
        subject:'test',
        text:`Hi ${name} welcome`,
    });
}
const deleteEmail=(email,name)=>{
    sgMail.send({
        from:'email',
        to:email,
        subject:'test',
        text:`Hi ${name} sayonara `,
    });
}
module.exports={welcomeEmail,
                deleteEmail}
