package com.hmapvis.bean;
/**
 * 用户实体，对应用户表
 * 
 */
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "public.user", uniqueConstraints = {})
public class User implements java.io.Serializable {
	
	private static final long serialVersionUID = 1L;
	private int user_id;
	private String user_name; 
	private String user_pass; 
	private int map_count; 
	private int event_count; 
	private int people_count;
	private int place_count;
	
	@Id
	@Column(name = "user_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getUser_pass() {
		return user_pass;
	}
	public void setUser_pass(String user_pass) {
		this.user_pass = user_pass;
	}
	public int getMap_count() {
		return map_count;
	}
	public void setMap_count(int map_count) {
		this.map_count = map_count;
	}
	public int getEvent_count() {
		return event_count;
	}
	public void setEvent_count(int event_count) {
		this.event_count = event_count;
	}
	public int getPeople_count() {
		return people_count;
	}
	public void setPeople_count(int people_count) {
		this.people_count = people_count;
	}
	public int getPlace_count() {
		return place_count;
	}
	public void setPlace_count(int place_count) {
		this.place_count = place_count;
	}
}
