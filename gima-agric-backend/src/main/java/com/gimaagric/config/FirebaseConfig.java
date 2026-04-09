package com.gimaagric.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @Value("${app.firebase.project-id}")
    private String projectId;

    @Value("${app.firebase.credentials-path}")
    private String credentialsPath;

    @Bean
    public FirebaseAuth firebaseAuth() throws IOException {
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseOptions options;
            File credFile = new File(credentialsPath);

            if (credFile.exists()) {
                // Local dev: use service account JSON
                FileInputStream serviceAccount = new FileInputStream(credFile);
                options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .setProjectId(projectId)
                        .build();
            } else {
                // Cloud run / CI: use Application Default Credentials
                options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.getApplicationDefault())
                        .setProjectId(projectId)
                        .build();
            }

            FirebaseApp.initializeApp(options);
        }
        return FirebaseAuth.getInstance();
    }
}
