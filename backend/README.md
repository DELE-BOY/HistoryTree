# History Tree Backend

Backend server for the History Tree application that handles email submissions.

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Email

Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

Edit with your email service credentials:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
SUBMISSION_EMAIL=example@duck.com
REPLY_EMAIL=your-email@gmail.com
PORT=5000
```

### 3. Gmail Setup (Required for Gmail)

1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use the generated App Password in `.env` (NOT your regular password)

### 4. Run Server

Development (auto-reload):
```bash
npm run dev
```

Production:
```bash
npm start
```

Server runs on `http://localhost:5000`

## How It Works

### User Flow
1. User selects date on calendar
2. Clicks date with events → Modal opens
3. Clicks "+ Submit Entry for This Date" → Form appears with date pre-filled
4. Fills topic, description, significance, image URL
5. Clicks submit → Backend sends email to configured recipient
6. User sees success message

### Email Format

HTML email sent to `SUBMISSION_EMAIL`:
- **Subject**: `New submission - [DATE]`
- **Content**: Formatted event details, image URL, timestamp
- **No attachments**: Images referenced by URL only (credible sources only)

## API Endpoints

### Submit Entry
**POST** `/api/submit-entry`

Request:
```json
{
  "date": "1960-01-15",
  "country": "Nigeria",
  "topic": "Constitutional Conference",
  "description": "Detailed description of the historical event...",
  "significance": "Why this event is historically important...",
  "imageUrl": "https://example.com/image.jpg"
}
```

Response (Success):
```json
{
  "message": "Entry submitted successfully",
  "submittedDate": "2024-05-10T10:30:00.000Z"
}
```

Response (Error):
```json
{
  "message": "Missing required fields"
}
```

### Health Check
**GET** `/api/health`

Response:
```json
{
  "status": "Backend is running"
}
```

## Image Handling

Instead of uploading images to the server:
- **Users provide URLs** to credible sources (Google Drive, Wikipedia Commons, museum archives, etc.)
- **Helps verify authenticity** - discourages AI-generated content
- **Reduces storage** - no image files on server
- **Maintains attribution** - source link preserved
- Hint shown: "Please provide links to historically accurate images from credible sources only. AI-generated images cannot be used."

## Email Providers

### Gmail (Default)
```javascript
service: 'gmail',
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASSWORD  // Use App Password!
}
```

### Other Providers

**Outlook:**
```javascript
service: 'outlook',
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASSWORD
}
```

**Custom SMTP:**
```javascript
host: 'mail.example.com',
port: 587,
secure: false,
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASSWORD
}
```

Edit `server.js` and replace the transporter configuration.

## Configuration

### Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `EMAIL_USER` | Sender email address | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | App password (not regular password) | `xxxx xxxx xxxx xxxx` |
| `SUBMISSION_EMAIL` | Recipient email address | `example@duck.com` |
| `REPLY_EMAIL` | Reply-to address | `your-email@gmail.com` |
| `PORT` | Server port | `5000` |

### Security Notes

⚠️ **Never commit `.env` with real credentials**  
⚠️ **Use App Passwords for Gmail, not regular passwords**  
⚠️ **All inputs validated on backend**  
⚠️ **Use HTTPS in production**  
⚠️ **Consider authentication for production use**

## Testing

### Test Email Submission

1. Open calendar, select a date
2. Click "Submit Entry for This Date"
3. Fill form:
   - Topic: "Test Event"
   - Description: "Test description"
   - Significance: "Test significance"
   - Image URL: (optional)
