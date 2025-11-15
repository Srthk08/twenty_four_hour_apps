const c={service:"emailjs",enabled:!1,config:{serviceId:"YOUR_EMAILJS_SERVICE_ID",templateId:"YOUR_EMAILJS_TEMPLATE_ID",userId:"YOUR_EMAILJS_USER_ID"}},o=c,d={supportTicketUpdate:{subject:"Update on Your Support Ticket #{{ticketNumber}}",body:`
Hello {{customerName}},

Your support ticket has been updated by our support team.

Ticket Details:
- Ticket Number: {{ticketNumber}}
- Subject: {{subject}}
- Status: {{status}}
- Admin Reply: {{adminReply}}

Reply Details:
{{adminReply}}

This response was sent on {{replyDate}} by {{adminName}}.

If you have any further questions, please don't hesitate to contact us.

Best regards,
DevExpress Support Team

---
This is an automated notification. Please do not reply to this email.
    `.trim()}};async function f(r,s,t){try{if(!o.enabled)return console.log("Email service not enabled, skipping email send"),!1;switch(o.service){case"emailjs":return await m(r,s,t);case"formspree":return await u(r,s,t);case"custom":return await p(r,s,t);default:return console.error("Unknown email service:",o.service),!1}}catch(e){return console.error("Error sending email:",e),!1}}async function m(r,s,t){try{if(typeof window>"u"||!window.emailjs)return console.error("EmailJS not available"),!1;const e=window.emailjs,{serviceId:a,templateId:i,userId:n}=o.config,l={to_email:r,subject:s,message:t};return await e.send(a,i,l,n),console.log("Email sent successfully via EmailJS"),!0}catch(e){return console.error("Error sending email via EmailJS:",e),!1}}async function u(r,s,t){try{const{endpoint:e}=o.config,a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r,subject:s,message:t})});return a.ok?(console.log("Email sent successfully via Formspree"),!0):(console.error("Formspree error:",a.statusText),!1)}catch(e){return console.error("Error sending email via Formspree:",e),!1}}async function p(r,s,t){try{const{apiUrl:e,apiKey:a}=o.config,i=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({to:r,subject:s,body:t})});return i.ok?(console.log("Email sent successfully via custom service"),!0):(console.error("Custom email service error:",i.statusText),!1)}catch(e){return console.error("Error sending email via custom service:",e),!1}}export{o as activeEmailConfig,d as emailTemplates,c as emailjsConfig,f as sendEmail};
