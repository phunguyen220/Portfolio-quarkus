package com.baconbao.project_service;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
class ProjectResourceTest {

    @Test
    void testGetAllEndpoint() {
        given()
                .when().get("/project/getAll")
                .then()
                .statusCode(200)
                .body("success", is(true))
                .body("message", is("Get all is successfully"))
                .body("data", is("ok"));
    }
}