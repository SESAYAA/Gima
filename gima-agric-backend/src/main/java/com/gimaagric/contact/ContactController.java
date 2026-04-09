package com.gimaagric.contact;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<Void> contact(@Valid @RequestBody ContactRequest request) {
        contactService.sendContactEmail(request);
        return ResponseEntity.ok().build();
    }
}
