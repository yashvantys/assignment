const fs = require('fs');
const csv = require('csv-parser');
const { pool } = require('./dbConfig')

module.export = async function importGeoJSONData() {
    const filePath = 'path_to_geojson_file.json'
    try {
        const client = await pool.connect();

        // Read the GeoJSON file
        const geoJSONData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Insert data into the geographical_data table
        await client.query('INSERT INTO geographical_data (state_id, geo_data) VALUES ($1, $2)', [1, geoJSONData]);

        client.release();
        console.log('GeoJSON data imported successfully');
    } catch (error) {
        console.error('Error importing GeoJSON data:', error);
    }
}

module.export = async function importCSVData() {
    try {
        const client = await pool.connect();
        const filePath = 'path_to_csv_file.csv'
        // Read the CSV file using 'csv-parser' library
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (row) => {
                // Insert each row into the population_data table
                const query = 'INSERT INTO population_data (state_id, name, age) VALUES ($1, $2, $3)';
                const values = [1, row.name, row.age];
                await client.query(query, values);
            })
            .on('end', () => {
                client.release();
                console.log('CSV data imported successfully');
            });
    } catch (error) {
        console.error('Error importing CSV data:', error);
    }
}
