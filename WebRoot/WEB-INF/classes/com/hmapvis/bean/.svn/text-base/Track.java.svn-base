package com.hmapvis.bean;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "people_track", uniqueConstraints = {})
public class Track implements java.io.Serializable{

	private static final long serialVersionUID = 1L;
	
	private String people;
	private String event_name;
	
	private int event_id;
	private String start_time;
	private String place_loc;
	
	@Id
	@Column(name = "event_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getEvent_id() {
		return event_id;
	}
	public void setEvent_id(int event_id) {
		this.event_id = event_id;
	}
	
	public String getPeople() {
		return people;
	}
	public void setPeople(String people) {
		this.people = people;
	}
	
	public String getEvent_name() {
		return event_name;
	}
	public void setEvent_name(String event_name) {
		this.event_name = event_name;
	}
	public String getStart_time() {
		return start_time;
	}
	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}
	public String getPlace_loc() {
		return place_loc;
	}
	public void setPlace_loc(String place_loc) {
		this.place_loc = place_loc;
	}
}
