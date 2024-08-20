package com.example.project.model;




import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;
    private String province;
    private String city;
    private String verificationCode;
    private Boolean enabled;
    
    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] cnicImage;
    
    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] businessLicenseImage;
    
    public User() {
    	
    }
   
    public User(Long id, String username, String email, String password, byte[] cnicImage,
			byte[] businessLicenseImage) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.cnicImage = cnicImage;
		this.businessLicenseImage = businessLicenseImage;
	}




	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public byte[] getCnicImage() {
		return cnicImage;
	}

	public void setCnicImage(byte[] cnicImage) {
		this.cnicImage = cnicImage;
	}

	public byte[] getBusinessLicenseImage() {
		return businessLicenseImage;
	}




	public void setBusinessLicenseImage(byte[] businessLicenseImage) {
		this.businessLicenseImage = businessLicenseImage;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getVerificationCode() {
		return verificationCode;
	}

	public void setVerificationCode(String verificationCode) {
		this.verificationCode = verificationCode;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean setEnabled) {
		this.enabled = setEnabled;
	}
	
	
	
	


    
    
}