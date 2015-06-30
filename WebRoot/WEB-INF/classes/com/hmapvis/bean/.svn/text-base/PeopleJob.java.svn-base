package com.hmapvis.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "people_job", uniqueConstraints = {})
public class PeopleJob implements java.io.Serializable{
	private static final long serialVersionUID = 1L;
	private int job_id;
	private int pj_id;
	private int people_id;
	@Id
	@Column(name = "pj_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getPj_id() {
		return pj_id;
	}
	public void setPj_id(int pj_id) {
		this.pj_id = pj_id;
	}
	public int getJob_id() {
		return job_id;
	}
	public void setJob_id(int job_id) {
		this.job_id = job_id;
	}
	
	public int getPeople_id() {
		return people_id;
	}
	public void setPeople_id(int people_id) {
		this.people_id = people_id;
	}
}
