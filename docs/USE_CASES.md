# Use Case Diagram Description

## Actors

### 1. Guest User (Unauthenticated)
- View Homepage
- View Pricing Page
- Register Account
- Login

### 2. Registered User (Authenticated)
- All Guest User capabilities
- Access Dashboard
- Use AI Chat Assistant
- Use AI Image Generator
- Use AI Resume Builder
- Use AI Code Generator
- Use AI Study Assistant
- Use AI Content Generator
- View Usage History
- Export Results (PDF/Image/Text)
- Manage Profile
- Upgrade Subscription
- View Usage Statistics
- Logout

### 3. Admin User
- All Registered User capabilities
- Access Admin Dashboard
- View All Users
- Manage Users (Edit/Delete)
- View Platform Analytics
- Manage AI Tools (Enable/Disable)
- View Subscription Data
- Manage Payments
- View System Logs

---

## Use Cases

### UC-1: User Registration
**Actor**: Guest User
**Precondition**: User is not logged in
**Flow**:
1. User navigates to registration page
2. User enters name, email, password
3. System validates input
4. System checks if email already exists
5. System hashes password
6. System creates user account
7. System sends verification email
8. User is redirected to login page

**Postcondition**: User account created

---

### UC-2: User Login
**Actor**: Guest User
**Precondition**: User has an account
**Flow**:
1. User navigates to login page
2. User enters email and password
3. System validates credentials
4. System generates JWT token
5. System returns token to client
6. User is redirected to dashboard

**Postcondition**: User is authenticated

---

### UC-3: Use AI Chat Assistant
**Actor**: Registered User
**Precondition**: User is logged in
**Flow**:
1. User selects AI Chat tool
2. User enters message/prompt
3. System checks usage limits
4. System validates JWT token
5. System calls OpenAI API
6. System receives AI response
7. System saves interaction to history
8. System updates usage count
9. System displays response to user

**Postcondition**: Chat response generated and saved

---

### UC-4: Generate AI Image
**Actor**: Registered User
**Precondition**: User is logged in
**Flow**:
1. User selects AI Image Generator
2. User enters image description
3. System checks usage limits
4. System calls DALL-E API
5. System receives generated image
6. System saves image and metadata
7. System updates usage count
8. System displays image with download option

**Postcondition**: Image generated and available for download

---

### UC-5: Build Resume
**Actor**: Registered User
**Precondition**: User is logged in
**Flow**:
1. User selects AI Resume Builder
2. User fills multi-step form (personal info, education, experience, skills)
3. User selects template
4. System generates resume using AI
5. System creates PDF
6. System saves resume data
7. User previews resume
8. User downloads PDF

**Postcondition**: Resume created and downloaded

---

### UC-6: Generate Code
**Actor**: Registered User
**Precondition**: User is logged in
**Flow**:
1. User selects AI Code Generator
2. User describes desired functionality
3. User selects programming language
4. System checks usage limits
5. System calls OpenAI Codex API
6. System receives generated code
7. System applies syntax highlighting
8. System saves to history
9. User can copy or download code

**Postcondition**: Code generated and available

---

### UC-7: Upgrade Subscription
**Actor**: Registered User
**Precondition**: User is logged in with free plan
**Flow**:
1. User navigates to pricing page
2. User selects Pro/Enterprise plan
3. User clicks "Upgrade" button
4. System redirects to checkout page
5. User enters payment details
6. System processes payment via Stripe
7. System receives payment confirmation
8. System updates user plan
9. System sends confirmation email
10. User is redirected to dashboard

**Postcondition**: User subscription upgraded

---

### UC-8: View Usage History
**Actor**: Registered User
**Precondition**: User is logged in
**Flow**:
1. User navigates to History page
2. System retrieves user's usage history
3. System displays list of past interactions
4. User can filter by tool or date
5. User can search history
6. User can view past results
7. User can delete history items

**Postcondition**: Usage history displayed

---

### UC-9: Manage Users (Admin)
**Actor**: Admin
**Precondition**: Admin is logged in
**Flow**:
1. Admin navigates to Admin Dashboard
2. Admin selects User Management
3. System displays all users
4. Admin can search/filter users
5. Admin can view user details
6. Admin can edit user (change plan, role)
7. Admin can delete user
8. System updates database
9. System logs admin action

**Postcondition**: User data updated

---

### UC-10: View Analytics (Admin)
**Actor**: Admin
**Precondition**: Admin is logged in
**Flow**:
1. Admin navigates to Analytics page
2. System aggregates platform data
3. System displays:
   - Total users
   - Active subscriptions
   - Tool usage statistics
   - Revenue metrics
   - User growth charts
4. Admin can filter by date range
5. Admin can export reports

**Postcondition**: Analytics displayed

---

## System Boundaries

### Included in System:
- User authentication
- AI tool interfaces
- Usage tracking
- Payment processing
- Admin management
- History management

### External Systems:
- OpenAI API (GPT, DALL-E)
- Stripe Payment Gateway
- Email Service (SMTP)
- Cloud Storage (for images)

---

## Use Case Diagram (Text Representation)

```
                    ┌─────────────────────────────────────┐
                    │      AI Platform System             │
                    │                                     │
┌──────────┐        │  ┌──────────────────────────────┐  │
│  Guest   │───────────│  Register                    │  │
│  User    │        │  │  Login                       │  │
└──────────┘        │  │  View Pricing                │  │
                    │  └──────────────────────────────┘  │
                    │                                     │
┌──────────┐        │  ┌──────────────────────────────┐  │
│Registered│───────────│  Use AI Chat                 │  │
│  User    │        │  │  Generate Image              │  │
└──────────┘        │  │  Build Resume                │  │
                    │  │  Generate Code               │  │
                    │  │  Study Assistant             │  │
                    │  │  Content Generator           │  │
                    │  │  View History                │  │
                    │  │  Upgrade Subscription        │  │
                    │  │  Export Results              │  │
                    │  └──────────────────────────────┘  │
                    │                                     │
┌──────────┐        │  ┌──────────────────────────────┐  │
│  Admin   │───────────│  Manage Users                │  │
│  User    │        │  │  View Analytics              │  │
└──────────┘        │  │  Manage Tools                │  │
                    │  │  View Logs                   │  │
                    │  └──────────────────────────────┘  │
                    │                                     │
                    │  External Systems:                  │
                    │  • OpenAI API                       │
                    │  • Stripe                           │
                    │  • Email Service                    │
                    └─────────────────────────────────────┘
```

---

## Relationships

### Include Relationships:
- All AI tool use cases **include** "Check Usage Limits"
- All AI tool use cases **include** "Validate JWT Token"
- "Upgrade Subscription" **includes** "Process Payment"

### Extend Relationships:
- "Use AI Chat" **extends** "Export Chat History"
- "Generate Image" **extends** "Download Image"
- "Build Resume" **extends** "Download PDF"
- "Generate Code" **extends** "Download Code File"

### Generalization:
- Admin **is-a** Registered User
- Registered User **is-a** Guest User (with authentication)
