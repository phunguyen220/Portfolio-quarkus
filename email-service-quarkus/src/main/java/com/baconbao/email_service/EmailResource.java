package com.baconbao.email_service;

import com.baconbao.email_service.dto.ApiResponse;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/email")
@Produces(MediaType.APPLICATION_JSON)
public class EmailResource {

    @GET
    @Path("/getAll")
    public Response getAll() {
        return Response.ok(
                new ApiResponse<>(true, "Email service is running", "ok")
        ).build();
    }
}