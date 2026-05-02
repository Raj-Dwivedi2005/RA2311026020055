# Notification System Design

---

# Stage 1: API Design

## 1. Get Notifications

* **Endpoint:** `/notifications`
* **Method:** GET
* **Headers:**

```json
{
  "Authorization": "Bearer <token>"
}
```

* **Response:**

```json
{
  "notifications": [
    {
      "id": "1",
      "type": "Placement",
      "message": "Company hiring",
      "timestamp": "2026-04-22 17:51:30",
      "isRead": false
    }
  ]
}
```

---

## 2. Mark Notification as Read

* **Endpoint:** `/notifications/read`

* **Method:** POST

* **Request:**

```json
{
  "notificationId": "1"
}
```

* **Response:**

```json
{
  "message": "Notification marked as read"
}
```

---

## 3. Send Notification

* **Endpoint:** `/notifications/send`

* **Method:** POST

* **Request:**

```json
{
  "studentId": "101",
  "type": "Event",
  "message": "Tech Fest"
}
```

* **Response:**

```json
{
  "message": "Notification sent successfully"
}
```

---

## 4. Real-Time Notification Mechanism

* Use **WebSockets** for real-time updates
* When a new notification arrives:

  * Push instantly to frontend
* Alternative:

  * Server-Sent Events (SSE)

---

# Stage 2: Database Design

## Database Choice

* Use **PostgreSQL**
* Reason:

  * Structured data
  * Strong consistency
  * Supports indexing

---

## Table: Notifications

| Column Name | Type      | Description            |
| ----------- | --------- | ---------------------- |
| id          | UUID      | Primary Key            |
| studentId   | INT       | Student ID             |
| type        | VARCHAR   | Event/Result/Placement |
| message     | TEXT      | Notification message   |
| isRead      | BOOLEAN   | Read status            |
| createdAt   | TIMESTAMP | Time created           |

---

## Problems with Large Data

* Slow queries
* High DB load
* Increased latency

---

## Solutions

* Add indexes
* Partition tables
* Archive old data

---

# Stage 3: Query Optimization

## Given Query

```sql
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt DESC;
```

## Problems

* No index → full table scan
* Sorting large data is slow

---

## Solution

Create index:

```sql
CREATE INDEX idx_notifications_student_read_time
ON notifications(studentID, isRead, createdAt DESC);
```

---

## Why not index every column?

* Slows down inserts
* Uses more memory
* Not efficient

---

## Query: Placement notifications in last 7 days

```sql
SELECT * FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 days';
```

---

# Stage 4: Performance Improvement

## Problem

* Fetching notifications on every page load

---

## Solutions

### 1. Caching (Redis)

* Store notifications in cache
* Reduce DB calls

### 2. Pagination

* Load limited data (e.g., 10 at a time)

### 3. Lazy Loading

* Load more when user scrolls

### 4. Push-based updates

* Use WebSockets instead of polling

---

## Tradeoffs

* Cache needs invalidation
* More system complexity
* Memory usage increases

---

# Stage 5: System Design Fix

## Problems in given code

* Sequential processing (slow)
* No retry mechanism
* Failure causes data loss

---

## Improved Approach

* Use Queue (RabbitMQ / Kafka)
* Parallel processing
* Retry failed tasks

---

## Should DB and Email be together?

* ❌ No
* Reason:

  * Email may fail
  * DB should not depend on external service

---

## Improved Pseudocode

```
function notify_all(student_ids, message):

    for student_id in student_ids:
        add_to_queue(student_id, message)

worker():
    while queue not empty:
        task = get_task()

        save_to_db(task)

        try:
            send_email(task)
        except:
            retry(task)

        push_to_app(task)
```

---

# Stage 6: Priority Inbox (Top 10 Notifications)

## Priority Rules

* Placement > Result > Event
* Latest timestamp first

---

## Code (JavaScript)

```javascript
const getPriority = (type) => {
  if (type === "Placement") return 3;
  if (type === "Result") return 2;
  return 1;
};

const getTopNotifications = (notifications) => {
  return notifications
    .sort((a, b) => {
      if (getPriority(b.Type) !== getPriority(a.Type)) {
        return getPriority(b.Type) - getPriority(a.Type);
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, 10);
};

// Example usage
const top10 = getTopNotifications(notifications);
console.log(top10);
```

---

## Efficient Approach for Continuous Data

* Use Min Heap (size = 10)
* Insert new notification
* Remove lowest priority

---

# Final Notes

* Use clean architecture
* Follow naming conventions
* Ensure scalability
* Use logging middleware where required

---

