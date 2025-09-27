package br.com.caracameusonho.api.domain.service;

import br.com.caracameusonho.api.domain.model.Reserva;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import java.io.UnsupportedEncodingException; 

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendConfirmationEmail(Reserva reserva) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("seu-email@dominio.com", "Caraca, Meu Sonho!");
            helper.setTo(reserva.getUsuario().getEmail());
            helper.setSubject("Confirmação de Reserva - " + reserva.getPacoteViagem().getTitulo());

            String htmlMsg = "<h1>Olá, " + reserva.getUsuario().getNome() + "!</h1>"
                    + "<p>Sua reserva para <strong>" + reserva.getPacoteViagem().getTitulo() + "</strong> foi confirmada com sucesso!</p>"
                    + "<p>Data da Viagem: " + reserva.getPacoteViagem().getDataPartida().toString() + "</p>"
                    + "<p>Prepare-se para uma experiência inesquecível!</p>";

            helper.setText(htmlMsg, true);
            mailSender.send(message);

        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException("Erro ao enviar e-mail de confirmação", e);
        }
    }
    
    public void sendPasswordResetEmail(String to, String userName, String resetLink) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("seu-email@dominio.com", "Caraca, Meu Sonho!");
            helper.setTo(to);
            helper.setSubject("Recuperação de Senha - Caraca, Meu Sonho!");

            String htmlMsg = "<h3>Olá, " + userName + "!</h3>"
                    + "<p>Você solicitou a redefinição de sua senha. Clique no link abaixo para criar uma nova senha:</p>"
                    + "<a href='" + resetLink + "'>Redefinir Minha Senha</a>"
                    + "<p>Se você não solicitou isso, por favor, ignore este e-mail.</p>"
                    + "<p>O link é válido por 1 hora.</p>";

            helper.setText(htmlMsg, true);
            mailSender.send(message);

        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException("Erro ao enviar e-mail de recuperação de senha", e);
        }
    }

	 public void sendBookingConfirmationEmail(Reserva reserva) {

        this.sendConfirmationEmail(reserva);
    }
}
