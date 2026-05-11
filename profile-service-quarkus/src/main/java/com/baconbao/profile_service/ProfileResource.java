package com.baconbao.profile_service;

import com.baconbao.profile_service.dto.ApiResponse;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/profile")
@Produces(MediaType.APPLICATION_JSON)
public class ProfileResource {

    @GET
    @Path("/getAll")
    public Response getAll() {
        return Response.ok(
                new ApiResponse<>(true, "Profile service is running", "ok")
        ).build();
    }
}