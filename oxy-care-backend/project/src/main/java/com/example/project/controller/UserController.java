package com.example.project.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.example.project.dto.LoginRequestDTO;
import com.example.project.dto.LoginResponseDTO;
import com.example.project.dto.UpdateUserNameDTO;
import com.example.project.dto.UpdateUserPasswordDTO;
import com.example.project.model.Agriculturist;
import com.example.project.model.Explorer;
import com.example.project.model.Industrialist;
import com.example.project.model.User;
import com.example.project.service.UserService;
import com.example.project.utility.RandomString;
import com.example.project.utility.SiteUrlFinder;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;




@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        LoginResponseDTO response = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // or any other appropriate HTTP status
        }
    }
    
    @PostMapping("/updateUsername")
    public ResponseEntity<?> updateUsername(@RequestBody UpdateUserNameDTO updateUser  ) {
        User updatedUser = userService.updateUsername(updateUser.getCurrentUsername(), updateUser.getNewUsername());
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
    
    @PutMapping("/updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody UpdateUserPasswordDTO updatePassword) {
        return userService.updatePassword(updatePassword.getUsername(), updatePassword.getCurrentPassword(), updatePassword.getNewPassword());
    }

    
    @PostMapping("/register/agriculturist")
    public String registerAgriculturist(@RequestParam("username")String username,@RequestParam("email")String email, @RequestParam("password") String password,@RequestParam("cnicImage") MultipartFile cnicImage,@RequestParam("contact_number") String contactNumber,@RequestParam("province") String province,@RequestParam("city") String city,@RequestParam("treeType") String treeType,@RequestParam("num_trees_planted")int numTreesPlanted,@RequestParam("business_license_upload") MultipartFile businessLicenseUpload, HttpServletRequest request) throws IOException, MessagingException {
    	
    	
    	if (userService.existsByUsernameOrEmail(username, email)) {
            return "User already exists with the given username or email.";
        }
    	
    	Agriculturist agriculturist = new Agriculturist();
    	agriculturist.setUsername(username);
    	agriculturist.setEmail(email);
    	agriculturist.setPassword(password);
    	agriculturist.setPhoneNumber(contactNumber);
    	agriculturist.setProvince(province);
    	agriculturist.setCity(city);
    	agriculturist.setTypesOfTreesPlanted(treeType);
    	agriculturist.setTreesPlanted(numTreesPlanted);
    	
    	String siteUrl = SiteUrlFinder.getSiteURL(request);
    	
    	String verificationCode = RandomString.generate(64);
    	
    	agriculturist.setVerificationCode(verificationCode);
    	
    	userService.sendVerificationCode(agriculturist,siteUrl);
    	
    	agriculturist.setEnabled(false);
    	
        return userService.registerAgriculturist(agriculturist,cnicImage,businessLicenseUpload);
    }
    
    @PostMapping("/register/industrialist")
    public String registerIndustrialist(@RequestParam("username")String username,@RequestParam("email")String email, @RequestParam("password") String password,@RequestParam("cnicImage") MultipartFile cnicImage,@RequestParam("companyName") String companyName,@RequestParam("companyType") String companyType,@RequestParam("companySize")String companySize,@RequestParam("province") String province,@RequestParam("city") String city,@RequestParam("business_license_upload") MultipartFile businessLicenseUpload, HttpServletRequest request) throws IOException, MessagingException {
    	
    	if (userService.industrialistExistsByUsernameOrEmail(username, email)) {
            return "User already exists with the given username or email.";
        }
    	
    	Industrialist industrialist = new Industrialist();
    	industrialist.setUsername(username);
    	industrialist.setEmail(email);
    	industrialist.setPassword(password);
    	industrialist.setCompanyName(companyName);
    	industrialist.setCompanySize(companySize);
    	industrialist.setCompanyType(companyType);
    	industrialist.setProvince(province);
    	industrialist.setCity(city);
    	
    	industrialist.setEnabled(false);
    	
    	String verificationCode = RandomString.generate(64);
    	
    	industrialist.setVerificationCode(verificationCode);
    	
    	String siteUrl = SiteUrlFinder.getSiteURL(request);
    	
    	userService.sendVerificationCode(industrialist,siteUrl);
    	
        return userService.registerIndustrialist(industrialist,cnicImage,businessLicenseUpload);
    }
    
    @PostMapping("/register/explorer")
    public String registerExplorer(@RequestParam("username")String username,@RequestParam("email")String email, @RequestParam("password") String password,@RequestParam("contact_number") String contactNumber, HttpServletRequest request) throws UnsupportedEncodingException, MessagingException {
        if (userService.existsByUsernameOrEmail(username, email)) {
            return "User already exists with the given username or email.";
        }

        Explorer explorer = new Explorer();
        explorer.setUsername(username);
        explorer.setEmail(email);
        explorer.setPassword(password);
        explorer.setContactNumber(contactNumber);
        explorer.setEnabled(false);
        
        String verificationCode = RandomString.generate(64);
    	
    	explorer.setVerificationCode(verificationCode);
    	
    	String siteUrl = SiteUrlFinder.getSiteURL(request);
    	
    	userService.sendVerificationCode(explorer,siteUrl);

        return userService.registerExplorer(explorer);
    }

    
    
    @GetMapping("/verify")
    public String verifyUser(@RequestParam("code") String code,Model model) {
      boolean isVerified = userService.verifyUser(code);

      if (isVerified) {
        model.addAttribute("message", "Your email has been verified successfully!");
        return "<h1>verification_success<h1>"; // View for successful verification
      } else {
        model.addAttribute("error", "Invalid or expired verification code. Please try again.");
        return "<h1>verification_error<h1>";   // View for error handling
      }
    }
    
}
