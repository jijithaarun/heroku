package com.register.app.repository;

import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

import com.register.app.model.RegistrationForm;

//repository created for manipulating form data
public interface iRegistrationRepo extends JpaRepositoryImplementation<RegistrationForm, Integer> {

}
