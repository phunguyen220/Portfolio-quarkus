# Project Service Quarkus

`project-service-quarkus` là phiên bản Quarkus của `project-service` trong hệ thống Portfolio Microservice.

Service này được xây dựng bằng Quarkus và dùng để xử lý các API liên quan đến Project. Hiện tại service đang được triển khai song song với Spring Boot `project-service` cũ để phục vụ quá trình migrate từng bước từ Spring Boot sang Quarkus.

---

## Công nghệ sử dụng

- Java 21
- Quarkus 3.35.2
- Quarkus REST
- REST Jackson
- Hibernate ORM with Panache
- JDBC MySQL
- SmallRye OpenAPI
- Maven
- Docker
- Kubernetes

---

## Cấu hình chạy local

File cấu hình chính nằm tại:

```text
src/main/resources/application.properties
```

Cấu hình hiện tại:

```properties
quarkus.http.port=8086

quarkus.datasource.devservices.enabled=false
quarkus.datasource.db-kind=mysql
quarkus.datasource.username=root
quarkus.datasource.password=123456
quarkus.datasource.jdbc.url=jdbc:mysql://localhost:3306/project1?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true

quarkus.hibernate-orm.schema-management.strategy=update
quarkus.hibernate-orm.log.sql=true
```

Service chạy ở port:

```text
http://localhost:8086
```

---

## Chạy ứng dụng ở chế độ dev

Trong thư mục `project-service-quarkus`, chạy:

```bash
mvn quarkus:dev
```

Hoặc dùng Maven wrapper:

```bash
./mvnw quarkus:dev
```

Trên Windows PowerShell:

```powershell
.\mvnw quarkus:dev
```

Khi chạy thành công, terminal sẽ hiển thị:

```text
Listening on: http://localhost:8086
```

---

## API test hiện tại

Endpoint test:

```http
GET /project/getAll
```

Gọi bằng PowerShell:

```powershell
Invoke-RestMethod -Uri "http://localhost:8086/project/getAll" -Method Get
```

Kết quả mong muốn:

```json
{
  "success": true,
  "message": "Get all is successfully",
  "data": "ok"
}
```

---

## Build project

Chạy lệnh:

```bash
mvn clean package -DskipTests
```

Sau khi build thành công, file chạy sẽ được tạo trong:

```text
target/quarkus-app/
```

Có thể chạy ứng dụng bằng:

```bash
java -jar target/quarkus-app/quarkus-run.jar
```

---

## Build Docker image

Trong thư mục `project-service-quarkus`, chạy:

```bash
docker build -t portfolio-project-service-quarkus:1.0 .
```

Kiểm tra image:

```bash
docker images
```

Image mong muốn:

```text
portfolio-project-service-quarkus:1.0
```

---

## Deploy lên Kubernetes

Manifest Kubernetes nằm tại:

```text
../k8s/project-service-quarkus.yaml
```

Nếu đang đứng ở thư mục gốc `microservice`, chạy:

```bash
kubectl apply -f k8s/project-service-quarkus.yaml
```

Kiểm tra pod:

```bash
kubectl get pods -n portfolio
```

Kiểm tra service:

```bash
kubectl get svc -n portfolio
```

Service được expose qua NodePort:

```text
http://localhost:30896
```

Test API sau khi deploy Kubernetes:

```powershell
Invoke-RestMethod -Uri "http://localhost:30896/project/getAll" -Method Get
```

---

## Kết nối với API Gateway

Sau khi deploy thành công, API Gateway có thể route `/project/**` sang Quarkus service bằng cấu hình:

```yaml
- id: project-service-quarkus
  uri: http://project-service-quarkus:8086
  predicates:
    - Path=/project/**
  filters:
    - AuthenticationFilter
```

Khi route qua Gateway, endpoint test là:

```text
http://localhost:30080/project/getAll
```

Vì route `/project/**` có `AuthenticationFilter`, cần gọi kèm JWT token.

Ví dụ lấy token:

```powershell
$body = @{
  email = "testuser@gmail.com"
  password = "123456"
} | ConvertTo-Json

$response = Invoke-RestMethod `
  -Uri "http://localhost:30080/auth/signin" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

$token = $response.data.token
```

Gọi API qua Gateway:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:30080/project/getAll" `
  -Method Get `
  -Headers @{ Authorization = "Bearer $token" }
```

---

## Trạng thái migrate

Service này hiện đang ở giai đoạn migrate ban đầu:

- Đã tạo Quarkus project
- Đã cấu hình MySQL
- Đã tạo endpoint test `/project/getAll`
- Đã Docker hóa service
- Đã deploy lên Kubernetes
- Đã route API Gateway sang `project-service-quarkus`

Các phần nghiệp vụ thật của `project-service` Spring Boot cũ sẽ được migrate dần sang Quarkus trong các bước tiếp theo.

---

## Ghi chú bảo mật

Không commit các file chứa mật khẩu thật hoặc secret lên GitHub.

Các file cần tránh commit:

```text
secret.yaml
.env
*.env
target/
```

Nếu cần mẫu secret, sử dụng:

```text
k8s/secret.example.yaml
```
