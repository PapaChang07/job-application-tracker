# Job Application Tracker

A full-stack web application for managing and tracking job applications. Designed to help users stay organized during the job search process by storing essential application details, statuses, and dates in one place.

---

Features

* Add, edit, and delete job applications
* Track status (e.g., Applied, Interview, Offer, Rejected)
* Record application date and company details
* Organized dashboard with clean UI
* Persistent data storage through a backend API

---

Tech Stack

**Frontend:** React, Tailwind CSS
**Backend:** Node.js, Express
**Database:** SQLite
**Version Control:** Git & GitHub

---

Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/job-application-tracker.git
   cd job-application-tracker
   ```

2. **Install dependencies**

   ```bash
   # Frontend
   cd client
   npm install

   # Backend
   cd ../server
   npm install
   ```

3. **Set up environment variables**

   * Create a `.env` file in the `server` directory.
   * Add your environment variables (example: database URI, port, etc.).
   * Example:

     ```
     PORT=5000
     DATABASE_URL=your_database_url_here
     ```

4. **Run the app**

   ```bash
   # In separate terminals
   npm run dev        # For backend (if using nodemon)
   npm start          # For frontend
   ```

---

Future Improvements

* Authentication and user accounts
* Resume and notes upload
* Integration with job posting APIs
* Calendar or reminders for follow-ups
* Export applications as CSV or PDF

---

License

This project is licensed under the [MIT License](LICENSE).

--

Author

Developed by **Norman Chang**
https://www.linkedin.com/in/normchang/

---

Would you like me to add **badges (for license, React, Node, etc.)** and a placeholder for a **future screenshot/demo section** next? That would make it look even more polished on GitHub.
