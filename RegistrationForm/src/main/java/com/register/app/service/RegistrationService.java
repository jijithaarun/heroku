package com.register.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.register.app.model.RegistrationForm;
import com.register.app.repository.iRegistrationRepo;

@Service
public class RegistrationService implements iRegistrationService {

	
	//autowired registration repository
	@Autowired
	iRegistrationRepo registerRepo;

	
	//passing data to the repository
	@Transactional
	@Override
	public RegistrationForm addRegistration(RegistrationForm register) {

		return registerRepo.save(register);
	}

}
