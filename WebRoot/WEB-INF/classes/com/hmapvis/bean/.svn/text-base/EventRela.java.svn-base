package com.hmapvis.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "event_relation", uniqueConstraints = {})
public class EventRela implements java.io.Serializable {
	
	private static final long serialVersionUID = 1L;
	
	
	private int ee_id;
	private int event_id1;
	private int event_id2;
	private int relation_id;
	
	
	@Id
	@Column(name = "ee_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getEe_id() {
		return ee_id;
	}
	public void setEe_id(int ee_id) {
		this.ee_id = ee_id;
	}

	public int getEvent_id1() {
		return event_id1;
	}
	public void setEvent_id1(int event_id1) {
		this.event_id1 = event_id1;
	}
	
	public int getEvent_id2() {
		return event_id2;
	}
	public void setEvent_id2(int event_id2) {
		this.event_id2 = event_id2;
	}
	public int getRelation_id() {
		return relation_id;
	}
	public void setRelation_id(int relation_id) {
		this.relation_id = relation_id;
	}
	
	private String event_name;

	@Transient
	public String getEvent_name() {
		return event_name;
	}
	public void setEvent_name(String event_name) {
		this.event_name = event_name;
	}
	private String relation_name;

	@Transient
	public String getRelation_name() {
		return relation_name;
	}
	public void setRelation_name(String relation_name) {
		this.relation_name = relation_name;
	}
	private int place_id;

	@Transient
	public int getPlace_id() {
		return place_id;
	}
	public void setPlace_id(int place_id) {
		this.place_id = place_id;
	}
	private String place_loc;
	@Transient
	public String getPlace_loc() {
		return place_loc;
	}
	public void setPlace_loc(String place_loc) {
		this.place_loc = place_loc;
	}
	
}
