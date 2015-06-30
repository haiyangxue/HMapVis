package com.hmapvis.bean;
/**
 * 原建筑名称
 * 
 */
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "building", uniqueConstraints = {})
public class Building implements java.io.Serializable{

	private static final long serialVersionUID = 1L;
	private int building_id;
	private String building_tail;
	
	@Id
	@Column(name = "building_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getBuilding_id() {
		return building_id;
	}
	public void setBuilding_id(int building_id) {
		this.building_id = building_id;
	}
	public String getBuilding_tail() {
		return building_tail;
	}
	public void setBuilding_tail(String building_tail) {
		this.building_tail = building_tail;
	}	
}
