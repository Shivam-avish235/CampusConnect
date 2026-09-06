package com.myanatomy.dto;

/**
 * Response returned when an administrator provisions a user account.
 *
 * temporaryPassword is returned only at account creation time for
 * STUDENT/FACULTY accounts. The password is never stored in plain text.
 */
public record ProvisionUserResponse(
        Long userId,
        String name,
        String email,
        String role,
        boolean active,
        String temporaryPassword) {
}
