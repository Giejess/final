 document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Gather form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Send data to the backend
            fetch('/api/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    alert('Message sent successfully!');
                    this.reset(); // Reset the form
                } else {
                    alert('Error sending message. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
        });


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// Endpoint to handle incoming messages
app.post('/api/send-message', (req, res) => {
    const { name, email, message } = req.body;

    // Here you can handle the message, e.g., save it to a database or send an email
    console.log(`Received message from ${name} (${email}): ${message}`);

    // For demonstration, we'll just send a success response
    res.status(200).send({ success: true, message: 'Message received successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
