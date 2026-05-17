const mongoose = require('mongoose');
require('dotenv').config();

async function checkUserAssessments() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const Assessment = mongoose.connection.db.collection('assessments');
        const results = await Assessment.find({ userName: /Vishesh/i }).toArray();
        console.log(JSON.stringify(results, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
checkUserAssessments();
