package com.hmapvis.bean;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "dynasty", uniqueConstraints = {})
public class Dynasty implements java.io.Serializable{

	private static final long serialVersionUID = 1L;
	
	private String dynasty_name;
	private int dynasty_id;
	private String start_time;
	private String end_time;
	
	@Id
	@Column(name = "dynasty_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getDynasty_id() {
		return dynasty_id;
	}
	public void setDynasty_id(int dynasty_id) {
		this.dynasty_id = dynasty_id;
	}
	
	public String getDynasty_name() {
		return dynasty_name;
	}
	public void setDynasty_name(String dynasty_name) {
		this.dynasty_name = dynasty_name;
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
	
}
