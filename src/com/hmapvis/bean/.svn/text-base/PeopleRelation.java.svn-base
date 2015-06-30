package com.hmapvis.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "people_relation", uniqueConstraints = {})
public class PeopleRelation implements java.io.Serializable{
private static final long serialVersionUID = 1L;
	
	private int pp_id;
	private int people_id1;
	private int people_id2;
	private int relation_id;
	
	
	@Id
	@Column(name = "pp_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getPp_id() {
		return pp_id;
	}
	public void setPp_id(int pp_id) {
		this.pp_id = pp_id;
	}
	public int getPeople_id1() {
		return people_id1;
	}
	public void setPeople_id1(int people_id1) {
		this.people_id1 = people_id1;
	}
	public int getPeople_id2() {
		return people_id2;
	}
	public void setPeople_id2(int people_id2) {
		this.people_id2 = people_id2;
	}
	public int getRelation_id() {
		return relation_id;
	}
	public void setRelation_id(int relation_id) {
		this.relation_id = relation_id;
	}

}
