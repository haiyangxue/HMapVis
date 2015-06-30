package com.hmapvis.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
@Entity
@Table(name = "place", uniqueConstraints = {})
public class Place implements java.io.Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private int place_id;
	private String place_name;
	private String now_name;
	private long start_time;
	private long end_time;
	private int dynasty_id;
	private String place_loc;
	

	private String dynasty_name;
	private String start_date;
	private String end_date;
	private int user_id;
	@Id
	@Column(name = "place_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getPlace_id() {
		return place_id;
	}
	public void setPlace_id(int place_id) {
		this.place_id = place_id;
	}
	
	
	//添加user_id
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
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
	public int getDynasty_id() {
		return dynasty_id;
	}
	public void setDynasty_id(int dynasty_id) {
		this.dynasty_id = dynasty_id;
	}
	public String getPlace_loc() {
		return place_loc;
	}
	public void setPlace_loc(String place_loc) {
		this.place_loc = place_loc;
	}
	//添加了几个的获得和设置函数
	
	
//	public String getDynasty_name() {
//		return dynasty_name;
//	}
//	public void setDynasty_name(String dynasty_name) {
//		this.dynasty_name=dynasty_name;
//	}
	@Transient
	public String getStart_date() {
		return start_date;
	}
	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}
	
	@Transient
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}
	
	@Transient
	public String getDynasty_name() {
		return dynasty_name;
	}
	public void setDynasty_name(String dynasty_name) {
		this.dynasty_name = dynasty_name;
	}
}
