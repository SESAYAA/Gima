package com.gimaagric.auth;

public record AuthResponse(
        String id,
        String name,
        String email,
        String token
) {}
