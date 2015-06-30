package com.hmapvis.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
@Entity
@Table(name = "people", uniqueConstraints = {})
public class People implements java.io.Serializable {
	
	private static final long serialVersionUID = 1L;
	private int people_id;
	private String people_name;
	private String birthday;
	private String deathday;
	private String birthplace;//看了数据库感觉存的这个东西不是坐标，但是按照添加人物来说，这个除了坐标也不能是别的。
	private int user_id;
	
	private int type_id; 
	private int place_id;
	
	//private String place_loc;
	private String people_detail;
	
	private String people_character;
	private String temple_title;
	private String headpic_path;
	
	private int education_id;
	private String people_summary;
	private String people_influ;
	private String people_detail_url;
	private int dynasty_id;
	private int job_id;
	
	private String education_name;
	private String dynasty_name;
	private String job_name;
	
	private String start_time; 
	private String end_time; 
	
	@Id
	@Column(name = "people_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	public int getPeople_id() {
		return people_id;
	}
	public void setPeople_id(int people_id) {
		this.people_id = people_id;
	}
	public String getPeople_name() {
		return people_name;
	}
	public void setPeople_name(String people_name) {
		this.people_name = people_name;
	}
	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}
	public String getDeathday() {
		return deathday;
	}
	public void setDeathday(String deathday) {
		this.deathday = deathday;
	}
	public String getBirthplace() {
		return birthplace;
	}
	public void setBirthplace(String birthplace) {
		this.birthplace = birthplace;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	
	public int getType_id() {
		return type_id;
	}
	public void setType_id(int type_id) {
		this.type_id = type_id;
	}
	public int getPlace_id() {
		return place_id;
	}
	public void setPlace_id(int place_id) {
		this.place_id = place_id;
	}
	/*
	public String getPlace_loc() {
		return place_loc;
	}
	public void setPlace_loc(String place_loc) {
		this.place_loc = place_loc;
	}
	*/
	
	public String getPeople_character() {
		return people_character;
	}
	public void setPeople_character(String people_character) {
		this.people_character = people_character;
	}
	public String getTemple_title() {
		return temple_title;
	}
	public void setTemple_title(String temple_title) {
		this.temple_title = temple_title;
	}

	public int getEducation_id() {
		return education_id;
	}
	public void setEducation_id(int education_id) {
		this.education_id = education_id;
	}
	public String getPeople_summary() {
		return people_summary;
	}
	public void setPeople_summary(String people_summary) {
		this.people_summary = people_summary;
	}
	public String getPeople_influ() {
		return people_influ;
	}
	public void setPeople_influ(String people_influ) {
		this.people_influ = people_influ;
	}
	public String getPeople_detail_url() {
		return people_detail_url;
	}
	public void setPeople_detail_url(String people_detail_url) {
		this.people_detail_url = people_detail_url;
	}
	//下面四个方法是我觉得缺少的，后添加的，如果不对请删除。
	public int getDynasty_id() {
		return dynasty_id;
	}
	public void setDynasty_id(int dynasty_id) {
		this.dynasty_id = dynasty_id;
	}
	public int getJob_id(){
		return job_id;
	}
	public void setJob_id(int job_id){
		this.job_id = job_id;
	}
	public String getEducation_name() {
		return education_name;
	}
	public void setEducation_name(String education_name) {
		this.education_name = education_name;
	}
	public String getDynasty_name() {
		return dynasty_name;
	}
	public void setDynasty_name(String dynasty_name) {
		this.dynasty_name = dynasty_name;
	}	
	public String getJob_name() {
		return job_name;
	}
	public void setJob_name(String job_name) {
		this.job_name = job_name;
	}
	public String getPeople_detail() {
		return people_detail;
	}
	public void setPeople_detail(String people_detail) {
		this.people_detail = people_detail;
	}
	public String getHeadpic_path() {
		return headpic_path;
	}
	public void setHeadpic_path(String headpic_path) {
		this.headpic_path = headpic_path;
	}
	public String getStart_time() {
		return start_time;
	}
	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}
	public String getEnd_time() {
		return end_time;
	}
	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}



	private String user_name;
	@Transient
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	
}
