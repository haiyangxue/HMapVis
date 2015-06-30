package com.hmapvis.bean;
/**
 * 名称投票
 * 
 */
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "namevote", uniqueConstraints = {})
public class NameVote implements java.io.Serializable{

	private static final long serialVersionUID = 1L;
	private int namevote_id;
	private int building_id;
	private String new_name;
	private int vote;
	private String stuname;
	private String stuid;
	
	@Id
	@Column(name = "namevote_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getNamevote_id() {
		return namevote_id;
	}
	public void setNamevote_id(int namevote_id) {
		this.namevote_id = namevote_id;
	}
	public int getBuilding_id() {
		return building_id;
	}
	public void setBuilding_id(int building_id) {
		this.building_id = building_id;
	}
	public String getNew_name() {
		return new_name;
	}
	public void setNew_name(String new_name) {
		this.new_name = new_name;
	}
	public int getVote() {
		return vote;
	}
	public void setVote(int vote) {
		this.vote = vote;
	}
	public String getStuname() {
		return stuname;
	}
	public void setStuname(String stuname) {
		this.stuname = stuname;
	}
	public String getStuid() {
		return stuid;
	}
	public void setStuid(String stuid) {
		this.stuid = stuid;
	}
}
