const mongoose = require('mongoose');
require('dotenv').config();

async function checkGaps() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const Gap = mongoose.connection.db.collection('gapanalyses');
        const latestGap = await Gap.find().sort({ _id: -1 }).limit(1).toArray();
        console.log(JSON.stringify(latestGap, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
checkGaps();
