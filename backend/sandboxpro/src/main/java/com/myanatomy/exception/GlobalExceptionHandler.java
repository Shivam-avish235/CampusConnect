package com.myanatomy.exception;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.time.*;
import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NoSuchElementException.class)
    ResponseEntity<?> notFound(NoSuchElementException e) {
        return ResponseEntity.status(404).body(Map.of("timestamp", Instant.now(), "status", 404, "error", "Not Found",
                "message", "Resource not found"));
    }

    @ExceptionHandler(RuntimeException.class)
    ResponseEntity<?> bad(RuntimeException e) {
        return ResponseEntity.status(400).body(Map.of("timestamp", Instant.now(), "status", 400, "error", "Bad Request",
                "message", e.getMessage() == null ? "Request failed" : e.getMessage()));
    }
}
