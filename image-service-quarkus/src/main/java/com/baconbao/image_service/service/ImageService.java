package com.baconbao.image_service.service;

import com.baconbao.image_service.dto.ImageDTO;
import com.baconbao.image_service.model.Image;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.io.File;

@ApplicationScoped
public class ImageService {

    @Transactional
    public ImageDTO saveImage(File imageFile) {
        String uploadedUrl = "local-file://" + imageFile.getName();

        Image image = new Image();
        image.url = uploadedUrl;
        image.persist();

        return new ImageDTO(image.id, image.url);
    }
}