package com.multitiered.multitiered.Exceptions;

public class TestNotFound extends Exception {
    public TestNotFound(String id) {
        super("Test not found with id: " + id);
    }
}
