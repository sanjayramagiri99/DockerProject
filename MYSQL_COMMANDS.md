# MySQL Commands Reference

## Docker MySQL (from Docker Compose)

### 1. Connect to MySQL Container
```bash
# Connect as root user
docker exec -it demo-mysql mysql -uroot -pchangeme

# Connect as demo user
docker exec -it demo-mysql mysql -udemo -pdemo123

# Or connect directly to the database
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db
```

### 2. Check MySQL Version
```bash
docker exec -it demo-mysql mysql -uroot -pchangeme -e "SELECT VERSION();"
```

### 3. List All Databases
```bash
docker exec -it demo-mysql mysql -uroot -pchangeme -e "SHOW DATABASES;"
```

### 4. Use Specific Database
```bash
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db
# Then in MySQL prompt:
USE demo_db;
```

### 5. Show All Tables
```bash
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "SHOW TABLES;"
```

### 6. Describe Table Structure
```bash
# For users table
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "DESCRIBE users;"

# For products table
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "DESCRIBE products;"

# For tasks table
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "DESCRIBE tasks;"
```

### 7. View Data from Tables
```bash
# View all users
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "SELECT * FROM users;"

# View all products
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "SELECT * FROM products;"

# View all tasks
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "SELECT * FROM tasks;"
```

### 8. Count Records
```bash
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "SELECT COUNT(*) FROM users;"
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "SELECT COUNT(*) FROM products;"
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "SELECT COUNT(*) FROM tasks;"
```

### 9. Check MySQL Status
```bash
docker exec -it demo-mysql mysqladmin -uroot -pchangeme status
```

### 10. View MySQL Logs
```bash
docker logs demo-mysql
docker logs demo-mysql --tail 50  # Last 50 lines
docker logs demo-mysql -f         # Follow logs
```

### 11. Interactive MySQL Session
```bash
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db
```
Then you can run SQL commands:
```sql
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM tasks;
EXIT;
```

---

## Local MySQL (if running directly on host)

### 1. Connect to MySQL
```bash
# Connect as root
mysql -uroot -p

# Connect as specific user
mysql -udemo -pdemo123 demo_db

# Connect with host and port
mysql -h localhost -P 3306 -udemo -pdemo123 demo_db
```

### 2. Check MySQL Version
```bash
mysql --version
# Or
mysql -uroot -p -e "SELECT VERSION();"
```

### 3. List All Databases
```bash
mysql -uroot -p -e "SHOW DATABASES;"
```

### 4. Show All Tables
```bash
mysql -udemo -pdemo123 demo_db -e "SHOW TABLES;"
```

### 5. View Data
```bash
mysql -udemo -pdemo123 demo_db -e "SELECT * FROM users;"
mysql -udemo -pdemo123 demo_db -e "SELECT * FROM products;"
mysql -udemo -pdemo123 demo_db -e "SELECT * FROM tasks;"
```

---

## Quick Reference - Docker MySQL Commands

Based on your docker-compose.yaml configuration:
- **Container name**: `demo-mysql`
- **Database**: `demo_db`
- **Root password**: `changeme`
- **User**: `demo`
- **Password**: `demo123`
- **Port**: `3306`

### Most Common Commands:

```bash
# Quick connect and view all tables
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "SHOW TABLES;"

# View all users
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "SELECT * FROM users;"

# View all products
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "SELECT * FROM products;"

# View all tasks
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "SELECT * FROM tasks;"

# Interactive session
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db
```

---

## Advanced Queries

### View table with formatted output
```bash
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "SELECT * FROM users\G"
```

### View with column headers
```bash
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "SELECT id, name, email, phone, createdAt FROM users;"
```

### Count records per table
```bash
docker exec -it demo-mysql mysql -udemo -pdemo123 demo_db -e "
SELECT 
  'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 
  'products' as table_name, COUNT(*) as count FROM products
UNION ALL
SELECT 
  'tasks' as table_name, COUNT(*) as count FROM tasks;"
```

### Check table sizes
```bash
docker exec -it demo-mysql mysql -uroot -pchangeme demo_db -e "
SELECT 
  table_name AS 'Table',
  ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'demo_db'
ORDER BY (data_length + index_length) DESC;"
```

