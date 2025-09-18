[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YHSq4TPZ)
# To-Do App – Preliminary Assignment Submission
⚠️ Please complete **all sections marked with the ✍️ icon** — these are required for your submission.

👀 Please Check ASSIGNMENT.md file in this repository for assignment requirements.

## 🚀 Project Setup & Usage
**How to install and run your project:**  
✍️  
Clone the repository
Run npm install to install dependencies
Run npm run dev to start the development server

## 🔗 Deployed Web URL or APK file
https://naver-hackathon-p3oe.vercel.app/

## 🎥 Demo Video
**Demo video link (≤ 2 minutes):**  
📌 **Video Upload Guideline:** when uploading your demo video to YouTube, please set the visibility to **Unlisted**.  
- “Unlisted” videos can only be viewed by users who have the link.  
- The video will not appear in search results or on your channel.  
- Share the link in your README so mentors can access it.  

✍️ [Paste your video link here]


## 💻 Project Introduction

a. Overview
DuckDoneList is a todolist application designed for students and individuals who want to manage their tasks more efficiently. The playful name “DuckDoneList” reflects the motivation to quickly finish the list of tasks instead of leaving them incomplete. The app not only supports daily task management but also helps users with time control and habit tracking.

b. Key Features & Function Manual
Task Management: Users can create, edit, delete, and update task status (pending, in progress, completed). Tasks can be organized by category, priority level, or deadline.

Time Management: The app integrates a timer and supports the Pomodoro method, helping users stay focused for specific intervals with short breaks in between to recharge.

Habit Tracking: Besides task management, users can track their daily learning and working habits. The app records repeated activities, which later form the basis for habit reports.

c. Unique Features (What’s special about this app?)
DuckDoneList provides habit reports. It doesn’t just track tasks but also analyzes user behavior: which type of work takes up the most time, which activities are repeated the most, and how time is distributed. This gives users insights to improve their productivity and time allocation.

d. Technology Stack and Implementation Methods
Frontend: Vite + React (TypeScript)
UI: TailwindCSS for a clean and responsive design
State Management: React Hooks + Context API
Backend: Currently no dedicated backend, the app runs fully client-side
Database / Storage: localStorage is used to store tasks, habits, and timers directly in the browser
Deployment: Vercel - frontend Render - backend

e. Service Architecture & Database structure (when used)
User interactions are handled on the React frontend. Data (tasks, habits, reports) is stored locally in localStorage. Reports are generated directly on the client side from the saved data

## 🧠 Reflection

a. If you had more time, what would you expand?

If given more time, I would expand DuckDoneList into a Project Management tool. Since it mainly targets university students, it could evolve into something like Notion but with built-in Pomodoro timers. This would allow not only personal task management but also group collaboration, project tracking, and academic deadline management.

b. If you integrate AI APIs more for your app, what would you do?
The habit tracking feature is where AI would shine:

Analyze user habits monthly to understand patterns and productivity
Provide suggestions and tips for improvement, such as reducing time spent on non-priority tasks
Deliver personalized reminders based on past behavior
Auto-generate visual habit reports with insights for easier understanding of progress

