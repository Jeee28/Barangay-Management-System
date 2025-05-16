const express = require('express');
const ExcelJS = require('exceljs');
const router = express.Router();

// Example route: GET /download-children-report
router.get('/download-children-report', async (req, res) => {
  try {
    // Fetch records from your MongoDB (replace this with your DB query)
    const records = await YourModel.find(); // Replace YourModel with your Mongoose model

    // Map data
    const data = records.map(record => ({
      "Child Name": record.childName,
      "Birth Date": record.birthDate,
      "Address": record.address,
      "Contact No.": record.contact,
      "Gender": record.gender,
      "Weight (kg)": record.weight,
      "Height (cm)": record.height,
      "Age": record.age,
      "Parent Name": record.parentName,
      "Parent Address": record.parentAddress,
      "Parent Contact": record.parentContact,
      "BMI": record.bmi,
      "Status": record.status
    }));

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Children Report');

    // Set headers dynamically from data keys
    worksheet.columns = Object.keys(data[0]).map(key => ({
      header: key,
      key: key,
      width: 20
    }));

    // Add rows
    data.forEach(row => worksheet.addRow(row));

    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=children_report.xlsx'
    );

    // Send the workbook
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Failed to generate report:', err);
    res.status(500).send('Failed to generate report');
  }
});

module.exports = router;
