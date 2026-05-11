package com.baconbao.notification_service;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
class NotificationResourceTest {
    @Test
    void testHelloEndpoint() {
        given()
          .when().get("/notification")
          .then()
             .statusCode(200)
             .body(is("Hello from Quarkus REST"));
    }

}