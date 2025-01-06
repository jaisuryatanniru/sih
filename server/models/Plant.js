const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: String,
    scientific_name: String,
    medical_use: String,
    availability: [String],
    category: String,
    "Method of Cultivation": {
        Climate: String,
        Soil: String,
        Propagation: String,
        Planting: String,
        Spacing: String,
        Irrigation: String,
        Care: String
    },
    Habitat: {
        Native_Region: String,
        Growth_Regions: String,
    },
    new_url: String,
    image_url: String
}, { collection: 'plantrecords' });


const Plant = mongoose.model('Plant', plantSchema);
module.exports = Plant;
