package com.smartlearn.auth;

// Simple DTO to represent a user with their role, for demonstration purposes.
public class UserRoleDTO {
    private Long id;
    private String username;
    private String role; // "lecturer" or "student"

    public UserRoleDTO() {}

    public UserRoleDTO(Long id, String username, String role) {
        this.id = id;
        this.username = username;
        this.role = role;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
