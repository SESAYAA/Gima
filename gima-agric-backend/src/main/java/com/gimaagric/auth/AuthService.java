package com.gimaagric.auth;

import com.gimaagric.security.JwtService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final FirebaseAuth firebaseAuth;
    private final JwtService jwtService;

    /**
     * Verifies a Firebase ID token issued by the frontend after sign-in/sign-up.
     * Returns a short-lived JWT for subsequent API calls.
     */
    public AuthResponse verifyIdToken(String idToken) {
        try {
            FirebaseToken decoded = firebaseAuth.verifyIdToken(idToken);
            String uid = decoded.getUid();
            String email = decoded.getEmail();
            String name = decoded.getName();

            String jwt = jwtService.generateToken(uid, email);
            return new AuthResponse(uid, name, email, jwt);
        } catch (FirebaseAuthException e) {
            throw new AuthException("Invalid or expired token. Please sign in again.");
        }
    }

    /**
     * Creates a new user in Firebase Auth (used if you want server-side registration).
     */
    public AuthResponse signup(SignupRequest request) {
        try {
            UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest()
                    .setEmail(request.email())
                    .setPassword(request.password())
                    .setDisplayName(request.name());

            UserRecord user = firebaseAuth.createUser(createRequest);
            String jwt = jwtService.generateToken(user.getUid(), user.getEmail());
            return new AuthResponse(user.getUid(), user.getDisplayName(), user.getEmail(), jwt);
        } catch (FirebaseAuthException e) {
            throw new AuthException(mapFirebaseError(e.getMessage()));
        }
    }

    private String mapFirebaseError(String message) {
        if (message != null && message.contains("EMAIL_EXISTS")) return "Email is already registered.";
        if (message != null && message.contains("WEAK_PASSWORD")) return "Password must be at least 6 characters.";
        return "Registration failed. Please try again.";
    }
}
