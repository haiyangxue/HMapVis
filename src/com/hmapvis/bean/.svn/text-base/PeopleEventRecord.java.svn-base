package com.hmapvis.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "people_event_record", uniqueConstraints = {})
public class PeopleEventRecord implements java.io.Serializable{
	private static final long serialVersionUID = 1L;
	private int per_id;
	private int pe_id;
	private int people_id;
	private int event_id;
	private int per_version;
	
	@Id
	@Column(name = "per_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getPer_id() {
		return per_id;
	}
	public void setPer_id(int per_id) {
		this.per_id = per_id;
	}
	
	public int getPe_id() {
		return pe_id;
	}
	public void setPe_id(int pe_id) {
		this.pe_id = pe_id;
	}
	
	public int getPeople_id() {
		return people_id;
	}
	public void setPeople_id(int people_id) {
		this.people_id = people_id;
	}
	public int getEvent_id() {
		return event_id;
	}
	public void setEvent_id(int event_id) {
		this.event_id = event_id;
	}
	public int getPer_version() {
		return per_version;
	}
	public void setPer_version(int per_version) {
		this.per_version = per_version;
	}
	
	
}
