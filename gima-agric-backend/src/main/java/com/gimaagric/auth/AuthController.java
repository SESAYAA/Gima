package com.gimaagric.auth;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Frontend calls this after Firebase sign-in to exchange the Firebase ID token
     * for a backend JWT used on subsequent API requests.
     */
    @PostMapping("/verify")
    public ResponseEntity<AuthResponse> verify(@RequestBody TokenRequest request) {
        return ResponseEntity.ok(authService.verifyIdToken(request.idToken()));
    }

    /**
     * Optional: server-side signup (creates user in Firebase Auth from backend).
     */
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest request) {
        return ResponseEntity.ok(authService.signup(request));
    }
}
