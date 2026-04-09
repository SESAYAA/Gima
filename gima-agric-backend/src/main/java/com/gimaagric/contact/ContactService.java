package com.gimaagric.contact;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.to}")
    private String companyEmail;

    public void sendContactEmail(ContactRequest req) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            // Deliver to company inbox
            helper.setTo(companyEmail);

            // Reply-To is the sender's email — company staff just hit Reply in their mail client
            helper.setReplyTo(req.email());

            helper.setSubject("[Gima Agric Contact] " + req.subject());

            String body = """
                    <html><body style="font-family: Arial, sans-serif; color: #333;">
                      <h2 style="color: #5a8a3c;">New Contact Message</h2>
                      <table style="border-collapse: collapse; width: 100%%;">
                        <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">%s</td></tr>
                        <tr style="background:#f5f5f5;"><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:%s">%s</a></td></tr>
                        <tr><td style="padding: 8px; font-weight: bold;">Subject:</td><td style="padding: 8px;">%s</td></tr>
                      </table>
                      <h3 style="color: #5a8a3c; margin-top: 20px;">Message:</h3>
                      <div style="background: #f9f9f9; padding: 16px; border-left: 4px solid #5a8a3c; white-space: pre-wrap;">%s</div>
                      <hr style="margin-top: 30px;">
                      <p style="color: #888; font-size: 12px;">
                        To reply, simply hit <strong>Reply</strong> in your email client — your response will go directly to %s.
                      </p>
                    </body></html>
                    """.formatted(
                    req.name(), req.email(), req.email(),
                    req.subject(), req.message(), req.email()
            );

            helper.setText(body, true);
            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
        }
    }
}
