package com.hmapvis.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "place_record", uniqueConstraints = {})
public class PlaceRecord implements java.io.Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private int change_place_id;
	private int place_id;
	private String place_name;
	private String now_name;
	private int dynasty_id;
	private String place_loc;
	private long start_time;
	private long end_time;
	private int user_id;
	private int place_version;
	
	
	@Id
	@Column(name = "change_event_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getChange_event_id() {
		return change_place_id;
	}
	public void setChange_event_id(int change_place_id) {
		this.change_place_id = change_place_id;
	}
	public int getPlace_id() {
		return place_id;
	}
	public void setPlace_id(int place_id) {
		this.place_id = place_id;
	}
	public String getPlace_name() {
		return place_name;
	}
	public void setPlace_name(String place_name) {
		this.place_name = place_name;
	}
	public String getNow_name() {
		return now_name;
	}
	public void setNow_name(String now_name) {
		this.now_name = now_name;
	}
	public String getPlace_loc() {
		return place_loc;
	}
	public void setPlace_loc(String place_loc) {
		this.place_loc = place_loc;
	}
	
	public int getDynasty_id() {
		return dynasty_id;
	}
	public void setDynasty_id(int dynasty_id) {
		this.dynasty_id = dynasty_id;
	}
	
	
	public long getStart_time() {
		return start_time;
	}
	public void setStart_time(long start_time) {
		this.start_time = start_time;
	}
	public long getEnd_time() {
		return end_time;
	}
	public void setEnd_time(long end_time) {
		this.end_time = end_time;
	}
	
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	
	private int getPlace_version(){
		return place_version;
	}
	private void setPlace_version(int place_version){
		this.place_version = place_version;
	}

	
}
