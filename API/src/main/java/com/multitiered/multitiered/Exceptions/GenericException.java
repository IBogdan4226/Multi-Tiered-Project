package com.multitiered.multitiered.Exceptions;

public class GenericException extends Exception {
    public GenericException(String note) {
        super("Business Exception: " + note);
    }
}
