package com.hmapvis.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "people_event", uniqueConstraints = {})
public class PeopleEvent implements java.io.Serializable{
	private static final long serialVersionUID = 1L;
	private int pe_id;
	private int people_id;
	private int event_id;
	
	
	@Id
	@Column(name = "pe_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
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
	
}
