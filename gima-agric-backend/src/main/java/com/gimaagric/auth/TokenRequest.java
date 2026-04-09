package com.gimaagric.auth;

import jakarta.validation.constraints.NotBlank;

public record TokenRequest(@NotBlank String idToken) {}
