package com.hmapvis.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "event_record", uniqueConstraints = {})
public class EventRecord implements java.io.Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private int change_event_id;
	private int event_id;
	private int type_id;
	private int dynasty_id;
	private int user_id;
	private int place_id;
	private String event_name;
	private long start_time;
	private long end_time;
	private String people;
	private String summary;
	private String influ;
	private String img_path;
	private String detail_url;
	private int event_version;
	private int map_id;
	private int rank;
	private String change_time;
	
	
	@Id
	@Column(name = "change_event_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getChange_event_id() {
		return change_event_id;
	}
	public void setChange_event_id(int change_event_id) {
		this.change_event_id = change_event_id;
	}
	public int getEvent_id() {
		return event_id;
	}
	public void setEvent_id(int event_id) {
		this.event_id = event_id;
	}
	public int getType_id() {
		return type_id;
	}
	public void setType_id(int type_id) {
		this.type_id = type_id;
	}
	public int getDynasty_id() {
		return dynasty_id;
	}
	public void setDynasty_id(int dynasty_id) {
		this.dynasty_id = dynasty_id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getPlace_id() {
		return place_id;
	}
	public String getEvent_name() {
		return event_name;
	}
	public void setEvent_name(String event_name) {
		this.event_name = event_name;
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
	public void setPlace_id(int place_id) {
		this.place_id = place_id;
	}
	public String getPeople() {
		return people;
	}
	public void setPeople(String people) {
		this.people = people;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getInflu() {
		return influ;
	}
	public void setInflu(String influ) {
		this.influ = influ;
	}
	public String getImg_path() {
		return img_path;
	}
	public void setImg_path(String img_path) {
		this.img_path = img_path;
	}
	public String getDetail_url() {
		return detail_url;
	}
	public void setDetail_url(String detail_url) {
		this.detail_url = detail_url;
	}
	
	private String start_date;
	private String end_date;

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
	
	private String type_name;
	
	
	@Transient
	public String getType_name() {
		return type_name;
	}
	public void setType_name(String type_name) {
		this.type_name = type_name;
	}
	
	private String place_name;
	
	@Transient
	public String getPlace_name() {
		return place_name;
	}
	public void setPlace_name(String place_name) {
		this.place_name = place_name;
	}
	
	private String now_name;

	@Transient
	public String getNow_name() {
		return now_name;
	}
	public void setNow_name(String now_name) {
		this.now_name = now_name;
	}
	
	private String place_loc;

	@Transient
	public String getPlace_loc() {
		return place_loc;
	}
	public void setPlace_loc(String place_loc) {
		this.place_loc = place_loc;
	}
	
	
	private String user_name;
	@Transient
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	
	private String start_time_string;
	public String getStart_time_string() {
		return start_time_string;
	} 
	public void setStart_time_string(String start_time_string) {
		this.start_time_string = start_time_string;
	}
	
	private String end_time_string;
	public String getEnd_time_string() {
		return end_time_string;
	}
	public void setEnd_time_string(String end_time_string) {
		this.end_time_string = end_time_string;
	}

	private int getEvent_version(){
		return event_version;
	}
	private void setEvent_version(int event_version){
		this.event_version = event_version;
	}

	private int getMap_id(){
		return map_id;
	}
	private void setMap_id(int map_id){
		this.map_id = map_id;
	}
	private int getRank(){
		return rank;
	}
	private void setRank(int rank){
		this.rank = rank;
	}
	
	private String getChange_time(){
		return change_time;
	}
	private void setChange_time(String change_time){
		this.change_time = change_time;
	}
}
