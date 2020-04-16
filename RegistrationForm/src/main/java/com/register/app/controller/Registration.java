package com.register.app.controller;

import java.io.IOException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.register.app.model.RegistrationForm;
import com.register.app.service.iRegistrationService;


@CrossOrigin
@RestController
@RequestMapping("/")
public class Registration {

	// autowiring the registration service
	@Autowired
	iRegistrationService regService;

	// passing form data to service
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<Response> addRegistration(@RequestParam("logo") MultipartFile file,
			@RequestParam("register") String register)
			throws JsonMappingException, JsonProcessingException, IOException {
		System.out.println("Original Image Byte Size - " + file.getBytes().length);
		RegistrationForm regForm = new ObjectMapper().readValue(register, RegistrationForm.class);
		
		regForm.setLogo(file.getOriginalFilename());
		RegistrationForm registeration = regService.addRegistration(regForm);

		if (registeration != null) {
			return new ResponseEntity<Response>(new Response("registration details saved success"), HttpStatus.OK);
		} else {
			return new ResponseEntity<Response>(new Response("registration details saved not success"),
					HttpStatus.BAD_REQUEST);
		}
	}

}
