package com.baconbao.image_service.dto;

public class ImageDTO {
    public Integer id;
    public String url;

    public ImageDTO() {
    }

    public ImageDTO(Integer id, String url) {
        this.id = id;
        this.url = url;
    }
}