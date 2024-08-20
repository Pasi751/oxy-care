package com.example.project.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.project.dto.LoginResponseDTO;
import com.example.project.model.Agriculturist;
import com.example.project.model.Explorer;
import com.example.project.model.Industrialist;
import com.example.project.model.User;
import com.example.project.repository.AgriculturistRepository;
import com.example.project.repository.ExplorerRepository;
import com.example.project.repository.IndustrialistRepository;
import com.example.project.repository.UserRepository;
import com.example.project.utility.RandomString;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    
    @Autowired
    private AgriculturistRepository agriculturistRepository;

    @Autowired
    private IndustrialistRepository industrialistRepository;
    
    @Autowired
    private ExplorerRepository explorerRepository;
    
    @Autowired
    private JavaMailSender mailSender;
    
    
    

    public LoginResponseDTO login(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username, password);
        if (user != null) {
            LoginResponseDTO response = new LoginResponseDTO();
            response.setUsername(username);
            response.setIsEnabled(user.getEnabled());
            if (user instanceof Industrialist) {
                response.setUserRole("industrialist");
            } else if (user instanceof Agriculturist) {
                response.setUserRole("agriculturist");
            } else if (user instanceof Explorer) {
                response.setUserRole("explorer");
            }else {
                response.setUserRole("user");
            }
            return response;
        }
        return null; // or throw an exception for invalid credentials
    }
    
    public User updateUsername(String currentUsername, String newUsername) {
        User user = userRepository.findByUsername(currentUsername);
        if (user != null) {
            user.setUsername(newUsername);
            return userRepository.save(user);
        }
        return null;
    }
    
    
    public ResponseEntity<?> updatePassword(String username, String currentPassword, String newPassword) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            if (user.getPassword().equals(currentPassword)) {
                user.setPassword(newPassword);
                userRepository.save(user);
                return ResponseEntity.ok("Password updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect current password");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
    
    
    public String registerAgriculturist(Agriculturist agriculturist, MultipartFile cnicImage, MultipartFile businessLicenseImage) throws IOException {
    	if ((cnicImage != null && !cnicImage.isEmpty()) &&  (businessLicenseImage != null && !businessLicenseImage.isEmpty())) {
        	byte[] cnicImageData = cnicImage.getBytes();
        	byte[] businessLicenseImageData = businessLicenseImage.getBytes();
        	agriculturist.setCnicImage(cnicImageData);
        	agriculturist.setBusinessLicenseImage(businessLicenseImageData);
        	
        	
        	
        	
        	
        	agriculturistRepository.save(agriculturist);
        }
        return "User registered successfully as Agriculturist";
    }
    
    
    public String registerExplorer(Explorer explorer) {
        explorerRepository.save(explorer);
        return "User registered successfully as Explorer";
    }

    
    public boolean existsByUsernameOrEmail(String username, String email) {
        return agriculturistRepository.existsByUsernameOrEmail(username, email);
    }
    
    public boolean industrialistExistsByUsernameOrEmail(String username, String email) {
        return industrialistRepository.existsByUsernameOrEmail(username, email);
    }
    


	public String registerIndustrialist(Industrialist industrialist, MultipartFile cnicImage, MultipartFile businessLicenseImage) throws IOException {
    	if ((cnicImage != null && !cnicImage.isEmpty()) &&  (businessLicenseImage != null && !businessLicenseImage.isEmpty())) {
        	byte[] cnicImageData = cnicImage.getBytes();
        	byte[] businessLicenseImageData = businessLicenseImage.getBytes();
        	industrialist.setCnicImage(cnicImageData);
        	industrialist.setBusinessLicenseImage(businessLicenseImageData);
        	
        	
        	
        	industrialistRepository.save(industrialist);
        }
        return "User registered successfully as Industrialist";
    }
	
	
	public void sendVerificationCode(User user, String siteUrl) throws UnsupportedEncodingException, MessagingException {
		// Generate verification code
		  String verificationCode = user.getVerificationCode();

		  // Build verification link (assuming verification endpoint is /verify)
		  String verificationLink = siteUrl + "/verify?code=" + user.getVerificationCode();
		  // Build email content with HTML (not recommended for production)
		  String emailContent = "<!DOCTYPE html>" +
		      "<html>" +
		      "<body>" +
		          "<h1>Verify Your Email Address for ORCMS</h1>" +
		          "<p>Hi " + user.getUsername() + ",</p>" +
		          "<p>Thanks for signing up for ORCMS! To complete your registration and ensure you receive important notifications, please verify your email address.</p>" +
		          "<p>Click the link below to confirm your email:</p>" +
		          "<a href=\"" + verificationLink + "\">Verify Email</a>" +
		          "<p>This link will expire in 2 hours. If you don't verify your email within this timeframe, you'll need to request a new verification code.</p>" +
		          "<p>If you can't click the link, you can copy and paste the following URL into your web browser:</p>" +
		          "<p>" + verificationLink + "</p>" +
		      "</body>" +
		      "</html>";

		  // Send email using your preferred library (replace with actual logic)
		  MimeMessage message = mailSender.createMimeMessage();
		  MimeMessageHelper helper = new MimeMessageHelper(message);
		  
		  helper.setFrom("sonalmendis5@gmail.com","ORCMS");
		  
		  helper.setTo(user.getEmail());
		  
		  helper.setSubject("Verify Your Email Address for ORCMS");
		  
		  helper.setText(emailContent, true);
		  
		  mailSender.send(message);
		
	}
    
	
	public boolean verifyUser(String code) {
	    Optional<User> userOptional = userRepository.findByVerificationCode(code);

	    if (userOptional.isPresent()) {
	      User user = userOptional.get();
	      user.setEnabled(true);
	      userRepository.save(user);
	      return true;
	    } else {
	      return false;
	    }
	  }
    
    
}
