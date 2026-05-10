package com.baconbao.project_service;

import com.baconbao.project_service.dto.ApiResponse;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/project")
@Produces(MediaType.APPLICATION_JSON)
public class ProjectResource {

    @GET
    @Path("/getAll")
    public Response getAll() {
        return Response.ok(
                new ApiResponse<>(true, "Get all is successfully", "ok")
        ).build();
    }
}