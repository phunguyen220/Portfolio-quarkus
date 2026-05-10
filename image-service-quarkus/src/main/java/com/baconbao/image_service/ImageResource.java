package com.baconbao.image_service;

import com.baconbao.image_service.dto.ApiResponse;
import com.baconbao.image_service.dto.ImageDTO;
import com.baconbao.image_service.service.ImageService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.reactive.RestForm;

import java.io.File;

@Path("/image")
@Produces(MediaType.APPLICATION_JSON)
public class ImageResource {

    @Inject
    ImageService imageService;

    @GET
    @Path("/getAll")
    public Response getAll() {
        return Response.ok(
                new ApiResponse<>(true, "Get all is successfully", "ok")
        ).build();
    }

    @POST
    @Path("/save")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response save(@RestForm("image") File image) {
        if (image == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ApiResponse<>(false, "Image is required", null))
                    .build();
        }

        ImageDTO imageDTO = imageService.saveImage(image);

        return Response.ok(
                new ApiResponse<>(true, "Get all is successfully", imageDTO)
        ).build();
    }
}