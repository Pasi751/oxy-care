package com.example.project.config;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {

  @Bean
  public JavaMailSender getJavaMailSender() {
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    // Set your mail properties here
    mailSender.setHost("smtp.gmail.com");
    mailSender.setUsername("sonalmendis5@gmail.com");
    mailSender.setPassword("ejrp tdlz jbau nndu");
    mailSender.setPort(587);

    Properties props = mailSender.getJavaMailProperties();
    props.put("mail.smtp.auth", true);
    props.put("mail.smtp.starttls.enable", true);

    return mailSender;
  }
}