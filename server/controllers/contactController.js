import contact from "../models/contactForm.js";



const contactForm = async (req, res) => {
    try { 
        const { name, email, website, message } = req.body;
        const newContact = new contact({ name, email, website, message });
        await newContact.save(); 
        res.status(201).json({ message: 'Contact saved successfully!' });
    } catch (error) {
        console.error("Error saving contact:", error); // Log the error
        res.status(500).json({ message: 'Error saving contact', error: error.message });
    }
};


export {contactForm}