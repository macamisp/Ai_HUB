# Database Design Documentation

## 1. Database Selection

**Primary Choice**: MongoDB (NoSQL)
**Alternative**: MySQL (SQL)

### Why MongoDB?
- Flexible schema for AI outputs (JSON/BSON)
- Scalability for large usage history
- Fast read/write operations
- Native JSON support for API responses

---

## 2. Entity Relationship Diagram (ERD)

```
┌─────────────────┐
│     USERS       │
├─────────────────┤
│ _id (PK)        │
│ name            │
│ email (unique)  │
│ password        │
│ role            │
│ plan_type       │
│ usage_count     │
│ created_at      │
│ updated_at      │
└─────────────────┘
        │
        │ 1:N
        ↓
┌─────────────────┐         ┌─────────────────┐
│ USAGE_HISTORY   │    N:1  │     TOOLS       │
├─────────────────┤←────────├─────────────────┤
│ _id (PK)        │         │ _id (PK)        │
│ user_id (FK)    │         │ tool_name       │
│ tool_id (FK)    │         │ description     │
│ input           │         │ category        │
│ output          │         │ icon            │
│ tokens_used     │         │ is_active       │
│ created_at      │         │ created_at      │
└─────────────────┘         └─────────────────┘
        │
        │ 1:N
        ↓
┌─────────────────┐
│ SUBSCRIPTIONS   │
├─────────────────┤
│ _id (PK)        │
│ user_id (FK)    │
│ plan_type       │
│ start_date      │
│ end_date        │
│ payment_status  │
│ amount          │
│ transaction_id  │
│ created_at      │
└─────────────────┘
```

---

## 3. Collection/Table Schemas

### 3.1 Users Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Doe",
  email: "john@example.com",
  password: "$2b$10$hashedpassword...",
  role: "user", // enum: ['user', 'admin']
  plan_type: "free", // enum: ['free', 'pro', 'enterprise']
  usage_count: {
    chat: 5,
    image: 2,
    resume: 1,
    code: 3,
    study: 4,
    content: 2
  },
  profile_image: "https://...",
  is_active: true,
  email_verified: false,
  last_login: ISODate("2024-01-15T10:30:00Z"),
  created_at: ISODate("2024-01-01T08:00:00Z"),
  updated_at: ISODate("2024-01-15T10:30:00Z")
}
```

**Indexes**:
- `email` (unique)
- `role`
- `plan_type`
- `created_at`

---

### 3.2 Tools Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  tool_name: "AI Chat Assistant",
  slug: "ai-chat",
  description: "Intelligent conversational AI assistant",
  category: "communication",
  icon: "💬",
  features: [
    "Natural language processing",
    "Context-aware responses",
    "Multi-language support"
  ],
  usage_limits: {
    free: 10,
    pro: 100,
    enterprise: -1 // unlimited
  },
  is_active: true,
  created_at: ISODate("2024-01-01T00:00:00Z")
}
```

**Indexes**:
- `slug` (unique)
- `category`
- `is_active`

---

### 3.3 Usage History Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439013"),
  user_id: ObjectId("507f1f77bcf86cd799439011"),
  tool_id: ObjectId("507f1f77bcf86cd799439012"),
  tool_name: "AI Chat Assistant",
  input: {
    prompt: "Explain quantum computing",
    parameters: {
      temperature: 0.7,
      max_tokens: 500
    }
  },
  output: {
    text: "Quantum computing is...",
    model: "gpt-4",
    tokens_used: 450
  },
  tokens_used: 450,
  execution_time: 2.5, // seconds
  status: "success", // enum: ['success', 'failed', 'pending']
  error: null,
  created_at: ISODate("2024-01-15T10:30:00Z")
}
```

**Indexes**:
- `user_id`
- `tool_id`
- `created_at` (descending)
- Compound: `user_id + created_at`

---

### 3.4 Subscriptions Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439014"),
  user_id: ObjectId("507f1f77bcf86cd799439011"),
  plan_type: "pro",
  billing_cycle: "monthly", // enum: ['monthly', 'yearly']
  amount: 29.99,
  currency: "USD",
  payment_method: "stripe",
  transaction_id: "txn_1234567890",
  payment_status: "completed", // enum: ['pending', 'completed', 'failed', 'refunded']
  start_date: ISODate("2024-01-01T00:00:00Z"),
  end_date: ISODate("2024-02-01T00:00:00Z"),
  auto_renew: true,
  is_active: true,
  created_at: ISODate("2024-01-01T00:00:00Z"),
  updated_at: ISODate("2024-01-01T00:00:00Z")
}
```

