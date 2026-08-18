/**
 * Google Apps Script (Code.gs) for Modliq Quote Demo Lead Capture
 * 
 * Target Google Sheet: https://docs.google.com/spreadsheets/d/1W_J4pPZ-CMvqxOYhghOOPufunVYUu-WRKaXPOy5LMEk/edit#gid=0
 * Target Script Project: https://script.google.com/u/0/home/projects/19Y3AWI5Q_REJPbmOW41i73996kz0LOeFBCIEgsQD8n9KBgN4henxdZLn/edit
 * 
 * INSTRUCTIONS TO DEPLOY:
 * 1. Open https://script.google.com/u/0/home/projects/19Y3AWI5Q_REJPbmOW41i73996kz0LOeFBCIEgsQD8n9KBgN4henxdZLn/edit
 * 2. Paste this entire file into Code.gs
 * 3. Click "Deploy" -> "New deployment"
 * 4. Choose type: "Web app"
 * 5. Description: "Modliq Lead Capture WebApp v1"
 * 6. Execute as: "Me" (your email)
 * 7. Who has access: "Anyone"
 * 8. Click "Deploy", authorize permissions when prompted.
 * 9. Copy the generated Web App URL (starts with https://script.google.com/macros/s/...)
 * 10. Add GOOGLE_SHEETS_WEBAPP_URL=<Web App URL> to your backend .env
 */

var SPREADSHEET_ID = "1W_J4pPZ-CMvqxOYhghOOPufunVYUu-WRKaXPOy5LMEk";

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "online",
      message: "Modliq Google Apps Script Lead Webhook Service is active.",
      spreadsheetId: SPREADSHEET_ID,
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // 10s lock timeout for concurrency protection

  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getActiveSheet();

    // Setup Header Row if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Lead ID",
        "Name",
        "Work Email",
        "Phone / WhatsApp",
        "Company / Institution",
        "Industry Sector",
        "Your Role",
        "City / Location",
        "Primary Interest",
        "Message / Objectives",
        "Lead Status"
      ]);

      // Format Header Row
      var headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setBackground("#1B2A4A");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        // Fallback for form-urlencoded payload
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var leadId = data.id || "lead_" + Date.now();
    var name = data.name || "N/A";
    var email = data.email || "N/A";
    var phone = data.phone || "N/A";
    var company = data.company || "N/A";
    var industry = data.industry || "General";
    var role = data.role || "N/A";
    var city = data.city || "N/A";
    var interest = data.interest || "Quote & Live Demo";
    var message = data.message || "N/A";
    var status = data.status || "NEW";

    // Prevent Google Sheets formula parse error (#ERROR!) for phone numbers starting with '+' or '='
    if (phone && (phone.toString().charAt(0) === '+' || phone.toString().charAt(0) === '=')) {
      phone = "'" + phone;
    }
    if (name && (name.toString().charAt(0) === '+' || name.toString().charAt(0) === '=')) {
      name = "'" + name;
    }

    sheet.appendRow([
      timestamp,
      leadId,
      name,
      email,
      phone,
      company,
      industry,
      role,
      city,
      interest,
      message,
      status
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Lead successfully recorded in Google Sheet",
        leadId: leadId,
        rowNumber: sheet.getLastRow()
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
