package com.hmapvis.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "education", uniqueConstraints = {})
public class Education implements java.io.Serializable{
	
	private static final long serialVersionUID = 1L;
	private String education_name;
	private int education_id;


	@Id
	@Column(name = "education_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getEducation_id() {
		return education_id;
	}
	public void setEducation_id(int education_id) {
		this.education_id = education_id;
	}
	
	public String getEducation_name() {
		return education_name;
	}
	public void setEducation_name(String education_name) {
		this.education_name = education_name;
	}
	
}