**Indexes**:
- `user_id`
- `payment_status`
- `end_date`
- `is_active`

---

### 3.5 API Keys Collection (Future)

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439015"),
  user_id: ObjectId("507f1f77bcf86cd799439011"),
  api_key: "ak_live_1234567890abcdef",
  name: "Production API Key",
  permissions: ["chat", "image", "code"],
  rate_limit: 1000, // requests per day
  is_active: true,
  last_used: ISODate("2024-01-15T10:30:00Z"),
  created_at: ISODate("2024-01-10T00:00:00Z"),
  expires_at: ISODate("2025-01-10T00:00:00Z")
}
```

---

## 4. MySQL Alternative Schema

### Users Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  plan_type ENUM('free', 'pro', 'enterprise') DEFAULT 'free',
  profile_image VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_plan_type (plan_type)
);
```

### Tools Table

```sql
CREATE TABLE tools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tool_name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(100),
  icon VARCHAR(10),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_category (category)
);
```

### Usage History Table

```sql
CREATE TABLE usage_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  tool_id INT NOT NULL,
  tool_name VARCHAR(255),
  input_text TEXT,
  output_text LONGTEXT,
  tokens_used INT DEFAULT 0,
  execution_time DECIMAL(10,2),
  status ENUM('success', 'failed', 'pending') DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_tool_id (tool_id),
  INDEX idx_created_at (created_at DESC)
);
```

### Subscriptions Table

```sql
CREATE TABLE subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  plan_type ENUM('free', 'pro', 'enterprise') NOT NULL,
  billing_cycle ENUM('monthly', 'yearly') DEFAULT 'monthly',
  amount DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(255),
  payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  auto_renew BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_payment_status (payment_status),
  INDEX idx_end_date (end_date)
);
```

---

## 5. Sample Data

### Sample Users

```javascript
[
  {
    name: "Admin User",
    email: "admin@aihub.com",
    password: "$2b$10$hashedpassword",
    role: "admin",
    plan_type: "enterprise"
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "$2b$10$hashedpassword",
    role: "user",
    plan_type: "free"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "$2b$10$hashedpassword",
    role: "user",
    plan_type: "pro"
  }
]
```

### Sample Tools

```javascript
[
  {
    tool_name: "AI Chat Assistant",
    slug: "ai-chat",
    description: "Intelligent conversational AI",
    category: "communication",
    icon: "💬"
  },
  {
    tool_name: "AI Image Generator",
    slug: "ai-image",
    description: "Generate images from text",
    category: "creative",
    icon: "🎨"
  },
  {
    tool_name: "AI Resume Builder",
    slug: "ai-resume",
    description: "Create professional resumes",
    category: "productivity",
    icon: "📄"
  },
  {
    tool_name: "AI Code Generator",
    slug: "ai-code",
    description: "Generate code snippets",
    category: "development",
    icon: "💻"
  },
  {
    tool_name: "AI Study Assistant",
    slug: "ai-study",
    description: "Study helper and tutor",
    category: "education",
    icon: "📚"
  },
  {
    tool_name: "AI Content Generator",
    slug: "ai-content",
    description: "Generate blog posts and articles",
    category: "content",
    icon: "✍️"
  }
]
```

---

## 6. Database Optimization

### Indexing Strategy
1. **Primary Keys**: Auto-indexed
2. **Foreign Keys**: Indexed for JOIN operations
3. **Frequently Queried Fields**: email, user_id, tool_id
4. **Date Fields**: created_at (for sorting/filtering)

### Query Optimization
- Use projection to limit returned fields
- Implement pagination for large datasets
- Use aggregation pipelines for analytics
- Cache frequently accessed data (Redis)

### Backup Strategy
- Daily automated backups
- Point-in-time recovery
- Geo-redundant storage
- 30-day retention policy

---

## 7. Data Migration Plan

### Phase 1: Initial Setup
1. Create database and collections/tables
2. Insert sample tools data
3. Create admin user

### Phase 2: User Migration (if applicable)
1. Export existing user data
2. Hash passwords
3. Import to new database
4. Verify data integrity

### Phase 3: Historical Data
1. Migrate usage history
2. Migrate subscription data
3. Validate relationships

---

## 8. Security Considerations

1. **Password Storage**: bcrypt hashing (10 rounds)
2. **Data Encryption**: Encrypt sensitive fields at rest
3. **Access Control**: Role-based permissions
4. **Audit Logging**: Track all data modifications
5. **GDPR Compliance**: User data deletion capability
