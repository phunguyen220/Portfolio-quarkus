package com.baconbao.manager_service;

import com.baconbao.manager_service.dto.ApiResponse;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/manager")
@Produces(MediaType.APPLICATION_JSON)
public class ManagerResource {

    @GET
    @Path("/getAll")
    public Response getAll() {
        return Response.ok(
                new ApiResponse<>(true, "Manager service is running", "ok")
        ).build();
    }
}