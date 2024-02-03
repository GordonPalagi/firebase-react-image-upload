import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
// const Contact = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // TODO: Add your emailJS service ID, template ID, and user ID
//         const serviceId = 'YOUR_SERVICE_ID';
//         const templateId = 'YOUR_TEMPLATE_ID';
//         const userId = 'YOUR_USER_ID';

//         emailjs.send(serviceId, templateId, { name, email, message }, userId)
//             .then((response) => {
//                 console.log('Email sent successfully!', response.status, response.text);
//                 // TODO: Add any success message or redirect here
//             })
//             .catch((error) => {
//                 console.error('Error sending email:', error);
//                 // TODO: Add any error message or handling here
//             });

//         // Reset form fields
//         setName('');
//         setEmail('');
//         setMessage('');
//     };

//     return (
//         <div style={{height: "100vh"}}>
//             <h1>Contact the Developer</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="name">Name:</label>
//                 <input
//                     type="text"
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />

//                 <label htmlFor="email">Email:</label>
//                 <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />

//                 <label htmlFor="message">Message:</label>
//                 <textarea
//                     id="message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 ></textarea>

//                 <button type="submit">Send</button>
//             </form>
//         </div>
//     );
// };

// export default Contact;

const Contact = () => {
    const form = useRef();
  
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_o69cpmt', 'template_o5g8mri', form.current, 'VI8K8K3qfpu4R8xej')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
  
    return (
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    );
  };

    export default Contact;
