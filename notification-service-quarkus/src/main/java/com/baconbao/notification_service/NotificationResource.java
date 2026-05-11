package com.baconbao.notification_service;

import com.baconbao.notification_service.dto.ApiResponse;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/notification")
@Produces(MediaType.APPLICATION_JSON)
public class NotificationResource {

    @GET
    @Path("/getAll")
    public Response getAll() {
        return Response.ok(
                new ApiResponse<>(true, "Notification service is running", "ok")
        ).build();
    }
}