4. Submit
5. Check configured email for submission

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```

## Troubleshooting

### "Failed to connect to backend"
- Ensure backend running: `npm run dev`
- Check PORT matches (default 5000)
- Verify frontend API call uses correct PORT

### "Email not sending"
- Verify email credentials in `.env`
- For Gmail: Confirm App Password (not regular password)
- Check Gmail security allows app access
- Verify email service is ready (check console logs)

### "CORS error"
- Backend CORS is configured
- Ensure frontend and backend are running
- Check for network/firewall issues

### "Form won't submit"
- Check all required fields filled
- Check browser console for errors
- Verify backend is running and healthy

## Future Enhancements

- Database integration for submission review workflow
- Admin dashboard to approve entries before publishing
- Direct image uploads (alternative to URL links)
- PDF export for submissions
- Multiple recipient support
- Rate limiting to prevent spam
- Captcha protection
- File attachment support

## Notes

- **No Database**: Currently submissions only sent via email (designed for simple workflows)
- **Image Philosophy**: URL-based approach encourages source verification and discourages AI-generated content
- **Production Ready**: Suitable for small to medium traffic; scale database and caching for larger deployments

# Submission Form Implementation Guide

## What I've Created

### Frontend Components

1. **SubmissionForm.js** - React component with:
   - Pre-filled, read-only date field
   - Topic/title input
   - Description textarea
   - Historical significance textarea
   - Image URL field (credible source only)
   - Form validation
   - Loading state
   - Success/error messages

2. **SubmissionForm.css** - Styled modal matching your dark theme:
   - Dark blue gradient background
   - White text for readability
   - Consistent styling with DetailView
   - Form inputs with focus states
   - Responsive layout

3. **Integration with CalendarView.js**:
   - "Submit Entry" button in calendar controls
   - Opens submission form modal when clicked
   - Date automatically populated from selected calendar date

### Backend Server

**backend/server.js** - Express.js server with:
- CORS support for frontend communication
- Email sending via Nodemailer
- POST `/api/submit-entry` endpoint
- Health check endpoint
- Environment variable configuration

### Configuration Files

- **backend/package.json** - Dependencies (Express, Nodemailer, CORS)
- **backend/.env.example** - Template for email configuration
- **backend/README.md** - Setup instructions

## How It Works

### User Flow

1. User selects a date on calendar
2. Clicks "Submit Entry" button
3. Form modal opens with date pre-filled
4. User fills in topic, description, significance, and image URL
5. Clicks "Submit Entry"
6. Form validates all required fields
7. POST request sent to backend
8. Backend sends formatted email to configured recipient
9. User sees success message
10. Form closes automatically

### Email Format

Recipients receive HTML emails with:
- Subject: `New submission - [DATE]`
- Formatted event details
- Image source URL (if provided)
- Submission timestamp

## Setup Instructions

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Email

Create `backend/.env`:

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
SUBMISSION_EMAIL=example@duck.com
REPLY_EMAIL=your-email@gmail.com
PORT=5000
```

**For Gmail:**
1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use app password in `.env` (NOT your regular password)

### 3. Run Backend Server

Development (auto-reload):
```bash
npm run dev
```

Production:
```bash
npm start
```

The server will run on `http://localhost:5000`

### 4. Start Frontend App

In another terminal:
```bash
cd history-tree-explorer
npm start
```

## Configuration Options

### Email Providers

Currently configured for **Gmail**. To use other providers, modify `backend/server.js`:

```javascript
// Example for Outlook
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Example for custom SMTP
const transporter = nodemailer.createTransport({
  host: 'mail.example.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

### Submission Email Address

Change recipient in `backend/.env`:
```
SUBMISSION_EMAIL=your-preferred-email@domain.com
```

## Features

✅ Date pre-filled (read-only)  
✅ Form validation  
✅ Image URL field with credible source hint  
✅ HTML formatted emails  
✅ Error handling  
✅ Loading states  
✅ Success/error messages  
✅ CORS enabled  
✅ Environment-based configuration  
✅ No database required (email-only)  

## Testing

### Test Email Submission

1. Open calendar, select a date
2. Click "Submit Entry" button
3. Fill in form:
   - Topic: "Test Event"
   - Description: "Test description"
   - Significance: "Test significance"
   - Image URL: (leave blank or add a real URL)
4. Click "Submit Entry"
5. You should see a success message
6. Check your email for the submission

### Test Backend Health

```bash
curl http://localhost:5000/api/health
```

Response:
```json
{"status": "Backend is running"}
```

## Image Handling Philosophy

Instead of uploading images to your server:
- Users provide URLs to credible sources
- Supports: Museum archives, Wikipedia Commons, Google Drive, etc.
- Helps verify authenticity (discourages AI-generated content)
- Reduces server storage needs
- Maintains source attribution

## Future Enhancements

1. **Database Integration** - Store submissions for review workflow
2. **Admin Dashboard** - Review and approve submissions before publishing
3. **Direct Image Upload** - Alternative to URL links
4. **PDF Export** - Generate submission receipts
5. **Multiple Recipients** - Send to different email addresses
6. **Rate Limiting** - Prevent spam submissions
7. **Captcha** - Bot protection
8. **File Attachments** - Additional documentation

## Security Notes

⚠️ **Never commit `.env` with real credentials**  
⚠️ **App passwords are safer than regular passwords for Gmail**  
⚠️ **Consider adding authentication for production**  
⚠️ **Validate all inputs on backend (already done)**  
⚠️ **Use HTTPS in production**  

## Troubleshooting

**"Failed to connect to backend"**
- Ensure backend server is running: `npm run dev`
- Check PORT is 5000 or matches your configuration

**"Email not sending"**
- Verify email credentials are correct
- Check Gmail App Password (not regular password)
- Enable "Less secure app access" if needed (for Gmail)

**"CORS error"**
- Backend CORS is configured
- Check frontend API call matches backend PORT
- Verify backend is running before frontend

**"Form won't submit"**
- Check all required fields are filled
- Check browser console for errors
- Verify backend server is running
