**🚀 React Project**  
**Project**: _TaskFlow Lite_  
**🎯 Objective**  
Build a simple but production-like React application to revise and apply all important React concepts learned during training. This project focuses on clear understanding, correct patterns, and clean code, not advanced tooling.

**🧱 Application Overview**  
You will build a Kanban-style Task Management App where:
Users can log in (dummy login)
Users can view tasks
Users can create, update, and move tasks across columns
App follows real-world React best practices

**🔐 Authentication (Basic Simulation)**

- Create a Login page
- Use React Hook Form
- On successful login:
- Save a dummy token in localStorage
- Redirect user to dashboard
- Protect dashboard routes
- Logout should clear token and redirect to login

**📌 Task Management Requirements**  
Each task should have:

- id
- title
- status (todo | in-progress | done)
- priority (low | medium | high)
- dueDate
- assignee

**📂 Recommended Folder Structure**  
src/  
├── components/ # Reusable UI components  
├── features/ # Auth, Tasks, Board  
├── hooks/ # Custom hooks  
├── context/ # Auth or global context  
├── services/ # API calls  
├── routes/ # Router setup  
└── utils/ # Helper functions

**🧭 Routing**

- Use React Router v6
- Routes:
- /login
- /dashboard
- Implement Protected Route logic
- Redirect unauthenticated users to login

**🌐 API & Data Handling**

- Setup json-server using provided db.json
- Use useEffect for API calls
- Show proper:
- Loading state (Skeleton preferred)
- Error state
- Empty state

**🧩 Kanban Board**

- Create 3 columns:
- To Do
- In Progress
- Done
- Display tasks based on status
- Implement Drag and Drop (optional library)
- When task is moved:
- Update UI immediately
- Then update API

**📝 Forms & Validation**

- Create a modal or page to add/edit tasks
- Fields:
- Title (required)
- Priority
- Due Date (cannot be past date)
- Use React Hook Form for handling
- Show validation errors clearly

**⚙️ State Management Rules**

- Use Context API for global data (auth, user)
- Avoid prop drilling more than 2 levels
- Prefer component composition

**🚀 Performance Best Practices**

- Use React.memo where needed
- Use useCallback for handlers passed to child components
- Use useMemo for filtering or heavy logic
- Avoid unnecessary re-renders

**🪝 Custom Hooks (Mandatory)**

- Create at least:
- useTasks – handles fetching tasks
- useDebounce – debounce search input
- useTaskFilter – filter by priority or search text

**🛑 Error Handling**

- Handle API errors properly
- Show user-friendly error messages
- Avoid app crashes

**♿ Accessibility Basics**

- Use proper labels for inputs
- Buttons must be keyboard accessible
- Avoid clickable divs

**🧪 Quality Checklist (Self-Review)**

- No console errors or warnings
- No unused state or props
- Clean folder structure
- Reusable components
- Readable variable names

**📋 Final Submission**

- Project should run locally without errors
- json-server setup
- Login → Dashboard → Task flow should work smoothly

- Note: Focus on correctness and understanding, not perfection of UI.
